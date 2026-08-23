import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import { ProductGrid } from "./components/ProductGrid";
import { TopBar } from "./components/TopBar";
import { Admin } from "./pages/admin";

function App() {
  return (
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
