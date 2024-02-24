import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useAuthContext } from "../context/useAuthContext";
import { addToCart } from "../components/AddToCart";


const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const url = `http://localhost:8080/api/v2/products/${id}`;
  const { user } = useAuthContext();
  const userID = user ? user.id : null;

  const getProduct = async () => {
    try {
      const response = await axios.get(url);
      setProduct(response.data || {});
    } catch (error) {
      console.error("Error fetching products:", error);
      setProduct({}); // Set empty object in case of an error
    }
  };

 

  useEffect(() => {
    getProduct();
  }, [url]);

 

  return (
    <section className="bestselling my-6 py-20 relative">
    <div className="w-[80%] mx-auto flex gap-5 justify-center items-center  rounded-lg overflow-hidden shadow-lg p-6">
      {/* ... */}
      {product.base64Image ? (
            <img
              src={`data:image/png;base64, ${product.base64Image}`}
              alt="Product"
              className="max-h-[500px] max-w-[500px] w-[500px] h-[500px] rounded-lg"
            />
        
           ) : (
            <div className="h-48 w-64 bg-gray-200 flex items-center justify-center">
              Image Not Available
            </div>
          )}


      <div
        className="flex flex-col gap-2 justify-center items-start px-4"
        style={{ marginBottom: "150px" }}
      >
        <h3 className="capitalize">{product.title || "Unknown Title"}</h3>
       
  
        <p>{product.description || "No description available"}</p>
        {/* ... */}
        <button
          className="flex items-center bg-[#4460e6] dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700"
          style={{ backgroundColor: "#4460e6" }}
          onClick={() => addToCart(id, userID)}
        >
          <FaShoppingBag className="mr-2" />
          Add to Cart
        </button>
      </div>
    </div>
  
    <ToastContainer />
  </section>
  
  );
};

export default ProductDetails;