import { cafeteriaApi } from "../../common/api";

const productServices = {
  getProducts: async () => {
    const { data } = await cafeteriaApi.get("getProducts.php");
    const products = data;
    return products;
  },
  getProduct: async (id) => {
    const { data } = await cafeteriaApi.get(`getProduct.php?id_product=${id}`);
    const products = data;
    return products;
  },
  createProduct: async (values) => {
    await cafeteriaApi.post(`createProduct.php`, values);
  },
  updateProduct: async (id, values) => {
    await cafeteriaApi.put(`updateProduct.php?id_product=${id}`, values);
  },
  deleteProduct: async (id) => {
    await cafeteriaApi.put(`deleteProduct.php?id_product=${id}`);
  },
};

export default productServices;
