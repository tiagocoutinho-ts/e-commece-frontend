import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { api } from "../../api/api";
import { formatCurrency } from "../../utils/formatValues";
import { Link } from "react-router-dom";
import { formatSlug } from "../../utils/formatSlug";

export function ProductGrid() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await api.get("/products");
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, []);

  return (
    <section className={styles.productGrid}>
      {products.length > 0 &&
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
