import { createContext, useContext, useState, type ReactNode } from "react";
import { api } from "../lib/axios";

export interface Property {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  userId?: string;
  created_at: string;
  updated_at: string;
}

interface PropertyContextType {
  properties: Property[];
  loading: boolean;
  fetchProperties: () => Promise<void>;
  createProperty: (data: FormData) => Promise<Property | null>;
}

const PropertyContext = createContext<PropertyContextType | undefined>(
  undefined,
);

export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (!context)
    throw new Error("useProperty must be used within PropertyProvider");
  return context;
};

interface PropertyProviderProps {
  children: ReactNode;
}

export const PropertyProvider = ({ children }: PropertyProviderProps) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch all properties
  const fetchProperties = async () => {
    try {
      setLoading(true);
      const res = await api.get("/properties");
      setProperties(res.data);
    } catch (err) {
      console.error("Failed to fetch properties", err);
    } finally {
      setLoading(false);
    }
  };

  // Create a new property
  const createProperty = async (data: FormData) => {
    try {
      setLoading(true);
      const res = await api.post("/properties", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setProperties((prev) => [res.data, ...prev]);
      return res.data;
    } catch (err) {
      console.error("Failed to create property", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return (
    <PropertyContext.Provider
      value={{ properties, loading, fetchProperties, createProperty }}
    >
      {children}
    </PropertyContext.Provider>
  );
};
