import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { useAuth } from "../../../contexts/AuthContext";
import { useState } from "react";
import { api } from "../../../api/api";

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handlerFormSingUp = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Preencha todos os campos.");
      return;
    }

    try {
      const { data } = await api.post("/auth/register", {
        name,
        email,
        password,
      });
      signIn(data, () => {
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
          Crie sua conta no <strong>AutoDrive</strong>
        </div>
        <div>
          <form className={styles.form} onSubmit={handlerFormSingUp}>
            <div className={styles.inputGroup}>
              <label htmlFor="name">Nome de usuário</label>
              <input
                id="name"
                type="text"
                placeholder="Seu nome"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

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
              Cadastrar
            </button>
          </form>

          <p className={styles.footerText}>
            Já possui uma conta?
            <Link to="/login">Fazer login</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
