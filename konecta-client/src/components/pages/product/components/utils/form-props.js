import { useCallback } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import Swal from "sweetalert2";

import { QUERY_KEYS } from "../../../../../shared/constants";
import { useGetProduct } from "../../../../../shared/hooks/react-query/products";
import productServices from "../../../../../shared/services/products";

export const schema = Yup.object().shape({
  name: Yup.string().required("El nombre es requerido!"),
  reference: Yup.string().required("La reference es requrida!"),
  price: Yup.number("El valor debe de ser numerico").required(
    "El precio es requerido!"
  ),
  weight: Yup.number("el valor debe de ser numerico").required(
    "El peso es requerido!"
  ),
  category: Yup.string().required("La categoria es requerida!"),
  stock: Yup.number("el valor debe de ser numerico").required(
    "el stock es requerido!"
  ),
});

const initialValues = {
  name: "",
  reference: "",
  price: 0,
  weight: 0,
  category: "",
  stock: 0,
};

export function useDefaultValues() {
  const params = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { product, isLoading } = useGetProduct();

  const update = useCallback(
    async (values) => {
      try {
        await productServices.updateProduct(params.id, values);
        Swal.fire({
          icon: "success",
          title: "Actualizado.",
          text: "Producto actualizado!",
        });
        navigate(-1);
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Parece que algo no va bien!",
        });
      }
    },
    [params.id, navigate]
  );

  const create = useCallback(
    async (values) => {
      try {
        await productServices.createProduct({
          ...values,
          creation_date: new Date(),
        });
        Swal.fire({
          icon: "success",
          title: "creado.",
          text: "Producto creado!",
        });
        navigate(-1);
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Parece que algo no va bien!",
        });
      }
    },
    [navigate]
  );

  const { mutate, isLoading: isLoadingMutation } = useMutation(
    params.id ? update : create,
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QUERY_KEYS.PRODUCTS]);
      },
    }
  );

  return {
    isLoading: isLoading ?? isLoadingMutation,
    submit: mutate,
    formValues: {
      defaultValues: product?.id_producto ? initialValues : product,
    },
    status: params.id ? "Actualizar producto" : "Crear producto",
    isEditing: !!params.id,
  };
}
