import React, { Fragment } from "react";
import { useRouter } from "next/router";
import path from "path";
import fs from "fs/promises";

export interface Props {
  products: Products[];
}
export interface Products {
  id: string;
  title: string;
}

function PortfolioProjectPage(props: Props) {
  const { loadedProduct } = props;

  const router = useRouter();

  router.pathname; // /portfolio/[projectid]
  router.query; // { projectid: 'project1' }

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const { params } = context;

  const productId = params.pid;

  const filePath = path.join(process.cwd(), "data", "dummy.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  const product = data.products.find(
    (product: Products) => product.id === productId
  );

  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  return {
    path: [
      { params: { pid: "p1" } },
      { params: { pid: "p2" } },
      { params: { pid: "p3" } },
    ],
    fallback: false,
  };
}

export default PortfolioProjectPage;
