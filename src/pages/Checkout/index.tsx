import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export function Checkout() {
  const { token }: any = useAuth;
  const navigate = useNavigate();

  console.log(token)
  if (!false) {
    navigate("/login");
  }

  return <main>Página de pagamento</main>;
}
