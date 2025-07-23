// src/api/products.ts
// src/api/products.ts
import type { ProductsApiResponse } from "../types/index";
const API_BASE_URL = "https://dummyjson.com";

export interface Category {
  slug: string;
  name: string;
  url: string;
}
export const getAllProducts = async (): Promise<ProductsApiResponse> => {
  const response = await fetch(`${API_BASE_URL}/products?limit=0`);
  if (!response.ok) {
    throw new Error("Failed to fetch products.");
  }
  return response.json();
};

export const getProductCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${API_BASE_URL}/products/categories`);
  if (!response.ok) {
    throw new Error("Failed to fetch categories.");
  }
  return response.json();
};