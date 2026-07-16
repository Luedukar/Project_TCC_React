import { useEffect } from "react";

export default function Change() {
  useEffect(() => {
    // O useEffect é executado apenas depois que o elemento do return é renderizado
    const form_cadastro = document.querySelector(".form_cadastro");
    const form_login = document.querySelector(".form_login");
    const painel_right = document.querySelector(".painel_right");
    const painel_left = document.querySelector(".painel_left");
    const alter_box = document.querySelector(".alter_box");
    const RegisterBtn = document.querySelector(".register-btn");
    const LoginBtn = document.querySelector(".login-btn");

    // Se registerBtn for clicado, executa o bloco abaixo
    if (RegisterBtn) {
      RegisterBtn.addEventListener("click", () => {
        alter_box.classList.add(
          "sm:before:left-[50%]",
          "before:left-[0]",
          "before:top-[76%]",
        );

        painel_left.classList.add(
          "sm:left-[-50%]",
          "duration-[1000ms]",
          "top-[-30%]",
        );
        painel_left.classList.remove("sm:left-[0]", "top-[0]");

        painel_right.classList.add(
          "sm:right-[0]",
          "sm:duration-[1200ms]",
          "bottom-[-5%]",
          "absolute",
        );
        painel_right.classList.remove("bottom-[-30%]");

        form_login.classList.remove("delay-300");
        form_login.classList.add("right-[100%]");

        form_cadastro.classList.add(
          "sm:right-[50%]",
          "w-full",
          "bottom-[12%]",
          "right-[0]",
        );
        form_cadastro.classList.remove("right-[-100%]");
      });
    }

    // Se LoginBtn for clicado, executa o bloco abaixo
    if (LoginBtn) {
      LoginBtn.addEventListener("click", () => {
        alter_box.classList.remove(
          "sm:before:left-[50%]",
          "before:left-[0]",
          "before:top-[76%]",
        );

        painel_left.classList.remove(
          "sm:left-[-50%]",
          "duration-[1000ms]",
          "top-[-30%]",
        );
        painel_left.classList.add("sm:left-[0]", "top-[0]");

        painel_right.classList.remove("sm:right-[0]", "absolute", "bottom-[0]");
        painel_right.classList.add("bottom-[-30%]");

        form_login.classList.remove("right-[100%]");
        form_login.classList.add("delay-300");

        form_cadastro.classList.remove(
          "sm:right-[50%]",
          "sm:w-full",
          "right-[0]",
        );
        form_cadastro.classList.add("right-[-100%]");
      });
    }
  }, []);

  return (
    <div className="alter_box before:absolute before:top-[-270%] before:left-[0] before:z-2 before:h-[300%] before:w-full before:rounded-[150px] before:border before:bg-blue-600 before:transition-all before:duration-[1200ms] before:ease-in-out before:content-[''] sm:absolute sm:top-0 sm:h-full sm:w-full sm:before:top-0 sm:before:left-[-250%] sm:before:h-[100%] sm:before:w-[300%]">
      <div className="painel_left absolute top-[0] z-2 flex h-[30%] w-full flex-col items-center justify-center text-white transition-all duration-[1200ms] ease-in-out sm:top-[0] sm:left-[0] sm:h-full sm:w-[50%]">
        <h1 className="m-[-10px] mb-[15px] text-2xl">Hello, Welcome!</h1>
        <p className="mb-[15px]">Não tem uma conta?</p>
        <button className="register-btn mt-[15px] h-[46px] w-[160px] cursor-pointer rounded-lg border border-white bg-transparent text-base font-semibold text-white shadow-none">
          Criar conta
        </button>
      </div>

      <div className="painel_right bottom-[-30%] z-2 flex h-[30%] w-full flex-col items-center justify-center text-white transition-all duration-[1200ms] sm:absolute sm:top-0 sm:right-[-50%] sm:h-full sm:w-[50%]">
        <h1 className="m-[-10px] mb-[6px] text-2xl">Welcome Back!</h1>
        <p className="mb-[6px]">Já tem uma conta?</p>
        <button className="login-btn mt-[6px] h-[46px] w-[160px] cursor-pointer rounded-lg border border-white bg-transparent text-base font-semibold text-white shadow-none">
          Login
        </button>
      </div>
    </div>
  );
}
