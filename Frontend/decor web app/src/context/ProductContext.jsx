import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    return (
      <></>
      );
    };
    export const useProductContext = () => {
      return useContext(ProductContext);
    };
    
    
    