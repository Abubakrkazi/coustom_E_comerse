"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  register: (data: RegisterData) => boolean;
  login: (data: LoginData) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const USERS_STORAGE_KEY = "rawaj-shop-users";
const CURRENT_USER_STORAGE_KEY = "rawaj-shop-current-user";

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load logged-in user
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(
        CURRENT_USER_STORAGE_KEY
      );

      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error("Failed to load user:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Register
  const register = (data: RegisterData) => {
    try {
      const savedUsers = localStorage.getItem(
        USERS_STORAGE_KEY
      );

      const users: Array<User & { password: string }> =
        savedUsers ? JSON.parse(savedUsers) : [];

      const existingUser = users.find(
        (item) =>
          item.email.toLowerCase() === data.email.toLowerCase()
      );

      if (existingUser) {
        return false;
      }

      const newUser = {
        id: `USER-${Date.now()}`,
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
      };

      localStorage.setItem(
        USERS_STORAGE_KEY,
        JSON.stringify([...users, newUser])
      );

      const loggedInUser: User = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
      };

      localStorage.setItem(
        CURRENT_USER_STORAGE_KEY,
        JSON.stringify(loggedInUser)
      );

      setUser(loggedInUser);

      return true;
    } catch (error) {
      console.error("Registration failed:", error);
      return false;
    }
  };

  // Login
  const login = (data: LoginData) => {
    try {
      const savedUsers = localStorage.getItem(
        USERS_STORAGE_KEY
      );

      const users: Array<User & { password: string }> =
        savedUsers ? JSON.parse(savedUsers) : [];

      const matchedUser = users.find(
        (item) =>
          item.email.toLowerCase() === data.email.toLowerCase() &&
          item.password === data.password
      );

      if (!matchedUser) {
        return false;
      }

      const loggedInUser: User = {
        id: matchedUser.id,
        name: matchedUser.name,
        email: matchedUser.email,
        phone: matchedUser.phone,
      };

      localStorage.setItem(
        CURRENT_USER_STORAGE_KEY,
        JSON.stringify(loggedInUser)
      );

      setUser(loggedInUser);

      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isLoading,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}