import { useNavigate } from "react-router-dom";

function UserCard({ user, isFavorite, onToggleFavorite }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (user?.login?.uuid) {
      navigate(`/usuario/${user.login.uuid}`, { state: { user } });
    }
  };

  return (
    <div
      className="bg-gradient-to-br from-blue-100 to-purple-100 p-5 rounded-2xl shadow-lg hover:shadow-2xl transition cursor-pointer relative"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite();
        }}
        className="absolute top-3 right-3 text-2xl select-none"
        title="Favoritar"
      >
        {isFavorite ? "💖" : "🤍"}
      </div>

      <div onClick={handleClick} className="flex flex-col items-center text-center">
        <img
          src={user?.picture?.large || "https://via.placeholder.com/96"}
          alt={user?.name?.first || "Usuário"}
          className="w-24 h-24 rounded-full border-4 border-white mb-4 shadow-sm object-cover"
        />
        <h2 className="text-lg font-bold text-blue-800">
          {user?.name?.first || "Nome"} {user?.name?.last || ""}
        </h2>
        <p className="text-sm text-gray-700">{user?.email || "Email indisponível"}</p>
        <p className="text-sm text-gray-600">
          {user?.location?.city || "Cidade"}, {user?.location?.country || "País"}
        </p>
      </div>
    </div>
  );
}

export default UserCard;
