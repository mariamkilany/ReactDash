import { useState, useEffect, type ReactNode } from "react";

import { AuthContext } from "../contexts/auth";
import { api } from "../services/api";
import type { AuthContextType, RegisterData, User } from "../types";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing token on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("auth_token");
    if (savedToken) {
      setToken(savedToken);
      // You could also fetch user data here if needed
    }
    setIsLoading(false);
  }, []);

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await api.post("/auth/login", {
        username,
        password,
      });

      const { token: authToken } = response.data;

      if (authToken) {
        setToken(authToken);
        localStorage.setItem("auth_token", authToken);

        // Fetch user data
        const userResponse = await api.get("/users");
        const users = userResponse.data;
        const currentUser = users.find((u: User) => u.username === username);

        if (currentUser) {
          setUser(currentUser);
        }

        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await api.post("/users", userData);

      if (response.data) {
        // Auto-login after successful registration
        const loginSuccess = await login(userData.email, userData.password);
        return loginSuccess;
      }
      return false;
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("auth_token");
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
