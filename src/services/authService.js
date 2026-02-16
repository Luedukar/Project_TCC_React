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

/* função recebendo formData (arrei com as informações para criar login) */
/* async permite o uso do await, o await seria algo como "esperar", pois ele aguardar uma resposta de algo, no caso, do POST feito para a API*/
export async function register(formData) {
  /* Envia uma solicitação para o endereço acima no formato json contendo email e senha, utilizando o método post (enviar dados)*/
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      /* Chave valor, por exemplo, nome é a chave e formData.nome é o valor dessa chave*/
      nome: formData.nome,
      sobrenome: formData.sobrenome,
      email: formData.email,
      senha: formData.senha,
      celular: formData.celular,
      dataNascimento: formData.dataNascimento,
    }),
  });

  /* Aguarda uma resposta do backend */
  const data = await response.json();
  /* informa falha ou sucesso, caso seja o erro, impede quebra e retorna o erro (ex: e-mail já cadastrado)*/
  if (!response.ok) {
    throw new Error(data.erro);
  }

  return data;
}

// Função responsavel por deleter pradoutos (recebe o id do produto a ser deletado)
export async function deleteId(idProduto) {
  // faz uma requisição para o backend enviando o ID do produto a ser deletado
  const response = await fetch(`${API_URL}/delete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ idProduto }),
  });
  /* Recebe uma resposta do backend*/
  const data = await response.json();
  //retorna o resultado
  return data;
}

// Função responsavel por buscar os produtos de um determinado usuario
export async function buscarProdutos() {
  // pega o Token armazenado no localStorage
  const token = localStorage.getItem("token");

  // caso não tenha Token
  if (!token) {
    throw new Error("Usuário não autenticado");
  }

  // Faz uma requisição para o backend passando o Token
  const response = await fetch(`${API_URL}/productsMe`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Se a reposta for erro
  if (!response.ok) {
    throw new Error("Token inválido");
  }

  // Se a resposta for sucesso
  const data = await response.json();
  return data;
}

// Função responsavel por buscar as informações do user
export async function buscarInfoUsuario() {
  // Pega o Token no localStorage
  const token = localStorage.getItem("token");

  // Se não tiver Token
  if (!token) {
    throw new Error("Usuário não autenticado");
  }

  // Faz a requisição para o backend passando o Token
  const response = await fetch(`${API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Se a resposta for um erro
  if (!response.ok) {
    throw new Error("Token inválido");
  }

  // Se a resposta for sucesso
  const data = await response.json();
  return data;
}

export async function desativarAviso(idProduto) {
  // faz uma requisição para o backend enviando o ID do produto a ser deletado
  const response = await fetch(`${API_URL}/avisoOff`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ idProduto }),
  });
  /* Recebe uma resposta do backend*/
  const data = await response.json();
  //retorna o resultado
  return data;
}

export async function ativarAviso(idProduto) {
  // faz uma requisição para o backend enviando o ID do produto a ser deletado
  const response = await fetch(`${API_URL}/avisoOn`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ idProduto }),
  });
  /* Recebe uma resposta do backend*/
  const data = await response.json();
  //retorna o resultado
  return data;
}

/* função recebendo formData (arrei com as informações para criar aviso de produto) */
/* async permite o uso do await, o await seria algo como "esperar", pois ele aguardar uma resposta de algo, no caso, do POST feito para a API*/
export async function criarAviso(formData) {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Usuário não autenticado");
  }
  /* Envia uma solicitação para o endereço acima no formato json contendo email e senha, utilizando o método post (enviar dados)*/
  const response = await fetch(`${API_URL}/createProdutos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      nome: formData.nomeProduto,
      preco: formData.precoProduto,
      link: formData.linkProduto,
    }),
  });

  /* Aguarda uma resposta do backend */
  const data = await response.json();
  /* informa falha ou sucesso, caso seja o erro, impede quebra e retorna o erro (ex: e-mail já cadastrado)*/
  if (!response.ok) {
    throw new Error(data.erro);
  }

  return data;
}
