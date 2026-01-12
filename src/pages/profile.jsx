export default function Profile() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  return (
    <div>
      <h2>Perfil</h2>
      <p>Nome: {usuario?.nome}</p>
      <p>Email: {usuario?.email}</p>
    </div>
  );
}
