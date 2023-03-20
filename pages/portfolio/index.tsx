import React from "react";
import path from "path";
import fs from "fs/promises";

import Link from "next/link";

export interface Props {
  products: Products[];
}
export interface Products {
  id: string;
  title: string;
}

function PortfolioPage(props: Props) {
  const { products } = props;
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/portfolio/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data", "dummy.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  if (!data) {
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }

  if (data.products.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
    notFound: false, // Boolean
    // redirect: {
  };
}

export default PortfolioPage;
