import { useState, useEffect, type ReactNode } from "react";

import { AuthContext } from "../contexts/auth";
import { api, userApi } from "../services/api";
import { AUTH_TOKEN_KEY } from "../constants";
import type { AuthContextType, AuthUser, RegisterData } from "../types";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const saveToken = (accessToken: string) => {
    localStorage.setItem(AUTH_TOKEN_KEY, accessToken);
  };

  const clearTokenData = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  };

  const USER_ID_KEY = "user_id";

  const saveUserId = (id: number) => {
    localStorage.setItem(USER_ID_KEY, id.toString());
  };

  const clearUserId = () => {
    localStorage.removeItem(USER_ID_KEY);
  };

  // No refresh on load, just set token if present
  useEffect(() => {
    const savedToken = localStorage.getItem(AUTH_TOKEN_KEY);
    const savedUserId = localStorage.getItem(USER_ID_KEY);
    if (savedToken) {
      setToken(savedToken);
      if (savedUserId) {
        userApi.getById(Number(savedUserId)).then((user) => {
          setUser({
            id: user.id,
            email: user.email,
            username: user.name, // or user.email if you don't have a username
          });
        });
      }
    }
    setIsLoading(false);
  }, []);

  const refreshAccessToken = async (): Promise<boolean> => {
    try {
      // No need to send refreshToken, backend reads it from httpOnly cookie
      const response = await api.post("/auth/refresh");
      const { accessToken } = response.data;
      if (accessToken) {
        setToken(accessToken);
        saveToken(accessToken);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Token refresh failed:", error);
      clearTokenData();
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await api.post("/auth/login", {
        email,
        password,
      });
      const data = await response.data;
      const { accessToken, user } = data;
      if (accessToken) {
        setToken(accessToken);
        setUser({
          id: user.id,
          email: user.email,
          username: user.name, // or user.email if you don't have a username
        });
        saveToken(accessToken);
        saveUserId(user.id);
        return true;
      }
      return false;
    } catch (err) {
      console.error("Login error:", err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await api.post("/auth/signup", userData);
      if (response.data) {
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
    clearTokenData();
    clearUserId();
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    login,
    register,
    logout,
    refreshToken: refreshAccessToken,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
