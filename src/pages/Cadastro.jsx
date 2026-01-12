function Cadastro() {
  return (
    <div className="form_cadastro absolute right-[-100%] z-1 flex h-full items-center p-[40px] text-center text-black transition-all duration-[1200ms] ease-in-out sm:bottom-[0] sm:w-[50%]">
      <form className="w-full">
        <h1 className="m-[-10px] text-2xl">Crie seu cadastro</h1>
        <div className="relative w-full pt-[30px]">
          <input
            className="w-full rounded-lg bg-zinc-200 pt-[8px] pr-[30px] pb-[8px] pl-[20px] text-sm font-medium text-zinc-800 outline-none"
            type="text"
            placeholder="Nome"
            required
          />
          <i className="bx bx-user absolute top-[74%] right-[15px] translate-y-[-50%] bg-zinc-200 text-xl"></i>
        </div>
        <div className="relative w-full pt-[25px]">
          <input
            className="w-full rounded-lg bg-zinc-200 pt-[8px] pr-[30px] pb-[8px] pl-[20px] text-sm font-medium text-zinc-800 outline-none"
            type="text"
            placeholder="Sobrenome"
            required
          />
          <i className="bx bx-community absolute top-[72%] right-[15px] translate-y-[-50%] bg-zinc-200 text-xl"></i>
        </div>
        <div className="relative w-full pt-[25px]">
          <input
            className="w-full rounded-lg bg-zinc-200 pt-[8px] pr-[30px] pb-[8px] pl-[20px] text-sm font-medium text-zinc-800 outline-none"
            type="email"
            placeholder="E-mail"
            required
          />
          <i className="bx bx-envelope absolute top-[72%] right-[15px] translate-y-[-50%] bg-zinc-200 text-xl"></i>
        </div>
        <div className="relative w-full pt-[25px]">
          <input
            className="w-full rounded-lg bg-zinc-200 pt-[8px] pr-[40px] pb-[8px] pl-[20px] text-sm font-medium text-zinc-800 outline-none"
            type="password"
            placeholder="Senha"
            required
          />
          <i className="bx bx-lock absolute top-[72%] right-[15px] translate-y-[-50%] bg-zinc-200 text-xl"></i>
        </div>
        <div className="relative w-full pt-[25px]">
          <input
            className="w-full rounded-lg bg-zinc-200 pt-[8px] pr-[40px] pb-[8px] pl-[20px] text-sm font-medium text-zinc-800 outline-none"
            type="password"
            placeholder="Confirme sua senha"
            required
          />
          <i className="bx bx-lock-keyhole absolute top-[72%] right-[15px] translate-y-[-50%] bg-zinc-200 text-xl"></i>
        </div>
        <div className="relative w-full pt-[25px]">
          <input
            className="w-full rounded-lg bg-zinc-200 pt-[8px] pr-[30px] pb-[8px] pl-[20px] text-sm font-medium text-zinc-800 outline-none"
            type="tel"
            placeholder="Número de celular"
            required
          />
          <i className="bx bx-phone absolute top-[72%] right-[15px] translate-y-[-50%] bg-zinc-200 text-xl"></i>
        </div>
        <div className="relative w-full pt-[25px]">
          <input
            className="w-full rounded-lg bg-zinc-200 pt-[8px] pr-[50px] pb-[6px] pl-[20px] text-base font-medium text-zinc-800 outline-none"
            type="date"
            placeholder="Data de nascimento"
            required
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
    </div>
  );
}

export default Cadastro;
