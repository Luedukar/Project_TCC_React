function Produtos(props) {
  // props: produtos, deleteProdutos, desativarAviso, ativarAviso
  const produtos = props.produtos || [];

  if (produtos.length === 0) {
    return (
      <p className="rounded-lg bg-white p-6 text-center text-gray-600 shadow-sm">
        Nenhum produto encontrado.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {produtos.map((item) => {
        const preco = Number(item.precodesejado);
        const precoFormatado = Number.isFinite(preco)
          ? preco.toFixed(2).replace(".", ",")
          : item.precodesejado;

        return (
          <section
            key={item.idproduto}
            className="flex flex-col justify-between rounded-lg border border-blue-100 bg-white p-6 shadow-sm transition-all duration-150 hover:scale-105 hover:shadow-md"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.produtonome}
                </h3>
                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium whitespace-nowrap ${
                    item.enviaraviso
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {item.enviaraviso ? "Aviso ativo" : "Aviso inativo"}
                </span>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <p className="text-sm text-gray-500">Preço desejado</p>
                <p className="ml-auto text-xl font-bold text-blue-600">
                  R$ {precoFormatado}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={() => props.deleteProdutos(item.idproduto)}
                className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100"
              >
                <box-icon name="trash" size="sm"></box-icon>
                Excluir
              </button>

              {item.enviaraviso ? (
                <button
                  onClick={() => props.desativarAviso(item.idproduto)}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-green-700"
                >
                  <box-icon name="bell" color="#fff" size="sm"></box-icon>
                  Desativar
                </button>
              ) : (
                <button
                  onClick={() => props.ativarAviso(item.idproduto)}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-yellow-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-yellow-600"
                >
                  <box-icon name="bell" color="#fff" size="sm"></box-icon>
                  Ativar
                </button>
              )}
            </div>
          </section>
        );
      })}

      {produtos.length === 10 && (
        <p className="col-span-full mt-2 rounded-lg bg-white p-4 text-center text-gray-600 shadow-sm">
          Você atingiu o limite máximo de produtos. Exclua alguns para adicionar
          novos.
        </p>
      )}
    </div>
  );
}

export default Produtos;
