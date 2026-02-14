import { useNavigate } from "react-router-dom";
import Form from "../components/Form";
import { useState } from "react";
import { criarAviso } from "../services/authService";

export default function CreateProdutos() {
  const navigate = useNavigate();
  function handleVoltar() {
    navigate("/home");
  }

  const [formData, setFormData] = useState({
    nomeProduto: "",
    precoProduto: "",
    linkProduto: "",
  });
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("");

  /* Faz o envio do formulario quando eu usar o type submit */
  async function handleSubmit(e) {
    /* Impede do formulario recarregar */
    e.preventDefault();

    /* Envia as informações do formData para a função de criar aviso */
    try {
      await criarAviso(formData);
      /* Se a respotas for um status de sucesso (ok) grava no setmensagem e setTipoMensagem e zera os campos de cadastro*/
      setMensagem("Aviso criado com sucesso!");
      setTipoMensagem("sucesso");

      setFormData({
        nomeProduto: "",
        precoProduto: "",
        linkProduto: "",
      });
      /* Se não (se for uma mensagem de erro (!ok)) grava no setmensagem e setTipoMensagem */
    } catch (error) {
      setMensagem(error.message);
      setTipoMensagem("erro");
    }
  }

  return (
    <form className="w-full">
      {/* Define que esse é o formulario a ser enviado */}
      <h1 className="m-[-10px] pb-[5px] text-2xl sm:pb-0">
        Crie seu aviso de produto
      </h1>
      <button onClick={handleVoltar}>Voltar</button>
      <Form
        type="text"
        placeholder="Nome do Produto"
        value={formData.nomeProduto}
        set={setFormData}
        fieldName="nomeProduto"
        icon="bx bx-user"
      />
      <Form
        type="number"
        placeholder="Preço do produto"
        value={formData.precoProduto}
        set={setFormData}
        fieldName="precoProduto"
        icon="bx bx-money"
      />
      <Form
        type="text"
        placeholder="Link do produto"
        value={formData.linkProduto}
        set={setFormData}
        fieldName="linkProduto"
        icon="bx bx-envelope"
      />
      <button
        className="mt-[20px] h-[48px] w-full cursor-pointer rounded-lg bg-blue-400 text-base font-semibold text-white shadow-[0_0_10px_rgba(0,0,0,0.1)]"
        type="submit"
        /* O type submit para envio do formulario */
        onClick={handleSubmit}
      >
        Criar aviso de produto
      </button>

      {/* Exibe a mensagem de sucesso ou erro, se não houver mensagem, não exibe nada*/}
      {/* Se sucesso (definido lá em cima), exibe mensagem verde; se erro, exibe mensagem vermelha */}
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
  );
}
