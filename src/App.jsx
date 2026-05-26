import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Change from "./pages/Change";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/Layout";
import CreateProdutos from "./pages/CreateProdutos";
import DuploFator from "./pages/DuploFator";
import RecuperarSenha from "./pages/RecuperarSenha";
import ValidarRecuperacaoSenha from "./pages/ValidarRecuperacaoSenha";
import RedefinirSenha from "./pages/RedefinirSenha";

/* Os componentes a serem renderizados no App */
function App() {
  return (
    // conecta o BrowserRouter para gerenciar as rotas (sem ele o react não consegue navegar entre paginas)
    <BrowserRouter>
      <Routes>
        {/* Primeira rota: Rota pública (tela de login e cadastro) */}
        <Route
          path="/"
          element={
            <Layout>
              <Login />
              <Cadastro />
              <Change />
            </Layout>
          }
        />
        <Route path="/duplo-fator" element={<DuploFator />} />
        <Route path="/recuperar-senha" element={<RecuperarSenha />} />
        <Route
          path="/validar-recuperacao-senha"
          element={<ValidarRecuperacaoSenha />}
        />
        <Route path="/redefinir-senha" element={<RedefinirSenha />} />
        {/* Segunda rota: Rota privada (tela após o login), só vai se passar pelo PrivateRoute */}
        <Route path="/home" element={<PrivateRoute children={<Home />} />} />
        {/* Terceira rota: Rota privada para criação de produtos, só vai se passar pelo PrivateRoute */}
        <Route
          path="/create-produtos"
          element={<PrivateRoute children={<CreateProdutos />} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
