// src/App.tsx
import { useState } from "react";
import Header from "./components/Header/Header";
import FilterControls from "./components/FilterControls/FilterControls";
import ProductList from "./components/ProductList/ProductList";
import AddProductModal from "./components/AddProductModal/AddProductModal";
import { useProducts } from "./hooks/useProducts";
import "./App.css";

function App() {
  const {
    products,
    isLoading,
    error,
    addProduct,
    setSearchTerm,
    setSelectedCategory,
    setSortKey,
    setSortOrder,
    sortKey,
    sortOrder,
  } = useProducts();

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="App">
      <Header title="Seller Product Dashboard" />
      <main>
        <FilterControls
          setSearchTerm={setSearchTerm}
          setSelectedCategory={setSelectedCategory}
          setSortKey={setSortKey}
          setSortOrder={setSortOrder}
          sortKey={sortKey}
          sortOrder={sortOrder}
          onAddNew={() => setIsModalOpen(true)}
        />
        <ProductList products={products} isLoading={isLoading} error={error} />
      </main>

      {isModalOpen && (
        <AddProductModal
          onClose={() => setIsModalOpen(false)}
          onAddProduct={(newProduct) => {
            addProduct(newProduct);
          }}
        />
      )}
    </div>
  );
}

export default App;