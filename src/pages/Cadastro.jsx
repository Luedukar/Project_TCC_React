import { useState } from "react";

function Cadastro() {
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("");

  const [formData, setFormData] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    celular: "",
    dataNascimento: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.senha !== formData.confirmarSenha) {
      alert("As senhas não coincidem");
      return;
    }

    const response = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: formData.nome,
        sobrenome: formData.sobrenome,
        email: formData.email,
        senha: formData.senha,
        celular: formData.celular,
        dataNascimento: formData.dataNascimento,
      }),
    });

    const data = await response.json();
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
    } else {
      setMensagem(data.erro);
      setTipoMensagem("erro");
    }
  };

  return (
    <div className="form_cadastro absolute right-[-100%] z-1 flex h-full items-center p-[40px] text-center text-black transition-all duration-[1200ms] ease-in-out sm:bottom-[0] sm:w-[50%]">
      <form className="w-full" onSubmit={handleSubmit}>
        <h1 className="m-[-10px] text-2xl">Crie seu cadastro</h1>
        <div className="relative w-full pt-[30px]">
          <input
            className="w-full rounded-lg bg-zinc-200 pt-[8px] pr-[30px] pb-[8px] pl-[20px] text-sm font-medium text-zinc-800 outline-none"
            type="text"
            placeholder="Nome"
            required
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
          />
          <i className="bx bx-user absolute top-[74%] right-[15px] translate-y-[-50%] bg-zinc-200 text-xl"></i>
        </div>
        <div className="relative w-full pt-[25px]">
          <input
            className="w-full rounded-lg bg-zinc-200 pt-[8px] pr-[30px] pb-[8px] pl-[20px] text-sm font-medium text-zinc-800 outline-none"
            type="text"
            placeholder="Sobrenome"
            required
            value={formData.sobrenome}
            onChange={(e) =>
              setFormData({ ...formData, sobrenome: e.target.value })
            }
          />
          <i className="bx bx-community absolute top-[72%] right-[15px] translate-y-[-50%] bg-zinc-200 text-xl"></i>
        </div>
        <div className="relative w-full pt-[25px]">
          <input
            className="w-full rounded-lg bg-zinc-200 pt-[8px] pr-[30px] pb-[8px] pl-[20px] text-sm font-medium text-zinc-800 outline-none"
            type="email"
            placeholder="E-mail"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <i className="bx bx-envelope absolute top-[72%] right-[15px] translate-y-[-50%] bg-zinc-200 text-xl"></i>
        </div>
        <div className="relative w-full pt-[25px]">
          <input
            className="w-full rounded-lg bg-zinc-200 pt-[8px] pr-[40px] pb-[8px] pl-[20px] text-sm font-medium text-zinc-800 outline-none"
            type="password"
            placeholder="Senha"
            required
            value={formData.senha}
            onChange={(e) =>
              setFormData({ ...formData, senha: e.target.value })
            }
          />
          <i className="bx bx-lock absolute top-[72%] right-[15px] translate-y-[-50%] bg-zinc-200 text-xl"></i>
        </div>
        <div className="relative w-full pt-[25px]">
          <input
            className="w-full rounded-lg bg-zinc-200 pt-[8px] pr-[40px] pb-[8px] pl-[20px] text-sm font-medium text-zinc-800 outline-none"
            type="password"
            placeholder="Confirme sua senha"
            required
            value={formData.confirmarSenha}
            onChange={(e) =>
              setFormData({ ...formData, confirmarSenha: e.target.value })
            }
          />
          <i className="bx bx-lock-keyhole absolute top-[72%] right-[15px] translate-y-[-50%] bg-zinc-200 text-xl"></i>
        </div>
        <div className="relative w-full pt-[25px]">
          <input
            className="w-full rounded-lg bg-zinc-200 pt-[8px] pr-[30px] pb-[8px] pl-[20px] text-sm font-medium text-zinc-800 outline-none"
            type="tel"
            placeholder="Número de celular"
            required
            value={formData.celular}
            onChange={(e) =>
              setFormData({ ...formData, celular: e.target.value })
            }
          />
          <i className="bx bx-phone absolute top-[72%] right-[15px] translate-y-[-50%] bg-zinc-200 text-xl"></i>
        </div>
        <div className="relative w-full pt-[25px]">
          <input
            className="w-full rounded-lg bg-zinc-200 pt-[8px] pr-[50px] pb-[6px] pl-[20px] text-base font-medium text-zinc-800 outline-none"
            type="date"
            placeholder="Data de nascimento"
            required
            value={formData.dataNascimento}
            onChange={(e) =>
              setFormData({ ...formData, dataNascimento: e.target.value })
            }
          />
          <i className="bx bx-birthday-cake absolute top-[70%] right-[15px] translate-y-[-50%] bg-zinc-200 text-xl"></i>
        </div>
        <button
          className="mt-[20px] h-[48px] w-full cursor-pointer rounded-lg bg-blue-400 text-base font-semibold text-white shadow-[0_0_10px_rgba(0,0,0,0.1)]"
          type="submit"
        >
          Criar cadastro
        </button>
      </form>

      {mensagem && (
        <div
          className={`mt-[20px] rounded-lg p-[10px] ${
            tipoMensagem === "sucesso"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {mensagem}
        </div>
      )}
    </div>
  );
}

export default Cadastro;
