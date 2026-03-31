import { NavLink, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // JWT token for auth

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-md font-semibold transition-colors ${
      isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-200"
    }`;

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      {/* Brand */}
      <div
        className="text-2xl font-bold text-blue-600 cursor-pointer"
        onClick={() => navigate("/")}
      >
        RealEstateApp
      </div>

      {/* Navigation Links */}
      <div className="flex items-center space-x-4">
        <NavLink to="/" className={navLinkClass}>
          Properties
        </NavLink>
        {token && (
          <NavLink to="/account" className={navLinkClass}>
            Favorites
          </NavLink>
        )}

        {/* Login / Logout Button */}
        {token ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
          >
            Logout
          </button>
        ) : (
          <NavLink
            to="/login"
            className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
          >
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
};
