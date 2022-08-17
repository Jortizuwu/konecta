import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app/router";
import { QueryClient, QueryClientProvider } from "react-query";

import "./index.css";
import ReduxProvider from "./redux/provider";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReduxProvider>
        <App />
      </ReduxProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
