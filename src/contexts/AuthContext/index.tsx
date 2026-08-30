import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../../api/api";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storagedToken = localStorage.getItem("@ecommerce:token");
    if (storagedToken) {
      setToken(storagedToken);
      api.defaults.headers.common["Authorization"] = `Bearer ${storagedToken}`;
    }
    setLoading(false);
  }, []);

  function signIn(newToken) {
    localStorage.setItem("@ecommerce:token", newToken);
    setToken(newToken);
  }

  function signOut() {
    localStorage.removeItem("@ecommerce:token");
    setToken(null);
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!token,
        token,
        loading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
