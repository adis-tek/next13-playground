import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

function ClientsPage() {
  const router = useRouter();

  const clients = [
    { id: "max", name: "Maximilian" },
    { id: "manny", name: "Manny" },
  ];
  function loadClientHandler() {
    // Do something
    router.push("/clients/max");
    // OR
    router.push({
      pathname: "/clients/[id]/[clientprojectid]",
      query: { id: "max", clientprojectid: "project1" },
    });
  }
  return (
    <div>
      <p>Clients</p>
      <ul>
        {clients.map((client) => (
          <li key={client.id}>
            <Link
              href={{
                pathname: "/clients/[id]",
                query: { id: client.id },
              }}
            >
              {client.name}
            </Link>
          </li>
        ))}
      </ul>
      <ul>
        <li>
          <Link href="/clients/max">Max</Link>
        </li>
        <li>
          <Link href="/clients/manny">Manny</Link>
        </li>
      </ul>
    </div>
  );
}

export default ClientsPage;
