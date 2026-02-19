import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import SocialIcon from "../components/SocialIcon";
import Form from "../components/Form";

/* Armazena os valores dos campos de email e senha, também possivel "valores de erro" */
/* export (exporta uma função, variavel, etc.), export default (exporta um componente)*/
export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });
  const [erro, setErro] = useState("");

  /* Faz o envio do formulario quando eu usar o type submit */
  async function handleSubmit(e) {
    /* Impede do formulario recarregar e zera a mensagem de erro */
    e.preventDefault();
    setErro("");

    /* envia as informações de email e senha para a função login */
    try {
      await login(formData.email, formData.senha);
      /* Caso sucesso, exibe mensagem e limpa os campos */
      // alert("Login realizado com sucesso!");
      setFormData({
        email: "",
        senha: "",
      });
      navigate("/home");
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
        <h1 className="m-[-10px] pb-[20px] text-4xl">Login</h1>
        <Form
          type="email"
          placeholder="E-mail"
          value={formData.email}
          set={setFormData}
          fieldName="email"
          icon="bx-user"
        />
        <Form
          type="password"
          placeholder="Senha"
          value={formData.senha}
          set={setFormData}
          fieldName="senha"
          icon="bx-lock"
        />
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
