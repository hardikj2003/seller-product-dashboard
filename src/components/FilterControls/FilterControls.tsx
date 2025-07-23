import React, { useState, useEffect } from "react";
import { getProductCategories, type Category } from "../../api/products";
import styles from "./FilterControls.module.css";

interface FilterControlsProps {
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (category: string) => void;
  setSortKey: (key: "title" | "price" | "stock") => void;
  setSortOrder: (order: "asc" | "desc") => void;
  sortKey: string;
  sortOrder: string;
  onAddNew: () => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({
  setSearchTerm,
  setSelectedCategory,
  setSortKey,
  setSortOrder,
  sortKey,
  sortOrder,
  onAddNew,
}) => {
  // State now holds an array of Category objects
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getProductCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleSort = (key: "title" | "price" | "stock") => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const getSortIndicator = (key: "title" | "price" | "stock") => {
    if (sortKey !== key) return "";
    return sortOrder === "asc" ? " ▲" : " ▼";
  };

  return (
    <div className={styles.controlsContainer}>
      <div className={styles.filterGroup}>
        <input
          type="text"
          placeholder="Search by product title..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          className={styles.categorySelect}
        >
          <option value="">All Categories</option>
          {/* Correctly map over the array of category objects */}
          {categories.map((cat) => (
            <option key={cat.slug} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.actionsGroup}>
        <div className={styles.sortButtons}>
          <button onClick={() => handleSort("title")}>
            Sort by Title{getSortIndicator("title")}
          </button>
          <button onClick={() => handleSort("price")}>
            Sort by Price{getSortIndicator("price")}
          </button>
          <button onClick={() => handleSort("stock")}>
            Sort by Stock{getSortIndicator("stock")}
          </button>
        </div>
        <button className={styles.addButton} onClick={onAddNew}>
          + Add New Product
        </button>
      </div>
    </div>
  );
};

export default FilterControls;