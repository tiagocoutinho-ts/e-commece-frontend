import styles from "../styles.module.css"
import { formatCurrency } from "@/utils/formatValues";

interface ProductRowProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    active: boolean;
    images?: { url: string }[];
  };
  onDelete: (id: string) => void;
}

export function ProductRow({ product, onDelete }: ProductRowProps) {
  return (
    <tr>
      <td>
        {product.images?.[0]?.url ? (
          <img
            src={product.images[0].url}
            alt={product.name}
            className={styles.productImage}
          />
        ) : (
          <span className={styles.noImage}>Sem foto</span>
        )}
      </td>
      <td className={styles.fontBold}>{product.name}</td>
      <td className={styles.description}>{product.description}</td>
      <td className={styles.price}>{formatCurrency(product.price)}</td>
      <td>{product.stock} un.</td>
      <td>
        {product.active ? (
          <button
            type="button"
            className={styles.btn}
            onClick={() => onDelete(product.id)}
          >
            Deletar
          </button>
        ) : (
          <span className={styles.inactive}>Inativo</span>
        )}
      </td>
    </tr>
  );
}