import axios from "axios";
import type { Product, User } from "../types";

const API_BASE_URL = "https://fakestoreapi.com";

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const productApi = {
  getAll: () => api.get<Product[]>("/products").then((res) => res.data),
  getCategories: () =>
    api.get<string[]>("/products/categories").then((res) => res.data),
  getByCategory: (category: string) =>
    api
      .get<Product[]>(`/products/category/${category}`)
      .then((res) => res.data),
};

export const userApi = {
  getAll: () => api.get<User[]>("/users").then((res) => res.data),
  getById: (id: number) =>
    api.get<User>(`/users/${id}`).then((res) => res.data),
};
