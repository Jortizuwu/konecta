import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

import productServices from "../../../services/products";
import { QUERY_KEYS } from "../../../constants";

export function useGetProduct() {
  const params = useParams();

  const { data: product, isLoading } = useQuery(
    [QUERY_KEYS.PRODUCTS, params.id],
    () => productServices.getProduct(params.id),
    {
      enabled: !!params.id,
    }
  );

  return {
    product,
    isLoading,
  };
}

export function useGetProducts() {
  const { data: products = [], isLoading } = useQuery(QUERY_KEYS.PRODUCTS, () =>
    productServices.getProducts()
  );
  return {
    products,
    isLoading,
  };
}
