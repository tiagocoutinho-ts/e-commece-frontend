import { useState } from "react";
import styles from "./styles.module.css";
import formStyles from "./form.module.css";

export function Admin() {
  const [modal, setModal] = useState(false);

  const handleForm = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleModal = () => {
    setModal((prevModal) => !prevModal);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 5) {
      alert("Você só pode selecionar no máximo 5 fotos.");
      e.target.value = ""; // Limpa a seleção
    }
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
    </main>
  );
}
