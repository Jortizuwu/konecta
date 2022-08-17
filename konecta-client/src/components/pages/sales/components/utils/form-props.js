import { useCallback, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import Swal from "sweetalert2";

import { QUERY_KEYS } from "../../../../../shared/constants";
import salesServices from "../../../../../shared/services/sales";
import { useGetProduct } from "../../../../../shared/hooks/react-query/products";
import productServices from "../../../../../shared/services/products";

export const schema = Yup.object().shape({
  id_product: Yup.number("el valor debe de ser numerico")
    .min(
      1,
      "la cantidad debe de superior a 1 y menor o igual al numero de stock"
    )
    .required("El id del producto es requerido!"),
  quantity: Yup.number("el valor debe de ser numerico").required(
    "La cantidad es requerida!"
  ),
});

const initValues = {
  id_product: "",
  quantity: 1,
};

export function useDefaultValues() {
  const params = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading, product } = useGetProduct();

  const [saleValues, setSaleValue] = useState({});

  useEffect(() => {
    setSaleValue({ id_product: product?.id_product, quantity: product?.stock });
  }, [product]);

  const create = useCallback(
    async (values) => {
      try {
        if (values.quantity > product?.stock) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `La cantidad no debe superar el numero de stock! ${product?.stock}`,
          });
          return;
        }

        await salesServices.createSale(values);
        await productServices.updateProduct(product.id_product, {
          ...product,
          stock: product?.stock - values.quantity,
        });

        Swal.fire({
          icon: "success",
          title: "creado.",
          text: "Producto creado!",
        });
        navigate("/sales");
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Parece que algo no va bien!",
        });
      }
    },
    [navigate, product]
  );

  const { mutate, isLoading: isLoadingMutation } = useMutation(create, {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.SALES]);
    },
  });

  return {
    isLoading: isLoading ?? isLoadingMutation,
    submit: mutate,
    formValues: {
      defaultValues: saleValues?.id_product ? saleValues : initValues,
    },
    status: "ventas",
    isEditing: !!params.id,
  };
}
