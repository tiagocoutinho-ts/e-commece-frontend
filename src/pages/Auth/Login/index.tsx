import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { useState } from "react";
import { api } from "../../../api/api";
import { useAuth } from "../../../contexts/AuthContext";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handlerFormLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Preencha os campos email e senha.");
      return;
    }

    try {
      const { data } = await api.post("/auth/login", { email, password });
      signIn(data.token, () => {
        navigate(from, { replace: true });
      });
    } catch (error) {
      alert("Erro ao fazer login.");
    }
  };

  return (
    <main className={styles.main}>
      <section className={styles.loginSection}>
        <div className={styles.title}>
          Bem-vindo ao <strong>AutoDrive</strong>
        </div>
        <div>
          <form className={styles.form} onSubmit={handlerFormLogin}>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="seu@email.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password">Senha</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className={styles.submitButton}>
              Login
            </button>
          </form>

          <p className={styles.footerText}>
            Não tem uma conta?
            <Link to="/criarconta">Criar conta</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
