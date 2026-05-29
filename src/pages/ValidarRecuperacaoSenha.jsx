import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validarDuploFatorRecoverPassword } from "../services/authService";
import Form from "../components/Form";

export default function ValidarRecuperacaoSenha() {
  const [codigo, setCodigo] = useState({
    codigo: "",
  });
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");

    try {
      await validarDuploFatorRecoverPassword(codigo.codigo);
      setCodigo({
        codigo: "",
      });
      navigate("/redefinir-senha");
    } catch (err) {
      setErro(err.message);
    }
  }

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
        </form>
        {erro && (
          <div className="relative z-10 mt-6 rounded-lg border border-red-200 bg-red-50 p-3">
            <p className="text-center text-sm text-red-600">{erro}</p>
          </div>
        )}
      </div>
    </div>
  );
}
