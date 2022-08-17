import React, { useMemo } from "react";

import Table from "../../../shared/components/Table";
import { useGetSales } from "../../../shared/hooks/react-query/sales";

const columnNames = ["ID", "id producto", "cantidad"];

const Sales = () => {
  const { isLoading, sales } = useGetSales();

  const rows = useMemo(
    () =>
      sales?.map((val) => ({
        id: val?.id_sale,
        id_product: val?.id_product,
        quantity: val?.quantity,
      })),
    [sales]
  );

  if (isLoading) <h1>Loading..</h1>;

  return (
    <>
      <Table rows={rows} columnNames={columnNames} />
    </>
  );
};

export default Sales;
