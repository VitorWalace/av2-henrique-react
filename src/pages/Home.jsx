import { useEffect, useState } from "react";
import UserCard from "../components/UserCard";

function Home() {
  const [users, setUsers] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem("favoritos");
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Erro ao ler favoritos do localStorage:", error);
      return [];
    }
  });

  const fetchUsers = async () => {
    try {
      const res = await fetch("https://randomuser.me/api/?results=12");
      const data = await res.json();
      if (data?.results) {
        setUsers(data.results);
      } else {
        console.error("Resposta inesperada da API:", data);
      }
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("favoritos", JSON.stringify(favorites));
    } catch (error) {
      console.error("Erro ao salvar favoritos:", error);
    }
  }, [favorites]);

  const toggleFavorite = (uuid) => {
    setFavorites((prev) =>
      prev.includes(uuid)
        ? prev.filter((id) => id !== uuid)
        : [...prev, uuid]
    );
  };

  const isUserFavorite = (uuid) => favorites.includes(uuid);

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
        {users.length > 0 ? (
          users.map((user) =>
            user?.login?.uuid ? (
              <UserCard
                key={user.login.uuid}
                user={user}
                isFavorite={isUserFavorite(user.login.uuid)}
                onToggleFavorite={() => toggleFavorite(user.login.uuid)}
              />
            ) : null
          )
        ) : (
          <p className="text-center text-gray-700 col-span-full">
            Carregando usuários ou nenhum disponível.
          </p>
        )}
      </div>
    </div>
  );
}

export default Home;
