import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./pages/App.tsx";
import Order from "./pages/OrderPage.tsx";

import './styles/globals.css';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/sales-receipt/" element={<App />} />
        <Route path="/sales-receipt/second-screen" element={<Order />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
