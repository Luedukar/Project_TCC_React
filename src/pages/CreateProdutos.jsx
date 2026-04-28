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

  async function handleSubmit(e) {
    e.preventDefault();
    // Valida e converte preco para float antes de enviar
    const precoRaw = String(formData.precoProduto || "")
      .replace(",", ".")
      .trim();
    const precoFloat = parseFloat(precoRaw);
    if (Number.isNaN(precoFloat)) {
      setMensagem("Preço inválido. Use números, ex: 199.90");
      setTipoMensagem("erro");
      return;
    }

    const payload = { ...formData, precoProduto: precoFloat };

    try {
      await criarAviso(payload);
      setMensagem("Aviso criado com sucesso!");
      setTipoMensagem("sucesso");
      setFormData({ nomeProduto: "", precoProduto: "", linkProduto: "" });
    } catch (error) {
      setMensagem(error.message || "Erro ao criar o aviso.");
      setTipoMensagem("erro");
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-lg border border-blue-100 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Crie seu aviso de produto
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Preencha os dados abaixo para criar um novo aviso
            </p>
          </div>
          <button
            type="button"
            onClick={handleVoltar}
            className="ml-4 inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Voltar
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            step="0.01"
            inputMode="decimal"
          />

          <Form
            type="text"
            placeholder="Link do produto"
            value={formData.linkProduto}
            set={setFormData}
            fieldName="linkProduto"
            icon="bx bx-link"
          />

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="submit"
              className="flex-1 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 text-center font-semibold text-white shadow-md transition hover:from-blue-700 hover:to-blue-600 active:scale-95"
            >
              Criar aviso de produto
            </button>
            <button
              type="button"
              onClick={() =>
                setFormData({
                  nomeProduto: "",
                  precoProduto: "",
                  linkProduto: "",
                })
              }
              className="flex-0 rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Limpar
            </button>
          </div>

          {mensagem && (
            <div
              className={`mt-2 rounded-md p-3 ${tipoMensagem === "sucesso" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}
            >
              {mensagem}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
