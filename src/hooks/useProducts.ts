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
        setProducts(data.products); // This line can cause a crash
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

  // Memoized filtering and sorting logic
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // 1. Filter by category
    if (selectedCategory) {
      result = result.filter(
        (product) => product.category === selectedCategory
      );
    }

    // 2. Filter by search term (on product title)
    if (searchTerm) {
      result = result.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 3. Sort the results
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

  // Function to add a new product to the state
  const addProduct = (newProduct: Omit<Product, "id">) => {
    // Simulate creating a new product with a temporary unique ID
    const productWithId: Product = {
      ...newProduct,
      id: Date.now(), // Use timestamp for a simple unique ID
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
    allProducts: products, // Return original list to derive categories
  };
};