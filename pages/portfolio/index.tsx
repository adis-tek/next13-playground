import React from "react";

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
  return {
    props: {
      products: [{ id: "p1", title: "Product 1" }],
    },
  };
}

export default PortfolioPage;
