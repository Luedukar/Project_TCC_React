import { useState } from "react";
import { login } from "../services/authService";
import SocialIcon from "../components/SocialIcon";

/* Armazena os valores dos campos de email e senha, também possivel "valores de erro" */
/* export (exporta uma função, variavel, etc.), export default (exporta um componente)*/
export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  /* Faz o envio do formulario quando eu usar o type submit */
  async function handleSubmit(e) {
    /* Impede do formulario recarregar e zera a mensagem de erro */
    e.preventDefault();
    setErro("");

    /* envia as informações de email e senha para a função login */
    try {
      await login(email, senha);
      /* Caso sucesso, exibe mensagem e limpa os campos */
      alert("Login realizado com sucesso!");
      setEmail("");
      setSenha("");
      console.log("TOKEN SALVO:", localStorage.getItem("token"));
      /* Caso erro, exibe a mensagem de erro */
    } catch (err) {
      setErro(err.message);
    }
  }

  return (
    <div className="form_login absolute right-[0] bottom-[0] z-1 flex h-[70%] w-full items-center p-[40px] text-center text-black transition-all duration-[900ms] ease-in-out sm:h-full sm:w-[50%] sm:bg-white">
      <form className="w-full" onSubmit={handleSubmit}>
        {" "}
        {/* Define que esse é o formulario a ser enviado */}
        <h1 className="m-[-10px] text-4xl">Login</h1>
        <div className="relative w-full pt-[35px]">
          <input
            className="w-full rounded-lg bg-zinc-200 pt-[8px] pr-[30px] pb-[8px] pl-[20px] text-sm font-medium text-zinc-800 outline-none"
            placeholder="Username"
            /* Esse é o campo e-mail */
            value={email}
            type="email"
            /* Qualquer alteração que eu fizer neste campo, executa o setEmail */
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <i className="bx-user absolute top-[76%] right-[15px] translate-y-[-50%] bg-transparent text-xl"></i>
        </div>
        <div className="relative w-full pt-[25px]">
          <input
            className="w-full rounded-lg bg-zinc-200 pt-[8px] pr-[40px] pb-[8px] pl-[20px] text-sm font-medium text-zinc-800 outline-none"
            type="password"
            placeholder="password"
            /* Esse é o campo senha */
            value={senha}
            /* Qualquer alteração que eu fizer neste campo, executa o setSenha */
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <i className="bx-lock absolute top-[70%] right-[15px] translate-y-[-50%] bg-transparent text-xl"></i>
        </div>
        <div className="pt-[15px] pb-[20px]">
          <a className="m-[30px] p-[20px] text-sm text-black" href="#">
            Forgot password?
          </a>
        </div>
        <button
          className="h-[48px] w-full cursor-pointer rounded-lg bg-blue-400 text-base font-semibold text-white shadow-[0_0_10px_rgba(0,0,0,0.1)]"
          /* O type submit para envio do formulario */
          type="submit"
        >
          Login
        </button>
        <p className="m-[15px] text-base">Visit my social platforms</p>
        <div className="flex justify-center">
          <SocialIcon href="#" name="linkedin-square" />
          <SocialIcon href="#" name="github" />
          <SocialIcon href="#" name="instagram" />
          <SocialIcon href="#" name="facebook-circle" />
        </div>
        {/* Se erro for vazio, não exibe nada, do contrario exibe a mensagem de erro */}
        {erro && <p style={{ color: "red" }}>{erro}</p>}
      </form>
    </div>
  );
}
