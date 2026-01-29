import { Navigate } from "react-router-dom";

/* Segurança, impede que seja feito login sem um token, se não tiver token, volta para a tela de login (o que permite layout também)*/
function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PrivateRoute;
