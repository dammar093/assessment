import { useEffect } from "react";
import { PropertyCard } from "../components/PropertyCard";
import { useAuth } from "../context/AuthContext";
import { useFavorites } from "../context/FavoriteContext";

const AccountPage = () => {
  const { favorites, fetchFavorites } = useFavorites();
  const { user } = useAuth();

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div className="container mx-auto p-6">
      {/* Greeting */}
      <h1 className="text-4xl font-bold mb-6">Hello, {user?.name} 👋</h1>
      <p className="text-gray-500 mb-8">
        Here are your favorite properties. You can remove any property from your
        list.
      </p>

      {favorites.length === 0 ? (
        <p className="text-gray-500 text-center mt-20">
          You have no favorite properties yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((fav) => (
            <div key={fav.id} className="relative">
              <PropertyCard
                id={fav.property.id}
                name={fav.property.name}
                description={fav.property.description}
                price={fav.property.price}
                image={fav.property.image}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AccountPage;
