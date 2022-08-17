import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { schema, useDefaultValues } from "./utils/form-props";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorAlert } from "../../../../shared/components/Alerts";

const ProductForm = () => {
  const {
    formValues: { defaultValues },
    isEditing,
    isLoading,
    status,
    submit,
  } = useDefaultValues();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "all",
    initialValues: defaultValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  if (isLoading) <h1>Loading...</h1>;

  return (
    <div className="mt-10 sm:mt-0">
      <div className="mt-5 md:mt-0 md:col-span-2">
        <h1>{status}</h1>
        <form onSubmit={handleSubmit(submit)}>
          <div className="shadow overflow-hidden sm:rounded-md mt-10">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Producto id
                  </label>
                  <input
                    type="number"
                    name="id_product"
                    className="mb-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 "
                    {...register("id_product")}
                  />
                  {errors?.id_product && (
                    <ErrorAlert msg={errors?.id_product?.message} />
                  )}
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Cantidad
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    {...register("quantity")}
                    className="mb-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 "
                  />
                  {errors?.quantity && (
                    <ErrorAlert msg={errors?.quantity?.message} />
                  )}
                </div>
              </div>
            </div>
            <div className="w-full flex justify-end items-center">
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {status}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
