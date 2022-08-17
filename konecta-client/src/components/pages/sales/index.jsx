import React from "react";

import Table from "../../../shared/components/Table";
import { useGetSales } from "../../../shared/hooks/react-query/sales";

const columnNames = ["ID", "id producto", "cantidad"];

const Sales = () => {
  const { isLoading, sales } = useGetSales();

  if (isLoading) <h1>Loading..</h1>;

  return (
    <>
      <Table rows={sales} columnNames={columnNames} />
    </>
  );
};

export default Sales;
