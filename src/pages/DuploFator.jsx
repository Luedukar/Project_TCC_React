import { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validarDuploFator } from "../services/authService";
import Form from "../components/Form";

export default function DuploFator() {
  const [codigo, setCodigo] = useState({
    codigo: "",
  });
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  // Faz o envio do formulario quando eu usar o type submit
  async function handleSubmit(e) {
    // Impede do formulario recarregar e zera a mensagem de erro
    e.preventDefault();
    setErro("");

    // envia as informações de email e senha para a função login
    try {
      await validarDuploFator(codigo.codigo);
      // Caso sucesso, exibe mensagem e limpa os campos
      setCodigo({
        codigo: "",
      });
      console.log("Código validado com sucesso");
      navigate("/Home");
      // Caso erro, exibe a mensagem de erro
    } catch (err) {
      setErro(err.message);
    }
  }

  return (
    <div>
      <h1>Duplo Fator</h1>
      <p>Em breve, esta página estará disponível.</p>
      <form className="w-full" onSubmit={handleSubmit}>
        <Form
          type="text"
          placeholder="Código"
          value={codigo.codigo}
          set={setCodigo}
          fieldName="codigo"
          icon="bx-lock"
        />
        <button
          className="h-[48px] w-full cursor-pointer rounded-lg bg-blue-400 text-base font-semibold text-white shadow-[0_0_10px_rgba(0,0,0,0.1)]"
          type="submit"
        >
          Enviar Código
        </button>
      </form>
      {erro && <p style={{ color: "red" }}>{erro}</p>}
    </div>
  );
}
