import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { api } from "../../api/api";

export function Checkout() {
  const { token }: any = useAuth();
  const navigate = useNavigate();

  const [card, setCard] = useState();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  });

  useEffect(() => {
    if (!token) return;

    try {
      const fetchCard = async () => {
        const { data } = await api.get("/cart");
        setCard(data);
      };
      fetchCard();
    } catch (error) {
      alert("Falha ao carregar carrinho.");
    }
  }, [token]);

  return <main>Página de pagamento {JSON.stringify(card)}</main>;
}
