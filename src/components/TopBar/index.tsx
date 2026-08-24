import { ShoppingCart, Search, Wrench } from "lucide-react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";

export function TopBar() {
  return (
    <header className={styles.topBar}>
      <div className={styles.container}>
        <Link to={"/"}>
        <div className={styles.logo}>
          <Wrench className={styles.logoIcon} />
          <span>AUTO<strong>DRIVE</strong></span>
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
          
          <button className={styles.cartButton} aria-label="Carrinho de compras">
            <ShoppingCart size={22} />
            <span className={styles.cartBadge}>0</span>
          </button>
        </div>
      </div>
    </header>
  );
}