import { rest } from "msw";

export const peopleHandlers = [
    rest.get("https://example.com/people", ({ params }) => {
        const data = [{name: 'Anna'}, {name: 'Ben'}]
        return new Response(JSON.stringify(data), {
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            status: 200,
        });
    }),
]

export const animalHandlers = [
    rest.get("https://example.com/animals", ({ params }) => {
        const data = [{name: 'Buddy'}, {name: 'Scooby'}]
        return new Response(JSON.stringify(data), {
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            status: 200,
        });
    }),
]