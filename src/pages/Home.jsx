import { useEffect, useState } from "react";
import UserCard from "../components/UserCard";

function Home() {
  const [users, setUsers] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem("favoritos");
    return stored ? JSON.parse(stored) : [];
  });

  const fetchUsers = () => {
    fetch("https://randomuser.me/api/?results=12")
      .then((res) => res.json())
      .then((data) => setUsers(data.results));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (user) => {
    const uuid = user?.login?.uuid;
    if (!uuid) return;

    setFavorites((prev) => {
      const exists = prev.some((fav) => fav?.login?.uuid === uuid);
      return exists
        ? prev.filter((fav) => fav?.login?.uuid !== uuid)
        : [...prev, user];
    });
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-purple-200 via-pink-100 to-blue-100">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-purple-800 drop-shadow-sm">
        Usuários Aleatórios
      </h1>

      <div className="flex justify-center gap-4 mb-10">
        <button
          onClick={fetchUsers}
          className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-full shadow-md hover:scale-105 hover:shadow-xl transition-transform"
        >
          🔄 Atualizar Lista
        </button>

        <a
          href="/favoritos"
          className="bg-gradient-to-r from-pink-500 to-yellow-400 text-white px-6 py-3 rounded-full shadow-md hover:scale-105 hover:shadow-xl transition-transform"
        >
          💖 Ver Favoritos
        </a>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {users.map((user, index) => (
          <UserCard
            key={index}
            user={user}
            isFavorite={favorites.some(
              (fav) => fav?.login?.uuid === user?.login?.uuid
            )}
            onToggleFavorite={() => toggleFavorite(user)}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
