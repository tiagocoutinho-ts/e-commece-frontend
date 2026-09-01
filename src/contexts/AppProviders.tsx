import { AuthProvider } from "./AuthContext";
import { CardProvider } from "./CardContext";

export function AppProviders({ children }) {
  return (
    <AuthProvider>
      <CardProvider>{children}</CardProvider>
    </AuthProvider>
  );
}
