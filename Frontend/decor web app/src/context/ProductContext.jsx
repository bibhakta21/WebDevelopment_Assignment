import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const ProductContext = createContext();
const [products, setProducts] = useState([]);
const url = "http://localhost:8080/api/v2/products/getAll";
export const ProductProvider = ({ children }) => {


    const fetchProducts = async () => {
        try {
          const response = await axios.get(url);
          setProducts(response.data);
          setError(null); // Reset error on successful fetch
        } catch (error) {
          console.error("Error fetching data:", error);
          setError("Error fetching productss."); // Set error message
        }
      };
      
  useEffect(() => {
    fetchProducts();
  }, []); // Empty dependency array means this effect runs only once on mount

  const addProduct = async (productData) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v2/products/add",
        productData
      );

      // Assuming the response contains the newly added products data
      const newProduct = response.data;

      // Update the state immediately after adding a new products
      setProducts((prevProducts) => [newProduct, ...prevProducts]);

      // Fetch all data again after adding a new products
      // (this is optional depending on your requirements)
      fetchProducts();
      setError(null); // Reset error on successful add
    } catch (error) {
      console.error("Error adding products:", error);
      setError(true); // Set error message
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:8080/api/v2/products/delete/${productId}`);

      // Update the state immediately after deleting a products
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));

      // Fetch all data again after deleting a products
      // (this is optional depending on your requirements)
      fetchProducts();
      setError(null); // Reset error on successful delete
    } catch (error) {
      console.error("Error deleting products:", error);
      setError(true); // Set error message
    }
  };

  
  const getProductById = async (productId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v2/products/${productId}`
      );
      setSingleProduct(response.data);
      slideSidebar();
      setError(null); // Reset error on successful fetch
    } catch (error) {
      console.error("Error fetching single products:", error);
      setError(true); // Set error message
    }
  };
    
    return (
        <ProductContext.Provider
          value={{
            products,
            fetchProducts,
            addProduct,
            deleteProduct,
            getProductById,
            singleProduct,
            error, // Add error to the context
          }}
        >
          {children}
        </ProductContext.Provider>
      );
    };
    export const useProductContext = () => {
      return useContext(ProductContext);
    };
    
    
    