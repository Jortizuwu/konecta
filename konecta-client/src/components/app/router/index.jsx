import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Error404 from "../../pages/404";

import Product from "../../pages/product";
import ProductForm from "../../pages/product/components/Form";
import Sales from "../../pages/sales";
import SaleForm from "../../pages/sales/components/Form";

import { Layout } from "../layout";

// const Product = lazy(() => import("../../pages/product"));
// const Layout = lazy(() => import("../layout"));

const App = () => {
  return (
    <BrowserRouter>
      <div className="bg-slate-50 ">
        {/* <Suspense fallback={<h1>Loading...</h1>}> */}
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* products */}
            <Route path="products" element={<Product />} />
            <Route path="products/create" element={<ProductForm />} />
            <Route path="products/:id" element={<ProductForm />} />

            {/* sales */}
            <Route path="sales" element={<Sales />} />
            <Route path="sales/:id" element={<SaleForm />} />
            <Route path="*" element={<Error404 />} />
          </Route>
        </Routes>
        {/* </Suspense> */}
      </div>
    </BrowserRouter>
  );
};

export default App;
