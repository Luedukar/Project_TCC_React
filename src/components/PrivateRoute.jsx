import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

function PrivateRoute({ children }) {
  const [autenticado, setAutenticado] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/auth/protect", {
      credentials: "include", // envia cookie ao backend para verificar autenticação
    })
      // Se a respota (res) for ok, libera o acesso, caso contrário, bloqueia o acesso e redireciona para a tela de login
      .then((res) => {
        if (res.ok) {
          setAutenticado(true);
        } else {
          setAutenticado(false);
        }
      })
      // Em caso de erro na requisição, bloqueia o acesso e redireciona para a tela de login
      .catch(() => setAutenticado(false));
  }, []);

  // enquanto verifica
  if (autenticado === null) {
    return <p>Carregando...</p>;
  }

  // se não autenticado, redireciona para a tela de login
  if (!autenticado) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PrivateRoute;
