import { AuthProvider } from "./AuthContext";
import { CardProvider } from "./CardContext";

export function AppProviders({ children }) {
  return (
    <CardProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </CardProvider>
  )
}