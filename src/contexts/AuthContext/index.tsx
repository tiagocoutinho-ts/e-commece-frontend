import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { api } from "../../api/api";

interface AuthContextData {
  signed: boolean;
  token: string | null;
  loading: boolean;
  signIn: (newToken: string, callback?: () => void) => void;
  signOut: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storagedToken = localStorage.getItem("@ecommerce:token");
    if (storagedToken) {
      setToken(storagedToken);
      api.defaults.headers.common["Authorization"] = `Bearer ${storagedToken}`;
    }
    setLoading(false);
  }, []);

  function signIn(newToken: string, callback?: () => void) {
    localStorage.setItem("@ecommerce:token", newToken);
    setToken(newToken);
    api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

    if (callback) {
      callback();
    }
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
