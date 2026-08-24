import { useState } from "react";
import styles from "./styles.module.css";
import formStyles from "./form.module.css";
import { CRUDTable } from "../../components/CRUDTable/CRUDTable";
import { api } from "../../api/api";

export function Admin() {
  const [modal, setModal] = useState(false);
  const [images, setImages] = useState([]);

  const storagedToken = localStorage.getItem("@ecommerce:token");
  api.defaults.headers.common["Authorization"] = `Bearer ${storagedToken}`;

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>
  ) => {
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length > 5) {
      alert("Você pode selecionar no máximo 5 imagens.");
      e.target.value = "";
      return;
    }

    setImages(selectedFiles);
  };

  const handleForm = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    formData.delete("photos");

    images.forEach((file) => {
      formData.append("images", file);
    });

    try {
      await api.post("/products", formData);
      alert("Produto cadastrado com sucesso!");
      handleModal();
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);
      alert("Erro ao enviar os dados.");
    }
  };

  const handleModal = () => {
    setModal((prevModal) => !prevModal);
  };

  return (
    <main className={styles.container}>
      <header>
        <h1>Produtos</h1>
        <button onClick={handleModal}>Novo Produto</button>
      </header>
      {modal && (
        <section className={styles.modal}>
          <form onSubmit={handleForm}>
            <div className={formStyles.groupInput}>
              <label>Nome</label>
              <input
                type="text"
                name="name"
                placeholder=""
                autoComplete="off"
              />
            </div>

            <div className={formStyles.groupInput}>
              <label>Descrição</label>
              <textarea
                name="description"
                placeholder="Detalhes do produto..."
              />
            </div>

            <div className={formStyles.row}>
              <div className={formStyles.groupInput}>
                <label>Preço</label>
                <input
                  type="number"
                  step="0.01"
                  name="price"
                  placeholder="0,00"
                />
              </div>

              <div className={formStyles.groupInput}>
                <label>Quantidade</label>
                <input type="number" name="stock" placeholder="0" />
              </div>
            </div>

            <div className={formStyles.groupInput}>
              <label htmlFor="photos">Fotos do produto (máx. 5)</label>
              <input
                onChange={handleImageChange}
                type="file"
                id="photos"
                name="photos"
                accept="image/*"
                multiple
                className={formStyles.fileInput}
              />
              <span className={formStyles.fileHint}>
                Selecione até 5 imagens (PNG, JPG ou WEBP)
              </span>
            </div>
            <div className={formStyles.actions}>
              <button type="button" onClick={handleModal}>
                Cancelar
              </button>
              <button type="submit">Cadastrar</button>
            </div>
          </form>
        </section>
      )}

      <CRUDTable />
    </main>
  );
}
