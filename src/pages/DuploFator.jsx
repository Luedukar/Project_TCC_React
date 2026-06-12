import { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validarDuploFator, Reenviar } from "../services/authService";
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

  // Função para lidar com o clique no link de reenviar código
  async function handleReenviar(e) {
    e.preventDefault();
    setErro("");

    try {
      await Reenviar();
      alert("Código reenviado com sucesso! Verifique seu email.");
    } catch (err) {
      setErro(err.message);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 via-blue-50 to-white px-4 py-8">
      <div className="hover:shadow-3xl relative w-full max-w-md rounded-2xl border border-blue-200/50 bg-white/90 p-10 shadow-2xl backdrop-blur-sm transition-all duration-300">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 text-gray-400 transition-colors duration-200 hover:text-gray-600"
          title="Voltar"
        >
          <box-icon
            name="left-arrow-alt"
            size="sm"
            className="cursor-pointer transition-transform duration-200 hover:scale-110"
          ></box-icon>
        </button>
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
            <box-icon name="shield" size="lg" color="white"></box-icon>
          </div>
          <h1 className="mb-3 bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-3xl font-bold text-transparent">
            Duplo Fator de Segurança
          </h1>
          <p className="text-sm leading-relaxed text-gray-600">
            Insira o código de autenticação enviado para o seu email para
            acessar sua conta.
          </p>
        </div>
        <form className="w-full space-y-6" onSubmit={handleSubmit}>
          <Form
            type="text"
            placeholder="Código de Autenticação"
            value={codigo.codigo}
            set={setCodigo}
            fieldName="codigo"
            icon="bx-lock"
          />
          <button
            className="h-12 w-full transform rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-blue-700 hover:shadow-xl active:scale-95"
            type="submit"
          >
            Verificar Código
          </button>
        </form>
        <div className="mt-4 text-center">
          <a
            href="#"
            className="text-sm text-blue-600 transition-colors duration-200 hover:text-blue-800 hover:underline"
            onClick={handleReenviar}
          >
            Não recebeu o código? Enviar novamente
          </a>
        </div>
        {erro && (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-3">
            <p className="text-center text-sm text-red-600">{erro}</p>
          </div>
        )}
      </div>
    </div>
  );
}
