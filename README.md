# Monitor de Preços — TCC (Frontend)

Repositório do **frontend** desenvolvido para o Trabalho de Conclusão de Curso (TCC) do curso de Engenharia de Software. O projeto é uma aplicação web que permite ao usuário cadastrar produtos de interesse com um preço desejado e receber avisos quando quiser acompanhar variações, ativando ou desativando notificações por produto.

> Este repositório contém apenas o **frontend**. Ele consome uma API REST própria (backend separado) para autenticação e gerenciamento dos produtos.

## ✨ Funcionalidades

- **Cadastro e login de usuário**, com sessão baseada em cookies
- **Autenticação de dois fatores (2FA)** por código, com opção de reenvio
- **Recuperação e redefinição de senha** via e-mail, com validação por 2FA
- **Cadastro de produtos monitorados** (nome, preço desejado e link)
- **Ativação/desativação de avisos diários** por produto
- **Exclusão de produtos** e **exclusão de conta**
- Layout **responsivo**, com feedback visual usando alertas (SweetAlert2)
- Rotas privadas protegidas por verificação de sessão no backend

## 🛠️ Tecnologias

- [React 19](https://react.dev/)
- [React Router DOM 7](https://reactrouter.com/)
- [Vite 7](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [SweetAlert2](https://sweetalert2.github.io/)
- ESLint + Prettier (com plugin de ordenação de classes Tailwind)

## 📁 Estrutura do projeto

```
src/
├── components/
│   ├── Footer.jsx
│   ├── Form.jsx
│   ├── Layout.jsx
│   ├── PrivateRoute.jsx     # Protege rotas que exigem login
│   ├── Produtos.jsx         # Listagem/cards dos produtos monitorados
│   └── SocialIcon.jsx
├── pages/
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Cadastro.jsx
│   ├── Change.jsx
│   ├── DuploFator.jsx
│   ├── RecuperarSenha.jsx
│   ├── ValidarRecuperacaoSenha.jsx
│   ├── RedefinirSenha.jsx
│   └── CreateProdutos.jsx
├── services/
│   └── authService.js       # Toda a comunicação com a API (fetch)
├── App.jsx                  # Definição das rotas
└── main.jsx
```

## 🔗 Integração com o backend

Este frontend espera uma API rodando em `http://localhost:3000/auth` com, entre outros, os seguintes endpoints:

| Método | Endpoint                           | Descrição                               |
| ------ | ---------------------------------- | --------------------------------------- |
| POST   | `/auth/login`                      | Autenticação do usuário                 |
| POST   | `/auth/register`                   | Cadastro de novo usuário                |
| GET    | `/auth/protect`                    | Verificação de sessão (rotas privadas)  |
| GET    | `/auth/me`                         | Dados do usuário logado                 |
| GET    | `/auth/productsMe`                 | Produtos monitorados pelo usuário       |
| POST   | `/auth/createProdutos`             | Criação de um novo produto/aviso        |
| POST   | `/auth/avisoOn` / `/auth/avisoOff` | Ativa/desativa aviso de um produto      |
| POST   | `/auth/autenticarDuploFator`       | Validação do código de 2FA              |
| POST   | `/auth/emailRecoverPassword`       | Envio de e-mail de recuperação de senha |
| POST   | `/auth/RedefinirPassword`          | Redefinição de senha                    |
| POST   | `/auth/logout`                     | Encerramento de sessão                  |

## 📌 Status do projeto

Projeto em desenvolvimento contínuo como parte do TCC do curso de Engenharia de Software.

## 👤 Autor

Desenvolvido por [**Luedukar**](https://github.com/Luedukar) (ME)
