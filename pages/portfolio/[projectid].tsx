import React from "react";
import { useRouter } from "next/router";

function PortfolioProjectPage() {
  const router = useRouter();

  router.pathname; // /portfolio/[projectid]
  router.query; // { projectid: 'project1' }

  return <div>Portfolio Project Page</div>;
}

export default PortfolioProjectPage;
