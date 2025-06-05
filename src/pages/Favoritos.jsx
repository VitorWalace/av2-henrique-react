import { useEffect, useState } from "react";
import UserCard from "../components/UserCard";

function Favoritos() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("favoritos");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  const toggleFavorite = (user) => {
    const updated = favorites.filter(fav => fav.login.uuid !== user.login.uuid);
    setFavorites(updated);
    localStorage.setItem("favoritos", JSON.stringify(updated));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Meus Favoritos 💖</h1>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-600">Você ainda não favoritou ninguém.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {favorites.map((user, index) => (
            <UserCard
              key={index}
              user={user}
              isFavorite={true}
              onToggleFavorite={() => toggleFavorite(user)}
            />
          ))}
        </div>
      )}

      <div className="flex justify-center mt-8">
        <a
          href="/"
          className="bg-blue-500 text-white px-6 py-2 rounded-full shadow hover:shadow-lg hover:brightness-110 transition-all"
        >
          ← Voltar para Home
        </a>
      </div>
    </div>
  );
}

export default Favoritos;
