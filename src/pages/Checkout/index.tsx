import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { api } from "@/service/api";
import { formatCurrency } from "@/utils/formatValues";
import styles from "./styles.module.css";
import { useCard } from "@/contexts/CardContext";
import { toast } from "react-toastify";
import { CheckoutItem } from "@/components/CheckoutItem";

export function Checkout() {
  const { token, loading: authLoading, signOut }: any = useAuth();
  const navigate = useNavigate();
  const { card, dispatch } = useCard();

  useEffect(() => {
    if (!authLoading && !token) {
      navigate("/login");
    }
  }, [token, authLoading, navigate]);

  useEffect(() => {
    if (!token) return;

    const fetchCard = async () => {
      try {
        const { data } = await api.get("/cart");
        if (data) {
          dispatch({ type: "SET_CART", payload: data });
        }
      } catch (error: any) {
        if (error.response?.data?.error) {
          toast.info("Para sua segurança, sua sessão expirou. Conecte-se novamente.");
          signOut();
          navigate("/login");
        } else {
          toast.error("Falha ao carregar carrinho.");
        }
      }
    };

    fetchCard();
  }, [token, dispatch, signOut, navigate]);

  const totalCart =
    card?.items?.reduce((acc, item) => acc + item.product.price * item.quantity, 0) ?? 0;

  const handleUpdateQuantity = async (productId: string, newQuantity: number) => {
    try {
      const { data } = await api.put("/cart/items", {
        items: [{ productId, quantity: newQuantity }],
      });
      dispatch({ type: "SET_CART", payload: data });
    } catch (error) {
      toast.error("Erro ao atualizar a quantidade.");
    }
  };

  const handlerOrderCheckout = async () => {
    try {
      const { status } = await api.post("/orders/checkout", {
        shippingAddress: "São Paulo, Zona Leste",
      });
      if (status === 201) {
        toast.success("Compra realizada com sucesso!");
        dispatch({ type: "CLEAR_CART" });
        navigate("/");
      }
    } catch (error) {
      toast.error("Falha ao concluir a compra.");
    }
  };

  return (
    <main className={styles.containerMain}>
      <section className={styles.container}>
        {authLoading || !card || !card.items ? (
          <div className={styles.loading}>Carregando carrinho...</div>
        ) : (
          <>
            <header className={styles.header}>
              <h1>Seu Carrinho</h1>
              <span className={styles.itemCount}>{card.items.length} itens</span>
            </header>

            {card.items.length > 0 ? (
              <>
                <section className={styles.itemsList}>
                  {card.items.map((item) => (
                    <CheckoutItem
                      key={item.id}
                      item={item}
                      onUpdateQuantity={handleUpdateQuantity}
                    />
                  ))}
                </section>

                <footer className={styles.summary}>
                  <div className={styles.summaryRow}>
                    <span>Total</span>
                    <strong>{formatCurrency(totalCart)}</strong>
                  </div>
                  <button onClick={handlerOrderCheckout} className={styles.checkoutButton}>
                    Finalizar Compra
                  </button>
                </footer>
              </>
            ) : (
              <p className={styles.emptyMessage}>Seu carrinho está vazio.</p>
            )}
          </>
        )}
      </section>
    </main>
  );
}