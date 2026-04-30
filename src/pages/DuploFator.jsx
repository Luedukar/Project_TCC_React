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

    // Envia o código inserido para a função validarDuploFator e aguarda a resposta
    try {
      await validarDuploFator(codigo.codigo);
      // Caso sucesso, limpa os campos e direciona para a página Home
      setCodigo({
        codigo: "",
      });
      navigate("/Home");
      // Caso erro, exibe a mensagem de erro
    } catch (err) {
      setErro(err.message);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-center text-3xl font-bold text-transparent">
          Duplo Fator de segurança
        </h1>
        <p className="mb-6 text-center text-gray-600">
          Insira o código de autenticação enviado para o seu email para acessar
          sua conta.
        </p>
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
            className="mt-4 h-[48px] w-full cursor-pointer rounded-lg bg-blue-400 text-base font-semibold text-white shadow-[0_0_10px_rgba(0,0,0,0.1)] transition-all hover:bg-blue-500"
            type="submit"
          >
            Enviar Código
          </button>
        </form>
        {erro && <p className="mt-4 text-center text-red-500">{erro}</p>}
      </div>
    </div>
  );
}
