import type { Product } from "../../types/index";
import styles from "./ProductList.module.css";

interface ProductListProps {
  products: Product[];
  isLoading: boolean;
  error: string | null;
}

const ProductList = ({ products, isLoading, error }: ProductListProps) => {
  if (isLoading) {
    return <p className={styles.message}>Loading products...</p>;
  }

  if (error) {
    return <p className={`${styles.message} ${styles.error}`}>{error}</p>;
  }

  if (products.length === 0) {
    return <p className={styles.message}>No products found.</p>;
  }

  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <div key={product.id} className={styles.card}>
          <img
            src={product.thumbnail}
            alt={product.title}
            className={styles.image}
          />
          <div className={styles.cardBody}>
            <span className={styles.category}>{product.category}</span>
            <h3 className={styles.title}>{product.title}</h3>
            <div className={styles.details}>
              <p className={styles.price}>${product.price.toFixed(2)}</p>
              <p className={styles.stock}>Stock: {product.stock}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;