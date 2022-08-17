import React from "react";

import Table from "../../../shared/components/Table";
import { useGetProducts } from "../../../shared/hooks/react-query/products";

const columnNames = [
  "ID",
  "nombre",
  "referencia",
  "precio",
  "peso",
  "categoria",
  "stock",
  "fecha",
];

const Product = () => {
  const { isLoading, products } = useGetProducts();

  if (isLoading) <h1>Loading..</h1>;

  return (
    <>
      <Table rows={products} columnNames={columnNames} />
    </>
  );
};

export default Product;
