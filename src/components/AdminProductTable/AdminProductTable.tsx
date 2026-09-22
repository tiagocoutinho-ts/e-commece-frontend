import { useEffect, useState } from "react";
import { api } from "@/service/api";
import styles from "./styles.module.css";
import { toast } from "react-toastify";
import { ProductRow } from "./ProductRows";
import { useAuth } from "@/contexts/AuthContext";

export function AdminProductTable() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const { signed, loading: authLoading } = useAuth();

  useEffect(() => {
    const getProducts = async () => {
      if (authLoading || !signed) return;

      try {
        setLoading(true);
        const { data } = await api.get("/products/admin/all");
        console.log(data)
        setProducts(data);
      } catch (error) {
        toast.error("Erro ao carregar produtos do painel.");
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [signed, authLoading]);

  const handlerDeleteProduct = async (id: string) => {
    try {
      await api.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((product) => product.id !== id));
      toast.success("Produto deletado com sucesso!");
    } catch (error) {
      toast.error("Falha ao deletar produto.");
    }
  };

  if (loading) {
    return <div className={styles.loading}>Carregando painel...</div>;
  }

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
              <ProductRow
                key={product.id}
                product={product}
                onDelete={handlerDeleteProduct}
              />
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