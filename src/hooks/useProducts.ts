// src/hooks/useProducts.ts
import { useState, useEffect, useMemo } from "react";
import type { Product } from "../types/index";
import { getAllProducts } from "../api/products";

type SortKey = "title" | "price" | "stock";
type SortOrder = "asc" | "desc";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("title");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  // Fetch initial data
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const data = await getAllProducts();
        setProducts(data.products); 
        setError(null);
      } catch (err) {
        setError("Could not fetch product data. Please try again later.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);


  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory) {
      result = result.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (searchTerm) {
      result = result.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }


    result.sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      let comparison = 0;
      if (aValue > bValue) {
        comparison = 1;
      } else if (aValue < bValue) {
        comparison = -1;
      }
      return sortOrder === "desc" ? comparison * -1 : comparison;
    });

    return result;
  }, [products, searchTerm, selectedCategory, sortKey, sortOrder]);


  const addProduct = (newProduct: Omit<Product, "id">) => {

    const productWithId: Product = {
      ...newProduct,
      id: Date.now(), 
    };
    setProducts((prevProducts) => [productWithId, ...prevProducts]);
  };

  return {
    products: filteredAndSortedProducts,
    isLoading,
    error,
    addProduct,
    setSearchTerm,
    setSelectedCategory,
    setSortKey,
    setSortOrder,
    sortKey,
    sortOrder,
    allProducts: products, 
  };
};