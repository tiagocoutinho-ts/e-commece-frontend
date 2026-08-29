import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppLayout } from "../../components/AppLayout";
import { ProductGrid } from "../../components/ProductGrid";
import { TopBar } from "../../components/TopBar";
import { AppProviders } from "../../contexts/AppProviders";
import { Login } from "../../pages/Auth/Login";
import { SingUp } from "../../pages/Auth/SingUp";
import { Admin } from "../../pages/Admin";
import { ProductCard } from "../../pages/ProductCard";
import { Checkout } from "../../pages/Checkout";
import { ProtectedRoute } from "../../components/ProtectedRoute";
import { PublicOnlyRoute } from "../../components/PublicOnlyRoute";

export function AppRoutes() {
  return (
    <AppProviders>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <AppLayout>
                <TopBar />
                <ProductGrid />
              </AppLayout>
            }
          />
          <Route path="/:slug/:id" element={<ProductCard />} />

          <Route element={<PublicOnlyRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/criarconta" element={<SingUp />} />
          </Route>

          {/* PrivateRoute */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<Admin />} />
            <Route path="/checkout" element={<Checkout />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProviders>
  );
}
