import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../api/api";
import styles from "./styles.module.css";
import { TopBar } from "../../components/TopBar";
import { ShoppingCart, Zap } from "lucide-react";
import { useCard } from "../../contexts/CardContext";

export function ProductCard() {
  const { addToCard, createOrder } = useCard();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const stockLimit = 5;
  const { id } = useParams();

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        setError(false);
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
        if (data.images && data.images.length > 0) {
          setSelectedImage(data.images[0].url);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getProduct();
    }
  }, [id]);

  const handleBuyNow = async () => {
    addToCard(product, quantity);
    const currentItem = [{ product, quantity }];

    try {
      await createOrder(currentItem);
      navigate("/checkout");
    } catch (err) {
      alert("Não foi possível processar a compra. Tente novamente.");
    }
  };

  const handleAddCard = (product, quantity) => {
    const currentItem = [{ product, quantity }];
    addToCard(product, quantity);
    createOrder(currentItem);
  };

  return (
    <main>
      <TopBar />
      <section className={styles.productSection}>
        {loading ? (
          <div className={styles.loading}>Carregando produto...</div>
        ) : error || !product ? (
          <p className={styles.errorMessage}>Falha ao visualizar produto.</p>
        ) : (
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

                <button
                  type="button"
                  className={styles.buyNowButton}
                  onClick={handleBuyNow}
                >
                  <Zap size={18} />
                  Comprar agora
                </button>
                <button
                  type="button"
                  className={styles.addToCartButton}
                  onClick={() => handleAddCard(product, quantity)}
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
        )}
      </section>
    </main>
  );
}
