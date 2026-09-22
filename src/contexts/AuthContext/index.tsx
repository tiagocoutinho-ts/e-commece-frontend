import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { api } from "@/service/api";
import type { User, AuthResponse, AuthContextData } from "./auth.types";

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const response = await api.get("/auth/me");
        setUser(response.data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadUser()
  }, [])

  function signIn(response: AuthResponse, callback?: () => void) {
    setUser(response.user);
    if (callback) {
      callback();
    }
  }

  async function signOut() {
    try {
      await api.post("/logout");
    } catch (error) {
      console.error("Erro ao fazer logout", error);
    } finally {
      setUser(null);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        loading,
        signIn,
        signOut,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);