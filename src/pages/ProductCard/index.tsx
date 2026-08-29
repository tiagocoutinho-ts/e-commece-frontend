import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../api/api";
import styles from "./styles.module.css";
import { TopBar } from "../../components/TopBar";
import { ShoppingCart, Zap } from "lucide-react";
import { useCar } from "../../contexts/CardContext";

export function ProductCard() {
  const { setItemCount } = useCar();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const stockLimit = 5;
  const { id } = useParams();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
      } catch (error) {
        alert("Erro ao carregar produto.");
      }
    };

    getProduct();
  }, []);

  const handleAddToCart = async () => {
    try {
      setItemCount((prev) => prev + 1);
    } catch (error) {
      alert("Erro ao adicionar ao carrinho.");
    }
  };

  return (
    <main>
      <TopBar />
      <section className={styles.productSection}>
        {product ? (
          <div className={styles.productGrid}>
            <div className={styles.galleryContainer}>
              <div className={styles.thumbnailsList}>
                {product.images?.map((img, index) => (
                  <img
                    key={index}
                    src={img.url}
                    alt={`${product.name} ${index}`}
                    className={`${styles.thumbnail} ${
                      selectedImage === img.url ? styles.activeThumbnail : ""
                    }`}
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
              <div className={styles.buttonGroup}>
                <div className={styles.quantityContainer}>
                  <label htmlFor="quantitySelect">Quantidade:</label>
                  <select
                    id="quantitySelect"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className={styles.quantitySelect}
                  >
                    {Array.from({ length: stockLimit }, (_, index) => {
                      const value = index + 1;
                      return (
                        <option key={value} value={value}>
                          {value} {value === 1 ? "unidade" : "unidades"}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <Link to={"/checkout"}>
                  <button type="button" className={styles.buyNowButton}>
                    <Zap size={18} />
                    Comprar agora
                  </button>
                </Link>
                <button
                  type="button"
                  className={styles.addToCartButton}
                  onClick={handleAddToCart}
                >
                  <ShoppingCart size={18} />
                  Adicionar ao carrinho
                </button>
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
