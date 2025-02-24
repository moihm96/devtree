import { Link } from "react-router-dom";

export default function LoginView() {
  return (
    <>
      <h1 className="text-4xl text-white font-bold">Inicia sesión</h1>
      <nav>
        <Link
          className="text-center text-white text-lg mt-10 block"
          to="/auth/register"
        >
          ¿No tienes cuenta? Crea una aquí
        </Link>
      </nav>
    </>
  );
}
