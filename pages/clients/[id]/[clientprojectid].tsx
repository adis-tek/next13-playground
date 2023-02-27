import React from "react";
import { useRouter } from "next/router";

function ClientProjectId() {
  const router = useRouter();
  router.query; // { id: 'max', clientprojectid: 'project1' }

  return <div>clientprojectid - for specific client projects.</div>;
}

export default ClientProjectId;
