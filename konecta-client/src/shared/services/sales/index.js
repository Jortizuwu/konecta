import { cafeteriaApi } from "../../common/api";

const saleServices = {
  // getSale: async () => {
  //   const { data } = await cafeteriaApi.get("getSale.php");
  //   const Sale = data;
  //   return Sale;
  // },
  getSales: async (id) => {
    const { data } = await cafeteriaApi.get(`getSale.php?id_Sale=${id}`);
    const Sales = data;
    return Sales;
  },
  createSale: async (values) => {
    await cafeteriaApi.post(`createSale.php`, values);
  },
  // updateSale: async (id, values) => {
  //   await cafeteriaApi.put(`updateSale.php?id_Sale=${id}`, values);
  // },
  deleteSale: async (id) => {
    await cafeteriaApi.put(`deleteSale.php?id_Sale=${id}`);
  },
};

export default saleServices;
