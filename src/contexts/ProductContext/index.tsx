import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { api } from "@/service/api";
import type { Product, ProductContextData } from "./product.types";

const ProductContext = createContext<ProductContextData>({} as ProductContextData);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/products", {
          params: search ? { search } : {},
        });
        setProducts(data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [search]);

  const handleSearch = (overrideSearch?: string) => {
    const term = overrideSearch !== undefined ? overrideSearch : searchInput;
    setSearch(term);
  };

  return (
    <ProductContext.Provider
      value={{ products, searchInput, setSearchInput, handleSearch, loading }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export const useProducts = () => useContext(ProductContext);