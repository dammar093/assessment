import { createContext, useContext, useState, type ReactNode } from "react";
import axios from "axios";
import { api } from "../lib/axios";

interface Property {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface Favorite {
  id: string;
  property: Property;
}

interface FavoriteContextType {
  favorites: Favorite[];
  addFavorite: (propertyId: string) => Promise<void>;
  removeFavorite: (propertyId: string) => Promise<void>;
  fetchFavorites: () => Promise<void>;
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(
  undefined,
);

export const FavoriteProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  const fetchFavorites = async () => {
    try {
      const res = await api.get("/favorites");
      setFavorites(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addFavorite = async (propertyId: string) => {
    try {
      const res = await api.post("/favorites", { propertyId });
      setFavorites((prev) => [...prev, res.data]);
    } catch (err) {
      console.error(err);
    }
  };

  const removeFavorite = async (propertyId: string) => {
    try {
      await api.delete("/favorites", { data: { propertyId } });
      setFavorites((prev) => prev.filter((f) => f.property.id !== propertyId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <FavoriteContext.Provider
      value={{ favorites, addFavorite, removeFavorite, fetchFavorites }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoriteContext);
  if (!context)
    throw new Error("useFavorites must be used within FavoriteProvider");
  return context;
};
