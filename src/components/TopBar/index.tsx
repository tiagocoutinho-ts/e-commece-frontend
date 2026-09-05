import { ShoppingCart, Search } from "lucide-react";
import styles from "./styles.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useCard } from "../../contexts/CardContext";
import { useProducts } from "../../contexts/ProductContext";

export function TopBar() {
  const { itemsCount, createOrder } = useCard();
  const { searchInput, setSearchInput, handleSearch } = useProducts();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
    navigate("/");
  };

  const handleLogoClick = () => {
    setSearchInput(""); 
    handleSearch("");     
  };

  return (
    <header className={styles.topBar}>
      <div className={styles.container}>
        <Link to={"/"} onClick={handleLogoClick}>
          <div className={styles.logo}>
            <span>
              Auto<strong>Drive</strong>
            </span>
          </div>
        </Link>

        <form onSubmit={handleSubmit} className={styles.searchBox}>
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            type="text"
            placeholder="Pesquisar na autodrive"
          />
          <button type="submit" aria-label="Pesquisar">
            <Search size={18} />
          </button>
        </form>

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
              {itemsCount > 0 && (
                <span className={styles.cartBadge}>{itemsCount}</span>
              )}
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}
