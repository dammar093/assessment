import { useEffect } from "react";
import { PropertyCard } from "../components/PropertyCard";
import { useFavorites } from "../context/FavoriteContext";
import { useProperty } from "../context/PropertyContext";

const HomePage = () => {
  const { properties, fetchProperties, loading } = useProperty();
  const { fetchFavorites } = useFavorites();

  useEffect(() => {
    fetchProperties();
    fetchFavorites();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl text-black font-bold mb-6">
        Available Properties
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((prop) => (
            <PropertyCard
              key={prop.id}
              id={prop.id}
              name={prop.name}
              description={prop.description}
              price={prop.price}
              image={prop.image}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
