// Onde ele vai fazer a requisição?
const API_URL = "http://localhost:3000/auth";

// Função recebendo email e senha
export async function login(email, senha) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, senha }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.erro);
  }

  return data;
}

// função recebendo formData (arrei com as informações para criar login)
export async function register(formData) {
  // Envia uma solicitação para o endereço acima no formato json contendo email e senha, utilizando o método post (enviar dados)
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // Chave valor, por exemplo, nome é a chave e formData.nome é o valor dessa chave
      nome: formData.nome,
      sobrenome: formData.sobrenome,
      email: formData.email,
      senha: formData.senha,
      celular: formData.celular,
      dataNascimento: formData.dataNascimento,
    }),
  });

  // Aguarda uma resposta do backend
  const data = await response.json();
  // informa falha ou sucesso, caso seja o erro, impede quebra e retorna o erro (ex: e-mail já cadastrado)
  if (!response.ok) {
    throw new Error(data.erro);
  }

  return data;
}

// Função responsavel por deleter produtos (recebe o id do produto a ser deletado)
export async function deleteId(idProduto) {
  const response = await fetch(`${API_URL}/delete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ idProduto }),
  });

  const data = await response.json();

  return data;
}

// Função responsavel por buscar os produtos de um determinado usuario
export async function buscarProdutos() {
  const response = await fetch(`${API_URL}/productsMe`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // 🔥 ESSENCIAL (envia cookies)
  });
  console.log("enviando informações products");

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
  const response = await fetch(`${API_URL}/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // 🔥 ESSENCIAL (envia cookies)
  });
  console.log("enviando informações ME");

  if (!response.ok) {
    throw new Error("Token inválido");
  }

  const data = await response.json();
  return data;
}

// Função recebendo idProduto para desativar o envio do aviso diario
export async function desativarAviso(idProduto) {
  const response = await fetch(`${API_URL}/avisoOff`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ idProduto }),
  });

  const data = await response.json();

  return data;
}

// Função recebendo idProduto para ativar o envio do aviso diario
export async function ativarAviso(idProduto) {
  const response = await fetch(`${API_URL}/avisoOn`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ idProduto }),
  });

  const data = await response.json();

  return data;
}

// Função recebendo formData (arrei com as informações para criar aviso de produto) para criação de aviso
export async function criarAviso(formData) {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Usuário não autenticado");
  }

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

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.erro);
  }

  return data;
}

// Função recebendo codigoInserido e utilizado token"codigo" para validar duplo fator
export async function validarDuploFator(codigoInserido) {
  const response = await fetch(`${API_URL}/autenticarDuploFator`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // 🔥 ESSENCIAL (envia cookies)
    body: JSON.stringify({ codigoInserido }), // 🔥 não envia mais id_2fa
  });

  console.log("Duplo fator enviado com sucesso");

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.erro);
  }

  // ❌ não salva mais token no localStorage
  console.log("Autenticação 2FA concluída");

  return data;
}
