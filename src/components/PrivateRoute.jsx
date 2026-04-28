import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

function PrivateRoute({ children }) {
  const [autenticado, setAutenticado] = useState(null);

  // useEffect é utilizado ao acessa a pagina, sem a necessadide de clicar em algum botão ou semelhante
  useEffect(() => {
    // Realiza uma requisição para o endpoint de proteção do backend para verificar se o usuário está autenticado
    fetch("http://localhost:3000/auth/protect", {
      credentials: "include", // Envia Cookie ao backend para verificar autenticação
    })
      // Se a respota (res) for ok, libera o acesso, caso contrário, bloqueia o acesso e redireciona para a tela de login
      .then((res) => {
        if (res.ok) {
          setAutenticado(true); // Atualiza o estado para indicar que o usuário está autenticado
        } else {
          setAutenticado(false); // Atualiza o estado para indicar que o usuário não está autenticado
        }
      })
      // Em caso de erro na requisição, bloqueia o acesso e redireciona para a tela de login
      .catch(() => setAutenticado(false));
  }, []);

  // Enquanto verifica
  if (autenticado === null) {
    return <p>Carregando...</p>;
  }

  // Se não autenticado, redireciona para a tela de login
  if (!autenticado) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PrivateRoute;
