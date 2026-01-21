/* onde ele vai fazer a requisição? */
const API_URL = "http://localhost:3000/auth";

/* função recebendo email e senha */
/* async permite o uso do await, o await seria algo como "esperar", pois ele aguardar uma resposta de algo, no caso, do POST feito para a API*/
export async function login(email, senha) {
  /* Envia uma solicitação para o endereço acima no formato json contendo email e senha, utilizando o método post (enviar dados)*/
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, senha }),
  });

  /* Recebe uma resposta do backend*/
  const data = await response.json();
  console.log("RESPOSTA DO LOGIN:", data);
  localStorage.setItem("token", data.token);
  /* informa falha ou sucesso, caso seja o erro, impede quebra e retorna o erro (ex: senha incorreta)*/
  if (!response.ok) {
    throw new Error(data.erro);
  }

  return data;
}
