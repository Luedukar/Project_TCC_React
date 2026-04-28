import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import Form from "../components/Form";

export default function Cadastro() {
  const navigate = useNavigate();
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("");

  // array de dados do formulário
  const [formData, setFormData] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    celular: "",
    dataNascimento: "",
  });

  // Faz o envio do formulario quando eu usar o type submit
  async function handleSubmit(e) {
    // Impede do formulario recarregar
    e.preventDefault();

    // Verifica se as senhas coincidem, se não, exibe alerta
    if (formData.senha !== formData.confirmarSenha) {
      setMensagem("As senhas não coincidem!");
      setTipoMensagem("erro");
      return;
    }

    // Envia as informações do formData para a função register
    try {
      await register(formData);
      // Se a respotas for um status de sucesso (ok) grava no setmensagem e setTipoMensagem e zera os campos de cadastro
      setMensagem("Usuário criado com sucesso!");
      setTipoMensagem("sucesso");

      setFormData({
        nome: "",
        sobrenome: "",
        email: "",
        senha: "",
        confirmarSenha: "",
        celular: "",
        dataNascimento: "",
      });
      // Se não (se for uma mensagem de erro (!ok)) grava no setmensagem e setTipoMensagem
    } catch (error) {
      setMensagem(error.message);
      setTipoMensagem("erro");
    }
  }

  return (
    <div className="form_cadastro absolute right-[-100%] z-1 flex h-full items-center p-[40px] text-center text-black transition-all duration-[1200ms] ease-in-out sm:bottom-[0] sm:w-[50%]">
      <form className="w-full" onSubmit={handleSubmit}>
        <h1 className="m-[-10px] pb-[5px] text-2xl sm:pb-0">
          Crie seu cadastro
        </h1>
        <Form
          type="text"
          placeholder="Nome"
          value={formData.nome}
          set={setFormData}
          fieldName="nome"
          icon="bx bx-user"
        />
        <Form
          type="text"
          placeholder="Sobrenome"
          value={formData.sobrenome}
          set={setFormData}
          fieldName="sobrenome"
          icon="bx bx-community"
        />
        <Form
          type="email"
          placeholder="E-mail"
          value={formData.email}
          set={setFormData}
          fieldName="email"
          icon="bx bx-envelope"
        />
        <Form
          type="password"
          placeholder="Senha"
          value={formData.senha}
          set={setFormData}
          fieldName="senha"
          icon="bx bx-lock"
        />
        <Form
          type="password"
          placeholder="Confirme sua senha"
          value={formData.confirmarSenha}
          set={setFormData}
          fieldName="confirmarSenha"
          icon="bx bx-lock-keyhole"
        />
        <Form
          type="text"
          placeholder="Celular"
          value={formData.celular}
          set={setFormData}
          fieldName="celular"
          icon="bx bx-phone"
        />
        <Form
          type="date"
          placeholder="Data de Nascimento"
          value={formData.dataNascimento}
          set={setFormData}
          fieldName="dataNascimento"
          text="text-base"
          pr="45px"
          icon="bx bx-birthday-cake"
          iconTop="65%"
        />
        <button
          className="mt-[20px] h-[48px] w-full cursor-pointer rounded-lg bg-blue-400 text-base font-semibold text-white shadow-[0_0_10px_rgba(0,0,0,0.1)]"
          type="submit"
        >
          Criar cadastro
        </button>

        {/* Exibe a mensagem de sucesso ou erro, se não houver mensagem, não exibe nada*/}
        {/* Se sucesso (definido no topo), exibe mensagem verde; se erro, exibe mensagem vermelha */}
        {mensagem && (
          <div
            className={`mt-[5px] p-[5px] ${
              tipoMensagem === "sucesso" ? " text-green-800" : " text-red-800"
            }`}
          >
            {mensagem}
          </div>
        )}
      </form>
    </div>
  );
}
