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

  if (!loadedProduct) {
    return <p>Loading...</p>;
  }

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

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
}

export async function getStaticProps(context) {
  const { params } = context;

  const productId = params.pid;

  const data = await getData();

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
  const data = await getData();

  const ids = data.products.map((product: Products) => product.id);

  const pathsWithParams = ids.map((id: string) => ({ params: { pid: id } }));

  console.log(pathsWithParams); // [{ params: { pid: 'p1' } }, { params: { pid: 'p2' } }, { params: { pid: 'p3' } }]

  return {
    paths: [
      ...pathsWithParams,
      // Changed path to paths
      // { params: { pid: "p1" } },
      // { params: { pid: "p2" } }, Fallback set to true will still display this page after loading animation.
      // { params: { pid: "p3" } }, Fallback set to true will still display this page after loading animation.
    ],
    fallback: true,
  };
}

export default PortfolioProjectPage;
