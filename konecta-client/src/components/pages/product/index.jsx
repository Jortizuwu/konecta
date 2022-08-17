import React, { useMemo } from "react";

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

  const rows = useMemo(
    () =>
      products?.map((val) => ({
        id: val?.id_product,
        name: val?.name,
        reference: val?.reference,
        price: val?.price,
        weight: val?.weight,
        category: val?.category,
        stock: val?.stock,
        creation_date: val.creation_date,
      })),
    [products]
  );

  if (isLoading) <h1>Loading..</h1>;

  return (
    <>
      <Table rows={rows} columnNames={columnNames} />
    </>
  );
};

export default Product;
