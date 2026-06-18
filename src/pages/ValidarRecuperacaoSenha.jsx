import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  validarDuploFatorRecoverPassword,
  Reenviar,
} from "../services/authService";
import Form from "../components/Form";

export default function ValidarRecuperacaoSenha() {
  const [codigo, setCodigo] = useState({
    codigo: "",
  });
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("");
  const navigate = useNavigate();
  const [cooldown, setCooldown] = useState(0);

  async function handleSubmit(e) {
    e.preventDefault();
    setMensagem("");
    setTipoMensagem("");

    try {
      await validarDuploFatorRecoverPassword(codigo.codigo);
      setCodigo({
        codigo: "",
      });
      navigate("/redefinir-senha");
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
    <div className="flex min-h-screen items-center justify-center bg-linear-[90deg,#e2e2e2,#c9d6ff] px-4 py-8">
      <div className="shadow-blue relative w-full max-w-md overflow-hidden rounded-[28px] bg-white/95 p-10 shadow-2xl transition-all duration-300">
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 opacity-90" />
        <button
          className="absolute top-4 left-4 z-10 rounded-full bg-white/90 text-slate-500 shadow-sm transition-colors duration-300 hover:bg-white hover:text-slate-700"
          title="Voltar"
          onClick={() => navigate(-1)}
        >
          <box-icon
            name="left-arrow-alt"
            size="md"
            className="pl-1.0 cursor-pointer justify-center pt-1.5"
          ></box-icon>
        </button>
        <div className="relative z-10 mb-6 text-center">
          <div className="mx-auto mb-5 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md">
            <box-icon name="lock" size="lg" color="#274DF5"></box-icon>
          </div>
          <h1 className="mb-3 text-3xl font-bold text-slate-900">
            Validar Código de Recuperação
          </h1>
          <p className="text-sm leading-relaxed text-slate-600">
            Digite o código enviado para o seu email para confirmar sua
            solicitação e seguir para redefinir a senha.
          </p>
        </div>
        <form
          className="relative z-10 w-full space-y-6"
          onSubmit={handleSubmit}
        >
          <Form
            type="text"
            placeholder="Código de recuperação"
            value={codigo.codigo}
            set={setCodigo}
            fieldName="codigo"
            icon="bx-lock"
          />
          <button
            className="h-12 w-full transform rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 font-semibold text-white opacity-90 shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:via-blue-600 hover:to-blue-700 active:scale-95"
            type="submit"
          >
            Confirmar Código
          </button>
          <div className="text-center">
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
        </form>
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
