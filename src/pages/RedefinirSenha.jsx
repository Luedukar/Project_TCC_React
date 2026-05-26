import { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RedefinirPassword } from "../services/authService";
import Form from "../components/Form";

export default function RedefinirSenha() {
  const [novaSenha, setNovaSenha] = useState({
    novaSenha: "",
    confirmarNovaSenha: "",
  });
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  // Faz o envio do formulario quando eu usar o type submit
  async function handleSubmit(e) {
    // Impede do formulario recarregar e zera a mensagem de erro
    e.preventDefault();
    setErro("");

    // Verifica se as senhas coincidem, se não, exibe alerta
    if (novaSenha.novaSenha !== novaSenha.confirmarNovaSenha) {
      setErro("As senhas não coincidem!");
      return;
    }

    // Envia a nova senha para a função RedefinirPassword e aguarda a resposta
    try {
      await RedefinirPassword(novaSenha.novaSenha);
      // Caso sucesso, limpa os campos e direciona para a página de login
      setNovaSenha({
        novaSenha: "",
        confirmarNovaSenha: "",
      });
      navigate("/");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Sua senha foi redefinida com sucesso.",
        showConfirmButton: false,
        timer: 1750,
      });
      // Caso erro, exibe a mensagem de erro
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
            Insira sua nova senha para redefinir sua senha.
          </p>
        </div>
        <form className="w-full space-y-6" onSubmit={handleSubmit}>
          <Form
            type="password"
            placeholder="Nova Senha"
            value={novaSenha.novaSenha}
            set={setNovaSenha}
            fieldName="novaSenha"
            icon="bx-lock"
          />
          <Form
            type="password"
            placeholder="Confirmar Nova Senha"
            value={novaSenha.confirmarNovaSenha}
            set={setNovaSenha}
            fieldName="confirmarNovaSenha"
            icon="bx-lock"
          />
          <button
            className="h-12 w-full transform rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-blue-700 hover:shadow-xl active:scale-95"
            type="submit"
          >
            Redefinir Senha
          </button>
        </form>
        <div className="mt-4 text-center"></div>
        {erro && (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-3">
            <p className="text-center text-sm text-red-600">{erro}</p>
          </div>
        )}
      </div>
    </div>
  );
}
