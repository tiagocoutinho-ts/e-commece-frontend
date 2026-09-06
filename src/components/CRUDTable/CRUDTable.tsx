import { useEffect, useState } from "react";
import { api } from "../../api/api";
import styles from "./styles.module.css";
import { formatCurrency } from "../../utils/formatValues";
import { toast } from "react-toastify";

export function CRUDTable() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await api.get("/products/admin/all");
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, []);

  const handlerDeleteProduct = async (id) => {
    try {
      const { data, status } = await api.delete(`/products/${id}`);
      console.log(data);
      if (status === 200) {
        toast.success("Produto deletado com sucesso!");
      }
    } catch (error) {
      toast.error("Falha ao deletar produto.");
    }
  };

  return (
    <section className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Imagem</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Preço</th>
            <th>Estoque</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id}>
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
                <td className={styles.price}>
                  {formatCurrency(product.price)}
                </td>
                <td>{product.stock} un.</td>
                <td>
                  {product.active ? (
                    <button
                      className={styles.btn}
                      onClick={() => handlerDeleteProduct(product.id)}
                    >
                      Deletar
                    </button>
                  ) : (
                    <span>
                      Inativo
                      </span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className={styles.empty}>
                Nenhum produto encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}
