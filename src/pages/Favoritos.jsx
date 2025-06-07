import { useEffect, useState } from "react";
import UserCard from "../components/UserCard";

function Favoritos() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("favoritos");
    setFavorites(stored ? JSON.parse(stored) : []);
  }, []);

  const toggleFavorite = (user) => {
    const uuid = user?.login?.uuid;
    if (!uuid) return;

    const updated = favorites.filter((fav) => fav?.login?.uuid !== uuid);
    setFavorites(updated);
    localStorage.setItem("favoritos", JSON.stringify(updated));
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-pink-700 drop-shadow-sm">
        Meus Favoritos 💖
      </h1>

      <div className="flex justify-center mb-8">
        <a
          href="/"
          className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-3 rounded-full shadow-md hover:scale-105 hover:shadow-xl transition-transform"
        >
          🔙 Voltar
        </a>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {favorites.length > 0 ? (
          favorites.map((user, index) => (
            <UserCard
              key={index}
              user={user}
              isFavorite={true}
              onToggleFavorite={() => toggleFavorite(user)}
            />
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">
            Você ainda não tem favoritos. 💔
          </p>
        )}
      </div>
    </div>
  );
}

export default Favoritos;
