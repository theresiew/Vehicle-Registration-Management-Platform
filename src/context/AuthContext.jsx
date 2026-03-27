import { createContext, useContext, useEffect, useMemo, useState } from "react";

const SESSION_KEY = "vehicle-platform-auth";
const MOCK_USER = {
  email: "admin@example.com",
  password: "password123",
  name: "Platform Admin",
};

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem(SESSION_KEY);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);
      setIsAuthenticated(Boolean(parsed?.isAuthenticated));
      setUser(parsed?.user ?? null);
    } catch {
      localStorage.removeItem(SESSION_KEY);
    }
  }, []);

  const login = ({ email, password }) => {
    if (email !== MOCK_USER.email || password !== MOCK_USER.password) {
      throw new Error("Use admin@example.com / password123 to sign in.");
    }

    const session = {
      isAuthenticated: true,
      user: {
        name: MOCK_USER.name,
        email: MOCK_USER.email,
      },
    };

    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setIsAuthenticated(true);
    setUser(session.user);
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setIsAuthenticated(false);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      isAuthenticated,
      user,
      login,
      logout,
    }),
    [isAuthenticated, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
