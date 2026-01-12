import { useEffect } from "react";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Change from "./pages/Change";

function App() {
  useEffect(() => {
    // Se necessário, adicione lógica adicional aqui para garantir execução
  }, []);

  return (
    <div>
      <Login />
      <Cadastro />
      <Change />
    </div>
  );
}

export default App;
