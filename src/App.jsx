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
    <BrowserRouter>
      <Routes>
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
        <Route path="/home" element={<PrivateRoute children={<Home />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
