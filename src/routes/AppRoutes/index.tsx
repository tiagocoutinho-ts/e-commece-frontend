import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppProviders } from "../../contexts/AppProviders";

import { ProductGrid } from "../../components/ProductGrid";
import { ProductCard } from "../../pages/ProductCard";
import { Checkout } from "../../pages/Checkout";
import { Admin } from "../../pages/Admin";
import { Login } from "../../pages/Auth/Login";
import { SignUp } from "../../pages/Auth/SingUp";

import { ProtectedRoute } from "../../components/ProtectedRoute";
import { PublicOnlyRoute } from "../../components/PublicOnlyRoute";
import { MainLayout } from "../../components/MainLayout";

export function AppRoutes() {
  return (
    <AppProviders>
      <BrowserRouter>
        <Routes>

          <Route element={<MainLayout />}>
            <Route path="/" element={<ProductGrid />} />
            <Route path="/:slug/:id" element={<ProductCard />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/admin" element={<Admin />} />
            </Route>
          </Route>
          
          <Route element={<PublicOnlyRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/criarconta" element={<SignUp />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </AppProviders>
  );
}