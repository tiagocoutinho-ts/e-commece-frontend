import styles from "./styles.module.css";
import { formatCurrency } from "../../utils/formatValues";
import { Link } from "react-router-dom";
import { formatSlug } from "../../utils/formatSlug";
import { useProducts } from "../../contexts/ProductContext";

export function ProductGrid() {
  const { products } = useProducts();

  return (
    <section className={styles.productGrid}>
      {products &&
        products.map((product) => (
          <Link to={`/${formatSlug(product.name)}/${product.id}`}>
            <article key={product.id} className={styles.productCard}>
              <div className={styles.imageContainer}>
                {product.images?.length > 0 ? (
                  <img src={product.images[0].url} alt={product.name} />
                ) : (
                  <div className={styles.noImage}>Sem imagem</div>
                )}
              </div>

              <div className={styles.productInfo}>
                <h3 className={styles.productName}>{product.name}</h3>
                <span className={styles.productPrice}>
                  {formatCurrency(product.price)}
                </span>
              </div>
            </article>
          </Link>
        ))}
    </section>
  );
}
