function Footer() {
  // Links para o rodapé
  const buttonLinks = [
    {
      marca: "Sobre o Projeto",
      link: "#",
    },
    {
      marca: "Curso",
      link: "https://landing.uniritter.edu.br/curso/engenharia-de-software-bacharelado?utm_source=google&utm_medium=cpc&utm_campaign=UNIRITTER_GRAD_TODOS_PERFORMANCE_GOOGLE_PMAX_CURSOS_262&utm_content=CIENCIACOMP______&gad_source=1&gad_campaignid=23759170774&gbraid=0AAAAADr6Rk6Ov8GX6TVfpFuj6HrZNU1Cu&gclid=EAIaIQobChMIl4ycxt74lAMVrl5IAB3cqy8_EAAYASAAEgLlrfD_BwE",
    },
    {
      marca: "LinkedIn do Criador",
      link: "https://www.linkedin.com/in/luiz-eduardo-karpinski-9b3256252/",
    },
  ];

  return (
    <footer className="mt-16 border-b bg-gray-50 shadow-[0_-4px_5px_rgba(0,0,0,0.1)]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row">
        <p className="text-center text-sm text-blue-600">
          &copy; {new Date().getFullYear()} Projeto TCC de acompanhamento de
          preços. Todos os direitos reservados.
        </p>
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-2">
          {buttonLinks.map((btn, index) => (
            <a
              key={index}
              href={btn.link}
              className="cursor-pointer text-sm text-blue-600 transition-colors hover:text-blue-900"
              target="_blank"
              rel="noopener noreferrer"
            >
              {btn.marca}
            </a>
          ))}
        </div>
      </div>
      <p className="px-6 pb-8 text-center text-xs text-blue-600">
        Site criado para fins estudantis - Não oficial e sem fins lucrativos.
        criador por Luiz Eduardo Karpinski
      </p>
    </footer>
  );
}

export default Footer;
