import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { api } from "../../api/api";

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
          <div key={product.id} className={styles.productCard}>
            <h3>{product.name}</h3>
            <h3>{product.price}</h3>

            {product.images.length > 0 ? (
              <img
                width={100}
                src={product.images[0].url}
                alt={product.name.split(" ").join("-").toLowerCase()}
              />
            ) : (
              <p>sem imagem</p>
            )}
          </div>
        ))}
    </section>
  );
}
