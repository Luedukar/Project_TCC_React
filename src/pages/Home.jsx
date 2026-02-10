import { use, useEffect, useState } from "react";
import Produtos from "../components/Produtos";
import { useNavigate } from "react-router-dom";
import {
  deleteId,
  buscarProdutos as buscarProdutosService,
  buscarInfoUsuario,
} from "../services/authService";

function Home() {
  // estado para armazenar os produtos e informações do usuário (e erro caso necessario)
  const [produtos, setProdutos] = useState([]);
  const [usuarioInfo, setUsuarioInfo] = useState(null);
  const [erro, setErro] = useState("");

  //logout function (excluir o token e redirecionar para a tela de login, por isso o useNavigate) mas só quando o botão for clicado
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  //função para buscar os produtos do usuário autenticado
  async function buscarProdutos() {
    //chama a função buscarprodutosService
    try {
      const data = await buscarProdutosService();
      // se sucesso, atualiza o estado de produtos com os dados recebidos do backend
      setProdutos(data);
    } catch (err) {
      // em caso de erro, atualiza o estado de erro para exibir a mensagem de erro na tela
      setErro("Sessão expirada. Faça login novamente.");
    }
  }

  // função para deletar um produto pelo idProduto
  async function deleteProdutos(idProduto) {
    // chama a função deleteId passando o idProduto, se sucesso, chama a função buscarProdutos para atualizar a lista de produtos
    try {
      await deleteId(idProduto);
      // após deletar, busca os produtos novamente para atualizar a lista
      buscarProdutos();
    } catch (err) {
      // em caso de erro, atualiza o estado de erro para exibir a mensagem de erro na tela
      setErro("Erro ao deletar produto. Tente novamente.");
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
        // em caso de erro, atualiza o estado de erro
        setErro("Sessão expirada. Faça login novamente.");
      }
    }

    // chama as duas funções definidas acima para que sejam executadas ao carregar a pagina
    buscarInfos();
    buscarProdutos();
  }, []);

  // se houver um erro geral na pagina, não relacionado ao banco, exibe a mensagem de erro
  if (erro) {
    return <p className="text-red-500">{erro}</p>;
  }

  // enquanto as informações do usuário não forem carregadas, exibe "Carregando..."
  if (!usuarioInfo) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="min-h-screen bg-sky-100">
      <div className="flex h-full w-full flex-col p-10 text-black">
        <div className="mb-6 flex items-center gap-4 rounded-md bg-blue-600 p-4 shadow">
          <h1 className="text-2xl font-bold text-white">
            Bem-vindo, {usuarioInfo.nome}
          </h1>
          <button
            placeholder="Logout"
            onClick={handleLogout}
            className="flex cursor-pointer rounded-md bg-white px-2 py-1 text-black shadow"
          >
            <box-icon name="left-arrow-alt"></box-icon>
            Logout
          </button>
          <button className="ml-auto flex cursor-pointer items-center gap-2 rounded-md bg-white px-4 py-2 text-lg font-semibold text-black shadow">
            criar aviso
            <box-icon name="cart-add"></box-icon>
          </button>
        </div>
        <div className="mt-2">
          <Produtos produtos={produtos} deleteProdutos={deleteProdutos} />
        </div>
      </div>
    </div>
  );
}

export default Home;
