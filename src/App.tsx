import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import { ProductGrid } from "./components/ProductGrid";
import { TopBar } from "./components/TopBar";
import { Admin } from "./pages/admin";
import { ProductCard } from "./pages/ProductCard";
import { CardProvider } from "./contexts/CardContext";

function App() {
  return (
    <CardProvider>
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

          <Route path="/admin" element={<Admin />} />
          <Route path="/:slug/:id" element={<ProductCard />} />
        </Routes>
      </BrowserRouter>
    </CardProvider>
  );
}

export default App;
