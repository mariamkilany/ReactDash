import axios from "axios";
import type { Product, User } from "../types";

const API_BASE_URL = "https://chaty-zreu.onrender.com/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Prevent infinite loop: do not refresh if the request is already /auth/refresh
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !["/auth/login", "/auth/signup", "/auth/refresh"].some((url) =>
        originalRequest.url.endsWith(url)
      )
    ) {
      originalRequest._retry = true;
      try {
        const response = await api.post("/auth/refresh");
        const { accessToken } = response.data;
        if (accessToken) {
          localStorage.setItem("auth_token", accessToken);
          localStorage.setItem("token_timestamp", Date.now().toString());
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        }
      } catch {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("token_timestamp");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export const productApi = {
  getAll: () => api.get<Product[]>("/products").then((res) => res.data),
  create: (product: Omit<Product, "id">) =>
    api.post<Product>("/products", product).then((res) => res.data),
  update: (id: number, product: Partial<Omit<Product, "id">>) =>
    api.put<Product>(`/products/${id}`, product).then((res) => res.data),
  delete: (id: number) => api.delete(`/products/${id}`).then((res) => res.data),
};

export const userApi = {
  getAll: () => api.get<User[]>("/users").then((res) => res.data),
  getById: (id: number) =>
    api.get<User>(`/users/${id}`).then((res) => res.data),
  update: (id: number, user: Partial<User>) =>
    api.put<User>(`/users/${id}`, user).then((res) => res.data),
  delete: (id: number) => api.delete(`/users/${id}`).then((res) => res.data),
};
