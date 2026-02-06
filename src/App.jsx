import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Change from "./pages/Change";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/Layout";

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
        {/* Segunda rota: Rota privada (tela após o login), só vai se passar pelo PrivateRoute */}
        <Route path="/home" element={<PrivateRoute children={<Home />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
