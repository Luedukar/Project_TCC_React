import { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validarDuploFator, Reenviar } from "../services/authService";
import Form from "../components/Form";

export default function DuploFator() {
  const [codigo, setCodigo] = useState({
    codigo: "",
  });
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("");
  const navigate = useNavigate();
  const [cooldown, setCooldown] = useState(0);

  // Faz o envio do formulario quando eu usar o type submit
  async function handleSubmit(e) {
    // Impede do formulario recarregar e zera a mensagem de erro
    e.preventDefault();
    setMensagem("");
    setTipoMensagem("");

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
      setMensagem(err.message);
      setTipoMensagem("erro");
    }
  }

  // Função para lidar com o clique no link de reenviar código
  async function handleReenviar(e) {
    e.preventDefault();
    setMensagem("");
    setTipoMensagem("");
    // Se estiver em cooldown, não permite reenviar e exibe a mensagem de erro
    if (cooldown > 0) {
      setMensagem(
        `Por favor, aguarde ${cooldown} segundos antes de reenviar o código.`,
      );
      setTipoMensagem("erro");
      return;
    }
    try {
      const response = await Reenviar();
      setMensagem("Código reenviado com sucesso! Verifique seu email.");
      setTipoMensagem("sucesso");
      setCooldown(response.cooldown);
    } catch (err) {
      setMensagem(err.message); //Definir a mensagem de erro para exibir na tela
      setTipoMensagem("erro");
      if (err.status === 429) {
        setCooldown(err.retryAfter); //Definir o tempo de cooldown para desabilitar o link de reenviar
      }
    }
  }

  // useEffect para lidar com o cooldown do link de reenviar, decrementando o tempo a cada segundo até chegar a 0
  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

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
            disabled={cooldown > 0}
            onClick={handleReenviar}
          >
            {cooldown > 0
              ? `Reenviar em ${cooldown}s`
              : "Não recebeu o código? Reenviar"}
          </a>
        </div>
        {mensagem && (
          <div
            className={`mt-2 rounded-md p-3 text-sm ${tipoMensagem === "sucesso" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}
          >
            {mensagem}
          </div>
        )}
      </div>
    </div>
  );
}
