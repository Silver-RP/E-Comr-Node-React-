import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { CartProvider } from "./context/CartContext";
import { NotificationProvider } from "./context/NotificationContext"; 
import Notification from "./app/components/common/Notification";

import AppRoutes from "./routes/index";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
      <NotificationProvider> 
        <CartProvider>
            <Notification />
            <AppRoutes />
        </CartProvider>
        </NotificationProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
