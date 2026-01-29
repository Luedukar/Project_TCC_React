function Produtos(props) {
  // o props recebido é um array de produtos (obtido do banco na consulta http://localhost:3000/auth/productsMe)
  // validação, excluir quando não for mais necessária
  console.log(props.produtos);
  // se não houver produtos, exibe mensagem
  if (!props.produtos || props.produtos.length === 0) {
    return <p>Nenhum produto encontrado.</p>;
  }
  return (
    <ul className="space-y-4 rounded-md bg-blue-600 shadow">
      {/*props.produtos para acesso o array recebido, map para percorer item por item (item) semlahnte ao for i in ### do python */}
      {props.produtos.map((item) => (
        // todo item precisa de uma key unica, nesse caso, o id do produto presente em cada item do array
        <li key={item.idproduto} className="p-2">
          <button className="rounded-md bg-white px-4 py-2 text-black">
            {/* exibindo o nome do produto e o preço desejado usando chaves (chave-valor) do array*/}
            {item.produtonome} - R$ {item.precodesejado}
          </button>
          <button className="ml-3 rounded-md bg-white px-4 py-2 text-black">
            <i className="bx bx-trash cursor-pointer bg-transparent text-red-600"></i>
          </button>
        </li>
      ))}
      {/* Limite de 10 produtos por usuário* */}
      {props.produtos.length === 10 && (
        <p className="mt-4 text-center text-white">
          Você atingiu o limite máximo de produtos. Exclua alguns para adicionar
          mais.
        </p>
      )}
    </ul>
  );
}

export default Produtos;
