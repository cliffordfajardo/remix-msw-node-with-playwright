import { type RequestHandler } from "msw";
import { setupServer, type SetupServerApi } from "msw/node";

/*
During development, we need to save the instance of our MSW server in a global variable.
Remix purges the 'require' cache on every request in development to support <LiveReload /> functionality from the server to the browser.
To make sure our cache survives these purges during development, we need to assign it to the `global` object
Details: https://stackoverflow.com/questions/72661999/how-do-i-use-in-memory-cache-in-remix-run-dev-mode
*/
declare global {
    var __MSW_SERVER: SetupServerApi | undefined;
}

export const setup = (handlers: RequestHandler[]): SetupServerApi => setupServer(...handlers);

export const start = (server: SetupServerApi) => {
    server.listen({ onUnhandledRequest: "bypass" });
    console.info("🔶 MSW mock server running...");

    process.once("SIGINT", () => {
        globalThis.__MSW_SERVER = undefined;
        server.close();
    });
    process.once("SIGTERM", () => {
        globalThis.__MSW_SERVER = undefined;
        server.close();
    });
};

const restart = (server: SetupServerApi, handlers: RequestHandler[]) => {
    server.close();
    console.info("🔶 Shutting down MSW Mock Server...");

    const _server = setup(handlers);
    globalThis.__MSW_SERVER = _server;

    console.info("🔶 Attempting to restart MSW Mock Server...");
    start(_server);
};

export const startMockServer = (handlers: RequestHandler[]) => {
    const IS_MSW_SERVER_RUNNING = globalThis.__MSW_SERVER !== undefined;

    if (IS_MSW_SERVER_RUNNING === false) {
        const server = setup(handlers);
        globalThis.__MSW_SERVER = server;
        start(server);
    }
    if (IS_MSW_SERVER_RUNNING) {
        const server = globalThis.__MSW_SERVER;
        if (server) {
            restart(server, handlers);
        }
    }
};
