import { use, useEffect, useState } from "react";
import Produtos from "../components/Produtos";
import { useNavigate } from "react-router-dom";

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
    // pega o token do localStorage e armazena na variavel token
    const token = localStorage.getItem("token");

    // se não houver token, retorna erro
    if (!token) {
      setErro("Usuário não autenticado");
      return;
    }

    // envia o token para http://localhost:3000/auth/productsMe e aguarda uma resposta
    try {
      const response = await fetch("http://localhost:3000/auth/productsMe", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // se a resposta não for ok, lança um erro
      if (!response.ok) {
        throw new Error("Token inválido");
      }

      // se for ok, extrai os dados retornados em json e atualiza o estado de produtos
      const data = await response.json();
      setProdutos(data);

      // Extrai informações do usuário do primeiro produto (todas têm os mesmos dados)
    } catch (err) {
      setErro("Sessão expirada. Faça login novamente.");
    }
  }

  // função para deletar um produto pelo idProduto
  async function deleteProdutos(idProduto) {
    // Validação se o idProduto foi fornecido e recebido corretamente (deletar quando não for mais necessário)
    console.log("ID DO PRODUTO A SER DELETADO:", idProduto);
    // envia a requisição (metodo post) de delete para o backend (http://localhost:3000/auth/delete) no formato json contendo no body o idProduto e espera uma resposta
    const response = await fetch(`http://localhost:3000/auth/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idProduto }),
    });
    // valida o retorno da requisição (excluir quando não for mais necessário)
    console.log("REQUISIÇÃO ENVIADA PARA DELETE:", response);

    /* Recebe uma resposta do backend*/
    const data = await response.json();
    console.log("RESPOSTA DO DELETE:", data);
    /* informa falha ou sucesso, caso seja um erro, impede quebra e exibe a mensagem de erro recebida */
    if (!response.ok) {
      throw new Error(data.erro);
    } else {
      // Recarrega os produtos após deletar
      buscarProdutos();
    }
  }

  /* Quando a pagina carregar, busca as informações do user
  busca pelo token e armazena o mesmo na cost token
  se o token não for encontrado, retorna erro */
  useEffect(() => {
    async function buscarInfos() {
      const token = localStorage.getItem("token");

      if (!token) {
        setErro("Usuário não autenticado");
        return;
      }

      //envia o token para http://localhost:3000/auth/me e aguarda uma resposta
      try {
        const response = await fetch("http://localhost:3000/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // se a resposta não for ok, lança um erro
        if (!response.ok) {
          throw new Error("Token inválido");
        }

        // se for ok, extrai os dados retornados em json e armazena na variavel data
        const data = await response.json();

        // Extrai informações do usuário do retorno e atualiza o estado
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
