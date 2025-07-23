# Seller Product Manager Dashboard

A React + TypeScript application for a seller dashboard that allows managing and viewing products fetched from a public REST API.

## Screenshots

*(Here you would add screenshots of the running application)*

**Product Listing View:**
![Product Listing](placeholder.jpg)

**Add Product Modal:**
![Add Product Modal](placeholder.jpg)

## Features Implemented

This project fulfills all the core functional and technical requirements.

### 1. Product Listing View
-   **Product Grid**: Displays products in a responsive grid/card layout.
-   **Data Fields**: Each product card shows the Product Image, Title, Category, Price, and available Stock.
-   **Search Functionality**: A search bar allows filtering products by their title in real-time.
-   **Category Filter**: A dropdown menu allows filtering products by their category. The categories are fetched dynamically from the API.
-   **Sorting Options**: Users can sort the displayed products by Title, Price, or Stock in both ascending and descending order.

### 2. Add New Product (Simulated)
-   **Add Product Form**: A modal form is provided to simulate adding a new product.
-   **Required Fields**: The form includes input fields for Title, Price, Category, Stock, and an Image URL.
-   **Dynamic UI Updates**: Upon submission, the new product is dynamically added to the top of the product list in the UI without requiring a page refresh. (Note: This is a front-end simulation and does not persist to the server, as per the requirement).

### Technical Requirements
-   **React + TypeScript**: The entire application is built using React and TypeScript (`.tsx`), ensuring type safety and robust component structure.
-   **API Integration**: Product data is fetched from the `https://dummyjson.com/products` public API.
-   **Modular Code**: The codebase is organized into reusable components (Header, FilterControls, ProductList, AddProductModal) and services (api, hooks) for better maintainability.
-   **State Management**: Utilizes core React hooks (`useState`, `useEffect`, and a custom hook `useProducts`) for efficient and clean state management.
-   **Responsive Design**: The UI is fully responsive and adapts to different screen sizes, from mobile devices to desktops.
-   **Clean Code**: The code is clean, readable, and includes comments where necessary to explain complex logic.

## Project Setup

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd seller-product-dashboard
    ```

2.  **Install dependencies:**
    This project uses `npm` as the package manager.
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open the application:**
    Navigate to `http://localhost:5173` in your web browser.