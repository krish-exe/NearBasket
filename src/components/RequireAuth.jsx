import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Sends logged-out visitors to /login, then back here once they sign in.
export default function RequireAuth({ children }) {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return children;
}
