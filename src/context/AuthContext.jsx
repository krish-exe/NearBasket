import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("nearbasket_user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const login = (userInfo) => {
    setUser(userInfo);
    try {
      localStorage.setItem("nearbasket_user", JSON.stringify(userInfo));
    } catch {
      // Storage unavailable (private mode); stay logged in for this session only
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem("nearbasket_user");
    } catch {
      // ignore
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside an AuthProvider");
  return ctx;
}
