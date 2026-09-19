import styles from "@/pages/Checkout/styles.module.css";
import { formatCurrency } from "@/utils/formatValues";
import { formatSlug } from "@/utils/formatSlug";

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

interface CheckoutItemProps {
  item: CartItem;
  onUpdateQuantity: (productId: string, newQuantity: number) => void;
}

export function CheckoutItem({ item, onUpdateQuantity }: CheckoutItemProps) {
  return (
    <article className={styles.itemCard}>
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
          <div className={styles.boxBotton}>
            <button
              type="button"
              onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
            >
              -
            </button>
            <span className={styles.quantity}>Qtd: {item.quantity}</span>
            <button
              type="button"
              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
            >
              +
            </button>
          </div>
          <span className={styles.totalPrice}>
            {formatCurrency(item.product.price * item.quantity)}
          </span>
        </div>
      </div>
    </article>
  );
}