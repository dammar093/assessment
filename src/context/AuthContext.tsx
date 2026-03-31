import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { api } from "../lib/axios";

interface User {
  name: string;
  email: string;
  role: "ADMIN" | "USER";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api
        .get("/me", { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
          console.log(res.data);
          setUser(res.data);
        })
        .catch(() => localStorage.removeItem("token"));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await api.post("/login", { email, password });
      const { token } = res.data;
      localStorage.setItem("token", token);
    } catch (err) {
      console.error("Login failed", err);
      throw err;
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      const res = await api.post("/signup", { name, email, password });
      const { token } = res.data;
      localStorage.setItem("token", token);
      setUser(user);
    } catch (err) {
      console.error("Signup failed", err);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
