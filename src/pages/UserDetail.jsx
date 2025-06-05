// UserDetail.jsx
import { useLocation, useNavigate, useParams } from "react-router-dom";

function UserDetail() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const user = state?.user;

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
        <p className="text-red-500 mb-4 text-center text-lg">
          Usuário não encontrado.
        </p>
        <button
          onClick={() => navigate("/users")}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Voltar para a lista
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full text-center">
        <img
          src={user.picture.large}
          alt={user.name.first}
          className="w-32 h-32 rounded-full border-4 border-blue-500 mx-auto mb-4"
        />
        <h2 className="text-2xl font-bold text-blue-800 mb-2">
          {user.name.first} {user.name.last}
        </h2>
        <p className="text-gray-600 mb-1">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="text-gray-600 mb-1">
          <strong>Celular:</strong> {user.cell}
        </p>
        <p className="text-gray-600 mb-1">
          <strong>Local:</strong> {user.location.city}, {user.location.state},{" "}
          {user.location.country}
        </p>
        <p className="text-gray-600 mb-4">
          <strong>Data de nascimento:</strong>{" "}
          {new Date(user.dob.date).toLocaleDateString()}
        </p>

        <button
          onClick={() => navigate(-1)}
          className="mt-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-full hover:brightness-110 transition-all"
        >
          ← Voltar
        </button>
      </div>
    </div>
  );
}

export default UserDetail;
