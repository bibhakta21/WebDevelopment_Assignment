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
    
    
    