import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
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
    
    
    