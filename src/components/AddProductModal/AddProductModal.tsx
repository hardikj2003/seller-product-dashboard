import React, { useState } from "react";
import type { Product } from "../../types/index";
import styles from "./AddProductModal.module.css";

interface AddProductModalProps {
  onClose: () => void;
  onAddProduct: (product: Omit<Product, "id">) => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  onClose,
  onAddProduct,
}) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [formError, setFormError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price || !category || !stock || !thumbnail) {
      setFormError("All fields are required.");
      return;
    }

    const newProduct: Omit<Product, "id"> = {
      title,
      price: parseFloat(price),
      category,
      stock: parseInt(stock, 10),
      thumbnail,
    };

    onAddProduct(newProduct);
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>Add New Product</h2>
        <form onSubmit={handleSubmit}>
          {formError && <p className={styles.formError}>{formError}</p>}
          <div className={styles.formGroup}>
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Price ($)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              min="0"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Stock</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
              min="0"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Image URL</label>
            <input
              type="url"
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              required
            />
          </div>
          <div className={styles.formActions}>
            <button type="button" className={styles.cancelButton} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles.submitButton}>
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;