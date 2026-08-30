import { ShoppingCart, Search } from "lucide-react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { useCar } from "../../contexts/CardContext";

export function TopBar() {
  const { itemCount, createOrder } = useCar();

  return (
    <header className={styles.topBar}>
      <div className={styles.container}>
        <Link to={"/"}>
          <div className={styles.logo}>
            <span>
              Auto<strong>Drive</strong>
            </span>
          </div>
        </Link>

        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Busque por peças, acessórios ou modelo do carro..."
          />
          <button type="button" aria-label="Pesquisar">
            <Search size={18} />
          </button>
        </div>

        <div className={styles.actions}>
          <div className={styles.account}>
            <span>Olá, motorista</span>
            <strong>Minha Conta</strong>
          </div>

          <Link to={"/checkout"} onClick={createOrder}>
            <button
              className={styles.cartButton}
              aria-label="Carrinho de compras"
            >
              <ShoppingCart size={22} />
              <span className={styles.cartBadge}>{itemCount}</span>
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}
