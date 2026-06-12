// Onde ele vai fazer a requisição?
const API_URL = "http://localhost:3000/auth";

// Função recebendo email e senha
export async function login(email, senha) {
  // Envia uma solicitação para o endereço abaixo no formato json contendo email e senha, utilizando o método post (enviar dados)
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, senha }),
  });

  // Aguarda uma resposta do backend
  const data = await response.json();

  // Se a resposta for !ok exibe o erro
  if (!response.ok) {
    throw new Error(data.erro);
  }

  return data;
}

// Função recebendo formData (arrei com as informações para criar login)
export async function register(formData) {
  // Envia uma solicitação para o endereço abaixo no formato json contendo chave-valor para as informações necessárias para criar um cadastro
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

// Função responsável por deleter produtos (recebe o id do produto a ser deletado)
export async function deleteId(idProduto) {
  const response = await fetch(`${API_URL}/delete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
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
    credentials: "include", // Envia cookies pois somente um user pode ver seus produtos
  });

  // Se a reposta for erro
  if (!response.ok) {
    throw new Error("Token inválido");
  }

  // Se a resposta for sucesso
  const data = await response.json();
  return data;
}

// Função responsável por buscar as informações do user
export async function buscarInfoUsuario() {
  const response = await fetch(`${API_URL}/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Envia cookies pois somente um user pode ver suas informações
  });

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
    credentials: "include",
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
    credentials: "include",
    body: JSON.stringify({ idProduto }),
  });

  const data = await response.json();

  return data;
}

// Função recebendo formData (arrei com as informações para criar aviso de produto) para criação de aviso
export async function criarAviso(formData) {
  const response = await fetch(`${API_URL}/createProdutos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Envia cookies pois o propduto é criado para um user
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

// Função recebendo codigoInserido para validar duplo fator
export async function validarDuploFator(codigoInserido) {
  const response = await fetch(`${API_URL}/autenticarDuploFator`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Envia Cookies contendo o ID do 2fa que será usado
    body: JSON.stringify({ codigoInserido }), // código a ser comparado
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.erro);
  }

  return data;
}

// Função para realizar logout (excluir Cookie de login)
export async function logout() {
  const response = await fetch(`${API_URL}/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Envia Cookies contendo o ID do 2fa que será usado
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.erro);
  }

  return data;
}

// Função para deletar usuario, não precisa de paramétros pois tudo está no token salvo nos cookies
export async function deletarUser() {
  const response = await fetch(`${API_URL}/deleteUser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    return false;
  }
  return true;
}

// Função para enviar e-mail de recuperação de senha
export async function emailRecoverPassword(email) {
  const response = await fetch(`${API_URL}/emailRecoverPassword`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email }), // endereço de e-mail para ser usado
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.erro);
  }

  return data;
}

// Função recebendo codigoInserido para validar duplo fator para recuperar senha
export async function validarDuploFatorRecoverPassword(codigoInserido) {
  const response = await fetch(`${API_URL}/autenticarDuploFatorSenha`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Envia Cookies contendo o ID do 2fa que será usado
    body: JSON.stringify({ codigoInserido }), // código a ser comparado
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.erro);
  }

  return data;
}

// Função recebendo NovaSenha para redefinição de senha
export async function RedefinirPassword(NovaSenha) {
  const response = await fetch(`${API_URL}/RedefinirPassword`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Envia Cookies contendo o ID do 2fa que será usado
    body: JSON.stringify({ NovaSenha }), // Nova senha
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.erro);
  }

  return data;
}

// Função para reenviar duplo fator
export async function Reenviar() {
  const response = await fetch(`${API_URL}/Reenviar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Envia Cookies contendo o 2fa atual
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.erro);
  }

  return data;
}
