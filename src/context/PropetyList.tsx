import { useEffect } from "react";
import { useProperty } from "../context/PropertyContext";
import { Card } from "../components/ui/card";
import { CardContent } from "../components/ui/card";
import { CardTitle } from "../components/ui/card";
import { CardDescription } from "../components/ui/card";
import { Skeleton } from "../components/ui/skeleton";

const PropertyList = () => {
  const { properties, fetchProperties, loading } = useProperty();

  useEffect(() => {
    fetchProperties();
  }, []);

  if (loading) {
    // Show skeletons while loading
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {Array.from({ length: 6 }).map((_, idx) => (
          <Skeleton key={idx} className="h-64 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <p className="text-center p-6 text-gray-500">No properties found.</p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {properties.map((property) => (
        <Card
          key={property.id}
          className="shadow-md rounded-lg overflow-hidden"
        >
          <img
            src={property.image}
            alt={property.name}
            className="w-full h-48 object-cover"
            crossOrigin="anonymous"
          />
          <CardContent>
            <CardTitle className="text-lg font-semibold">
              {property.name}
            </CardTitle>
            <CardDescription className="text-sm text-gray-600 line-clamp-2">
              {property.description}
            </CardDescription>
            <p className="mt-2 font-bold">${property.price.toLocaleString()}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PropertyList;
