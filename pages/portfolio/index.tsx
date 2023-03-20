import React from "react";
import path from "path";
import fs from "fs/promises";

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
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data", "dummy.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return {
    props: {
      products: data.products,
    },
  };
}

export default PortfolioPage;
