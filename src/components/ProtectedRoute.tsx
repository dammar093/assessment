import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { JSX, ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  adminOnly?: boolean;
}

export const ProtectedRoute = ({
  children,
  adminOnly = false,
}: ProtectedRouteProps): JSX.Element | null => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    } else if (adminOnly && user?.role !== "ADMIN") {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, adminOnly, user, navigate]);

  // Prevent flickering: Only return children if the user is authorized
  const isAuthorized =
    isAuthenticated && (!adminOnly || user?.role === "ADMIN");

  return isAuthorized ? <>{children}</> : null;
};
