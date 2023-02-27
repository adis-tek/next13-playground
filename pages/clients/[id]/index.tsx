import React from "react";
import { useRouter } from "next/router";

function ClientProjectsPage() {
  const router = useRouter();
  router.query; // { id: 'max' }
  return <div>Client Project page.</div>;
}

export default ClientProjectsPage;
