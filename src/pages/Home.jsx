import { use, useEffect, useState } from "react";
import Produtos from "../components/Produtos";
import { useNavigate } from "react-router-dom";
import {
  deleteId,
  desativarAviso as desativarAvisoService,
  ativarAviso as ativarAvisoService,
  buscarProdutos as buscarProdutosService,
  buscarInfoUsuario,
  logout as logoutService,
} from "../services/authService";

function Home() {
  // Estado para armazenar os produtos e informações do usuário (e erro caso necessario)
  const [produtos, setProdutos] = useState([]);
  const [usuarioInfo, setUsuarioInfo] = useState(null);
  const [erro, setErro] = useState("");

  // logout function (Atualizar para remover token dos Cookies e redirecionar para login)
  const navigate = useNavigate();
  function handleLogout() {
    logoutService();
    navigate("/");
  }

  // Função para buscar os produtos do usuário autenticado
  async function buscarProdutos() {
    // Chama a função buscarprodutosService
    try {
      const data = await buscarProdutosService();
      // Se sucesso, atualiza o estado de produtos com os dados recebidos do backend
      setProdutos(data);
    } catch (err) {
      // Em caso de erro, atualiza o estado de erro para exibir a mensagem de erro na tela
      setErro("Sessão expirada. Faça login novamente.");
    }
  }

  // Função para deletar um produto pelo idProduto
  async function deleteProdutos(idProduto) {
    // Chama a função deleteId passando o idProduto, se sucesso, chama a função buscarProdutos para atualizar a lista de produtos
    try {
      await deleteId(idProduto);
      // Após deletar, busca os produtos novamente para atualizar a lista
      buscarProdutos();
    } catch (err) {
      // Em caso de erro, atualiza o estado de erro para exibir a mensagem de erro na tela
      setErro("Erro ao deletar produto. Tente novamente.");
    }
  }

  // Função para desativar o envio de aviso para um produto usando o idProduto
  async function desativarAviso(idProduto) {
    // Chama a função desativarAvisoService passando o idProduto, se sucesso, chama a função buscarProdutos para atualizar a lista de produtos
    try {
      await desativarAvisoService(idProduto);
      // Após desativar aviso, busca os produtos novamente para atualizar a lista
      buscarProdutos();
    } catch (err) {
      // Em caso de erro, atualiza o estado de erro para exibir a mensagem de erro na tela
      setErro("Erro ao desativar aviso. Tente novamente.");
    }
  }

  // Função para ativar o envio de aviso para um produto usando o idProduto
  async function ativarAviso(idProduto) {
    // Chama a função ativarAvisoService passando o idProduto, se sucesso, chama a função buscarProdutos para atualizar a lista de produtos
    try {
      await ativarAvisoService(idProduto);
      // Após ativar aviso, busca os produtos novamente para atualizar a lista
      buscarProdutos();
    } catch (err) {
      // Em caso de erro, atualiza o estado de erro para exibir a mensagem de erro na tela
      setErro("Erro ao ativar aviso. Tente novamente.");
    }
  }

  /* Quando a pagina carregar, busca as informações do user */
  useEffect(() => {
    async function buscarInfos() {
      //chamada da função buscarInfoUsuario para obter as informações do usuário autenticado
      try {
        const data = await buscarInfoUsuario();

        // Se sucesso, extrai informações do usuário do retorno e atualiza o estado
        if (data.length > 0) {
          setUsuarioInfo({
            nome: data[0].usuarionome,
            sobrenome: data[0].sobrenome,
            email: data[0].email,
          });
        }
      } catch (err) {
        // Em caso de erro, atualiza o estado de erro
        setErro("Sessão expirada. Faça login novamente.");
      }
    }

    // chama as duas funções definidas acima para que sejam executadas ao carregar a pagina
    buscarInfos();
    buscarProdutos();
  }, []);

  // Se houver um erro geral na pagina, não relacionado ao banco, exibe a mensagem de erro
  if (erro) {
    return <p className="text-red-500">{erro}</p>;
  }

  // Enquanto as informações do usuário não forem carregadas, exibe "Carregando..."
  if (!usuarioInfo) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header/Navigation */}
      <header className="top-0 z-50 border-b border-blue-100 bg-white shadow-sm">
        <div className="px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between sm:flex-row md:flex-row">
            <div>
              <h1 className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-3xl font-bold text-transparent">
                Bem-vindo, {usuarioInfo.nome}
              </h1>
              <p className="mt-1 text-sm text-gray-500">{usuarioInfo.email}</p>
            </div>
            <div className="flex flex-col gap-3 pt-6 sm:flex-row sm:pt-0 sm:pl-2 md:flex-row md:justify-center md:pt-0">
              <button
                onClick={() => navigate("/create-produtos")}
                className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-2.5 font-semibold text-white shadow-md transition-all hover:from-blue-700 hover:to-blue-600 hover:shadow-lg active:scale-95"
              >
                <box-icon name="cart-add" size="sm"></box-icon>
                Criar Aviso
              </button>
              <button
                onClick={handleLogout}
                className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 font-medium text-gray-700 transition-all hover:border-gray-400 hover:bg-gray-50 active:scale-95"
              >
                <box-icon name="left-arrow-alt" size="sm"></box-icon>
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Info cards section */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-blue-100 bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-600">Nome</p>
            <p className="mt-2 text-xl font-semibold text-gray-900">
              {usuarioInfo.nome} {usuarioInfo.sobrenome}
            </p>
          </div>
          <div className="rounded-lg border border-blue-100 bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-600">Email</p>
            <p className="mt-2 truncate text-lg font-semibold text-gray-900">
              {usuarioInfo.email}
            </p>
          </div>
          <div className="rounded-lg border border-blue-100 bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-600">Total de Avisos</p>
            <p className="mt-2 text-3xl font-bold text-blue-600">
              {produtos.length}
            </p>
          </div>
        </div>

        {/* Products Section */}
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Seus Avisos</h2>
            <p className="mt-1 text-sm text-gray-600">
              Gerencie todos os seu avisos de produtos
            </p>
          </div>
          <Produtos
            produtos={produtos}
            deleteProdutos={deleteProdutos}
            desativarAviso={desativarAviso}
            ativarAviso={ativarAviso}
          />
        </div>
      </main>
    </div>
  );
}

export default Home;
