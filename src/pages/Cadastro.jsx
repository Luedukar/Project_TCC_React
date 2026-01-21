import { useState } from "react";

function Cadastro() {
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("");

  /* array de dados do formulário */
  const [formData, setFormData] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    celular: "",
    dataNascimento: "",
  });

  /* Faz o envio do formulario quando eu usar o type submit */
  const handleSubmit = async (e) => {
    /* Impede do formulario recarregar */
    e.preventDefault();

    /* Verifica se as senhas coincidem, se não, exibe alerta */
    if (formData.senha !== formData.confirmarSenha) {
      setMensagem("As senhas não coincidem!");
      setTipoMensagem("erro");
      return;
    }

    /* Envia dados (método post) no formato json para o endereço abaixo (backend) */
    const response = await fetch("http://localhost:3000/auth/register", {
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
    /* Se a respotas for um status de sucesso (ok) grava no setmensagem e setTipoMensagem e zera os campos de cadastro*/
    if (response.ok) {
      setMensagem("Usuário criado com sucesso!");
      setTipoMensagem("sucesso");

      setFormData({
        nome: "",
        sobrenome: "",
        email: "",
        senha: "",
        confirmarSenha: "",
        celular: "",
        dataNascimento: "",
      });
      /* Se não (se for uma mensagem de erro (!ok)) grava no setmensagem e setTipoMensagem */
    } else {
      setMensagem(data.erro);
      setTipoMensagem("erro");
    }
  };

  return (
    <div className="form_cadastro absolute right-[-100%] z-1 flex h-full items-center p-[40px] text-center text-black transition-all duration-[1200ms] ease-in-out sm:bottom-[0] sm:w-[50%]">
      <form className="w-full" onSubmit={handleSubmit}>
        {/* Define que esse é o formulario a ser enviado */}
        <h1 className="m-[-10px] text-2xl">Crie seu cadastro</h1>
        <div className="relative w-full pt-[30px]">
          <input
            className="w-full rounded-lg bg-zinc-200 pt-[8px] pr-[30px] pb-[8px] pl-[20px] text-sm font-medium text-zinc-800 outline-none"
            type="text"
            placeholder="Nome"
            required
            /* Esse é o campo nome */
            value={formData.nome}
            /* Qualquer alteração que eu fizer neste campo, executa o setNome */
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
          />
          <i className="bx bx-user absolute top-[74%] right-[15px] translate-y-[-50%] bg-transparent text-xl"></i>
        </div>
        <div className="relative w-full pt-[20px]">
          <input
            className="w-full rounded-lg bg-zinc-200 pt-[8px] pr-[30px] pb-[8px] pl-[20px] text-sm font-medium text-zinc-800 outline-none"
            type="text"
            placeholder="Sobrenome"
            required
            /* Esse é o campo sobrenome */
            value={formData.sobrenome}
            /* Qualquer alteração que eu fizer neste campo, executa o setSobrenome */
            onChange={(e) =>
              setFormData({ ...formData, sobrenome: e.target.value })
            }
          />
          <i className="bx bx-community absolute top-[70%] right-[15px] translate-y-[-50%] bg-transparent text-xl"></i>
        </div>
        <div className="relative w-full pt-[20px]">
          <input
            className="w-full rounded-lg bg-zinc-200 pt-[8px] pr-[30px] pb-[8px] pl-[20px] text-sm font-medium text-zinc-800 outline-none"
            type="email"
            placeholder="E-mail"
            required
            /* Esse é o campo e-mail */
            value={formData.email}
            /* Qualquer alteração que eu fizer neste campo, executa o setEmail */
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <i className="bx bx-envelope absolute top-[70%] right-[15px] translate-y-[-50%] bg-transparent text-xl"></i>
        </div>
        <div className="relative w-full pt-[20px]">
          <input
            className="w-full rounded-lg bg-zinc-200 pt-[8px] pr-[40px] pb-[8px] pl-[20px] text-sm font-medium text-zinc-800 outline-none"
            type="password"
            placeholder="Senha"
            required
            /* Esse é o campo senha */
            value={formData.senha}
            /* Qualquer alteração que eu fizer neste campo, executa o setSenha */
            onChange={(e) =>
              setFormData({ ...formData, senha: e.target.value })
            }
          />
          <i className="bx bx-lock absolute top-[70%] right-[15px] translate-y-[-50%] bg-transparent text-xl"></i>
        </div>
        <div className="relative w-full pt-[20px]">
          <input
            className="w-full rounded-lg bg-zinc-200 pt-[8px] pr-[40px] pb-[8px] pl-[20px] text-sm font-medium text-zinc-800 outline-none"
            type="password"
            placeholder="Confirme sua senha"
            required
            /* Esse é o campo confirmar senha */
            value={formData.confirmarSenha}
            /* Qualquer alteração que eu fizer neste campo, executa o setConfirmarSenha */
            onChange={(e) =>
              setFormData({ ...formData, confirmarSenha: e.target.value })
            }
          />
          <i className="bx bx-lock-keyhole absolute top-[70%] right-[15px] translate-y-[-50%] bg-transparent text-xl"></i>
        </div>
        <div className="relative w-full pt-[20px]">
          <input
            className="w-full rounded-lg bg-zinc-200 pt-[8px] pr-[30px] pb-[8px] pl-[20px] text-sm font-medium text-zinc-800 outline-none"
            type="tel"
            placeholder="Número de celular"
            required
            /* Esse é o campo celular */
            value={formData.celular}
            /* Qualquer alteração que eu fizer neste campo, executa o setCelular */
            onChange={(e) =>
              setFormData({ ...formData, celular: e.target.value })
            }
          />
          <i className="bx bx-phone absolute top-[70%] right-[15px] translate-y-[-50%] bg-transparent text-xl"></i>
        </div>
        <div className="relative w-full pt-[20px]">
          <input
            className="w-full rounded-lg bg-zinc-200 pt-[8px] pr-[50px] pb-[6px] pl-[20px] text-base font-medium text-zinc-800 outline-none"
            type="date"
            placeholder="Data de nascimento"
            required
            /* Esse é o campo data de nascimento */
            value={formData.dataNascimento}
            /* Qualquer alteração que eu fizer neste campo, executa o setDataNascimento */
            onChange={(e) =>
              setFormData({ ...formData, dataNascimento: e.target.value })
            }
          />
          <i className="bx bx-birthday-cake absolute top-[68%] right-[15px] translate-y-[-50%] bg-transparent text-xl"></i>
        </div>
        <button
          className="mt-[20px] h-[48px] w-full cursor-pointer rounded-lg bg-blue-400 text-base font-semibold text-white shadow-[0_0_10px_rgba(0,0,0,0.1)]"
          type="submit"
          /* O type submit para envio do formulario */
        >
          Criar cadastro
        </button>
        {mensagem && (
          <div
            className={`mt-[5px] p-[5px] ${
              tipoMensagem === "sucesso" ? " text-green-800" : " text-red-800"
            }`}
          >
            {mensagem}
          </div>
        )}
      </form>

      {/* Exibe a mensagem de sucesso ou erro, se não houver mensagem, não exibe nada*/}
      {/* Se sucesso (definido lá em cima), exibe mensagem verde; se erro, exibe mensagem vermelha */}
    </div>
  );
}

export default Cadastro;
