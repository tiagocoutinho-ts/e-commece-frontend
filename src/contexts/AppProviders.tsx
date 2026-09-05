import { AuthProvider } from "./AuthContext";
import { CardProvider } from "./CardContext";
import { ProductProvider } from "./ProductContext";

export function AppProviders({ children }) {
  return (
    <AuthProvider>
      <ProductProvider>
        <CardProvider>{children}</CardProvider>
      </ProductProvider>
    </AuthProvider>
  );
}
