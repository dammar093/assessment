import { useState } from "react";
import { useFavorites } from "../context/FavoriteContext";
import { useNavigate } from "react-router-dom";

interface PropertyCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export const PropertyCard = ({
  id,
  name,
  description,
  price,
  image,
}: PropertyCardProps) => {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const isFavorited = favorites.some((f) => f.property.id === id);

  const handleFavorite = async () => {
    if (!token) {
      // Redirect unauthorized user to login
      navigate("/login");
      return;
    }

    if (loading) return;
    setLoading(true);

    try {
      if (isFavorited) {
        await removeFavorite(id);
      } else {
        await addFavorite(id);
      }
    } catch (err) {
      console.error("Favorite action failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded-lg shadow p-4 flex flex-col hover:shadow-lg transition-shadow duration-200">
      <img
        src={image}
        alt={name}
        crossOrigin="anonymous"
        className="h-48 w-full object-cover rounded-md mb-3"
      />
      <h2 className="text-lg font-semibold mb-1">{name}</h2>
      <p className="text-gray-600 flex-1 mb-2 line-clamp-3">{description}</p>
      <div className="flex justify-between items-center mt-2">
        <span className="font-bold text-xl">${price}</span>
        <button
          onClick={handleFavorite}
          disabled={loading}
          className={`px-4 py-1 rounded flex items-center justify-center transition-colors duration-200 ${
            isFavorited
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          {isFavorited ? "♥ Remove" : "♡ Add"}
        </button>
      </div>
    </div>
  );
};
