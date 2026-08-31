import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { api } from "../../api/api";
import { formatCurrency } from "../../utils/formatValues";
import { formatSlug } from "../../utils/formatSlug";
import styles from "./styles.module.css";
import { TopBar } from "../../components/TopBar";

interface CartItem {
  id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    images: { url: string }[];
  };
}

interface Cart {
  id: string;
  items: CartItem[];
}

export function Checkout() {
  const { token, loading, signOut }: any = useAuth();
  const navigate = useNavigate();

  const [card, setCard] = useState<Cart | null>(null);

  useEffect(() => {
    if (!loading && !token) {
      navigate("/login");
    }
  }, [token, loading, navigate]);

  useEffect(() => {
    if (!token) return;

    const fetchCard = async () => {
      try {
        const { data } = await api.get("/cart");
        setCard(data);
      } catch (error) {
        if (error.response.data.error) {
          alert("Para sua segurança, sua sessão expirou. Conecte-se novamente.");
          signOut()
          navigate("/login")
        } else {
          alert("Falha ao carregar carrinho.");
        }
      }
    };

    fetchCard();
  }, [token]);

  if (loading || !card) {
    return <div className={styles.loading}>Carregando carrinho...</div>;
  }

  const totalCart = card.items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <main className={styles.containerMain}>
      <TopBar />
      <section className={styles.container}>
        <header className={styles.header}>
          <h1>Seu Carrinho</h1>
          <span className={styles.itemCount}>{card.items.length} itens</span>
        </header>

        <section className={styles.itemsList}>
          {card.items.map((item) => (
            <article key={item.id} className={styles.itemCard}>
              <div className={styles.imageWrapper}>
                <img
                  src={item.product.images[0]?.url}
                  alt={formatSlug(item.product.name)}
                />
              </div>

              <div className={styles.itemInfo}>
                <div className={styles.mainDetails}>
                  <h2>{item.product.name}</h2>
                  <span className={styles.unitPrice}>
                    {formatCurrency(item.product.price)} un.
                  </span>
                </div>

                <div className={styles.subDetails}>
                  <span className={styles.quantity}>Qtd: {item.quantity}</span>
                  <span className={styles.totalPrice}>
                    {formatCurrency(item.product.price * item.quantity)}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </section>

        <footer className={styles.summary}>
          <div className={styles.summaryRow}>
            <span>Total</span>
            <strong>{formatCurrency(totalCart)}</strong>
          </div>
          <button className={styles.checkoutButton}>Finalizar Compra</button>
        </footer>
      </section>
    </main>
  );
}
