import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export async function loader({ request }:LoaderArgs) {
  const response = await fetch('https://example.com/people');
  const data = await response.json() as Array<{ name: string }>;

  return json(data)
}

export default function Index() {
  const people = useLoaderData<typeof loader>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
      <ul>
        {people.map((person, index) => {
          return <li key={index}>{person.name}</li>
        })}
      </ul>
    </div>
  );
}
