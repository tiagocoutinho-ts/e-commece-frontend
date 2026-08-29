import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export function PublicOnlyRoute() {
  const { signed, loading }: any = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }
  if (signed) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}