// src/types/index.ts
export interface Product {
  id: number;
  title: string;
  price: number;
  stock: number;
  category: string;
  thumbnail: string; // Using thumbnail for the main image
}

// The API returns an object with a 'products' array
export interface ProductsApiResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}