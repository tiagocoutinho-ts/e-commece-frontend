import styles from "./styles.module.css"

export function AppLayout({ children }) {
  return (
    <main className={styles.container}>
      <section>{children}</section>
    </main>
  );
}
