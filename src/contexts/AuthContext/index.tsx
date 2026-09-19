import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { api } from "@/service/api";
import type { User, AuthResponse, AuthContextData } from "./auth.types";

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState<User | null>(null);

  useEffect(() => {
    const storagedToken = localStorage.getItem("@ecommerce:token");
    if (storagedToken) {
      setToken(storagedToken);
      api.defaults.headers.common["Authorization"] = `Bearer ${storagedToken}`;
    }
    setLoading(false);
  }, []);

  function signIn(response: AuthResponse, callback?: () => void) {
    localStorage.setItem("@ecommerce:token", response.token);
    setToken(response.token);
    api.defaults.headers.common["Authorization"] = `Bearer ${response.token}`;
    setUserName(response.user);
    if (callback) {
      callback();
    }
  }

  function signOut() {
    localStorage.removeItem("@ecommerce:token");
    setToken(null);
    setUserName(null); 
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!token,
        token,
        loading,
        signIn,
        signOut,
        userName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);