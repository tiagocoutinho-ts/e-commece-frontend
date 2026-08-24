import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api/api";
import styles from "./styles.module.css"
import { TopBar } from "../../components/TopBar";

export function ProductCard() {
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        console.log(data);
        setProduct(data);
      } catch (error) {
        alert("Erro ao carregar produto.");
      }
    };

    getProduct();
  }, []);

  return (
    <main>
      <TopBar /><section className={styles.productSection}>
        {product ? (
          <div className={styles.productGrid}>
            <div className={styles.galleryContainer}>
              <div className={styles.thumbnailsList}>
                {product.images?.map((img, index) => (
                  <img
                    key={index}
                    src={img.url}
                    alt={`${product.name} ${index}`}
                    className={`${styles.thumbnail} ${selectedImage === img.url ? styles.activeThumbnail : ""}`}
                    onClick={() => setSelectedImage(img.url)}
                  />
                ))}
              </div>
              <div className={styles.mainImageWrapper}>
                <img
                  src={selectedImage || product.images?.[0]?.url}
                  alt={product.name}
                  className={styles.mainImage}
                />
              </div>
            </div>
            
            <div className={styles.infoContainer}>
              <h1 className={styles.title}>{product.name}</h1>
              <div className={styles.priceContainer}>
                <span className={styles.currency}>R$</span>
                <span className={styles.price}>{product.price}</span>
              </div>
              <hr className={styles.divider} />
              <div className={styles.descriptionSection}>
                <h3>Sobre este item</h3>
                <p>{product.description}</p>
              </div>
            </div>
          </div>
        ) : (
          <p className={styles.errorMessage}>Falha ao visualizar produto.</p>
        )}
      </section>
    </main>
  );
}
