import { useState } from "react";
import { login } from "../services/authService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");

    try {
      await login(email, senha);
      alert("Login realizado com sucesso!");
    } catch (err) {
      setErro(err.message);
    }
  }

  return (
    <div className="form_login absolute right-[0] bottom-[0] z-1 flex h-[70%] w-full items-center p-[40px] text-center text-black transition-all duration-[900ms] ease-in-out sm:h-full sm:w-[50%] sm:bg-white">
      <form className="w-full" onSubmit={handleSubmit}>
        <h1 className="m-[-10px] text-4xl">Login</h1>
        <div className="relative w-full pt-[35px]">
          <input
            className="w-full rounded-lg bg-zinc-200 pt-[8px] pr-[30px] pb-[8px] pl-[20px] text-sm font-medium text-zinc-800 outline-none"
            placeholder="Username"
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <i className="bx-user absolute top-[76%] right-[15px] translate-y-[-50%] bg-zinc-200 text-xl"></i>
        </div>
        <div className="relative w-full pt-[25px]">
          <input
            className="w-full rounded-lg bg-zinc-200 pt-[8px] pr-[40px] pb-[8px] pl-[20px] text-sm font-medium text-zinc-800 outline-none"
            type="password"
            placeholder="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <i className="bx-lock absolute top-[70%] right-[15px] translate-y-[-50%] bg-zinc-200 text-xl"></i>
        </div>
        <div className="pt-[15px] pb-[20px]">
          <a className="m-[30px] p-[20px] text-sm text-black" href="#">
            Forgot password?
          </a>
        </div>
        <button
          className="h-[48px] w-full cursor-pointer rounded-lg bg-blue-400 text-base font-semibold text-white shadow-[0_0_10px_rgba(0,0,0,0.1)]"
          type="submit"
        >
          Login
        </button>
        <p className="m-[15px] text-base">Visit my social platforms</p>
        <div className="flex justify-center">
          <a href="#">
            <box-icon
              type="logo"
              name="linkedin-square"
              className="mr-[10px] inline-flex size-[30px] rounded-lg border"
            ></box-icon>
          </a>
          <a href="#">
            <box-icon
              name="github"
              type="logo"
              className="mr-[10px] inline-flex size-[30px] rounded-lg border"
            ></box-icon>
          </a>
          <a href="#">
            <box-icon
              type="logo"
              name="instagram"
              className="mr-[10px] inline-flex size-[30px] rounded-lg border"
            ></box-icon>
          </a>
          <a href="#">
            <box-icon
              name="facebook-circle"
              type="logo"
              className="mr-[10px] inline-flex size-[30px] rounded-lg border"
            ></box-icon>
          </a>
        </div>
        {erro && <p style={{ color: "red" }}>{erro}</p>}
      </form>
    </div>
  );
}
