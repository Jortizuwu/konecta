import { useCallback } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import Swal from "sweetalert2";

import { QUERY_KEYS } from "../../../../../shared/constants";
import salesServices from "../../../../../shared/services/sales";

export const schema = Yup.object().shape({
  id_product: Yup.number("el valor debe de ser numerico").required(
    "El id del producto es requerido!"
  ),
  quantity: Yup.number("el valor debe de ser numerico").required(
    "La cantidad es requerida!"
  ),
});

const initialValues = {
  id_product: 0,
  quantity: 0,
};

export function useDefaultValues() {
  const params = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const create = useCallback(
    async (values) => {
      try {
        await salesServices.createSale(values);
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

  const { mutate, isLoading: isLoadingMutation } = useMutation(create, {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.SALES]);
    },
  });

  return {
    isLoading: isLoadingMutation,
    submit: mutate,
    formValues: {
      defaultValues: initialValues,
    },
    status: "ventas",
    isEditing: !!params.id,
  };
}
