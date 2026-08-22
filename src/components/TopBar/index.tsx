import styles from "./styles.module.css"

export function TopBar() {
  return (
    <main className={styles.topBar}>
      <h1>Bem vindo ao e-commerce-BR!</h1>
      <div>
      <input type="text" placeholder="Pesquisar"/>
      </div>
    </main>
  );
}
