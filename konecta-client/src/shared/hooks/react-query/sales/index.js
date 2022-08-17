import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

import saleServices from "../../../services/sales";
import { QUERY_KEYS } from "../../../constants";

export function useGetSale() {
  const params = useParams();

  const { data: sale, isLoading } = useQuery(
    [QUERY_KEYS.SALES, params.id],
    () => saleServices.getSales(params.id),
    {
      enabled: !!params.id,
    }
  );

  return {
    sale,
    isLoading,
  };
}

export function useGetSales() {
  const { data: sales = [], isLoading } = useQuery(QUERY_KEYS.SALES, () =>
    saleServices.getSales()
  );
  return {
    sales,
    isLoading,
  };
}
