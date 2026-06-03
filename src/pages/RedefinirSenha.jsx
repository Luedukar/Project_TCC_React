import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RedefinirPassword } from "../services/authService";
import Form from "../components/Form";
import Swal from "sweetalert2";

export default function RedefinirSenha() {
  const [novaSenha, setNovaSenha] = useState({
    novaSenha: "",
    confirmarNovaSenha: "",
  });
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");

    if (novaSenha.novaSenha !== novaSenha.confirmarNovaSenha) {
      setErro("As senhas não coincidem!");
      return;
    }

    try {
      await RedefinirPassword(novaSenha.novaSenha);
      setNovaSenha({
        novaSenha: "",
        confirmarNovaSenha: "",
      });
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Sua senha foi redefinida com sucesso.",
        showConfirmButton: false,
        timer: 1750,
      });
      navigate("/");
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
            <box-icon name="lock-alt" size="lg" color="#274DF5"></box-icon>
          </div>
          <h1 className="mb-3 text-3xl font-bold text-slate-900">
            Defina sua nova senha
          </h1>
          <p className="text-sm leading-relaxed text-slate-600">
            Digite e confirme a nova senha para concluir a recuperação da sua
            conta com segurança.
          </p>
        </div>
        <form
          className="relative z-10 w-full space-y-2"
          onSubmit={handleSubmit}
        >
          <Form
            type="password"
            placeholder="Nova senha"
            value={novaSenha.novaSenha}
            set={setNovaSenha}
            fieldName="novaSenha"
            icon="bx-lock"
          />
          <Form
            type="password"
            placeholder="Confirmar nova senha"
            value={novaSenha.confirmarNovaSenha}
            set={setNovaSenha}
            fieldName="confirmarNovaSenha"
            icon="bx bx-lock-keyhole"
          />
          <button
            className="mt-5 h-12 w-full transform rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 font-semibold text-white opacity-90 shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:via-blue-600 hover:to-blue-700 active:scale-95"
            type="submit"
          >
            Atualizar Senha
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
