import React, { useEffect, useState } from "react";
import { FaShoppingBag } from "react-icons/fa";
import { useProductContext } from "../context/ProductContext";
import { useAuthContext } from "../context/useAuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addToCart } from "../components/AddToCart";
import { Link } from "react-router-dom";

const Product = () => {
  const { products, fetchProducts } = useProductContext();
  useEffect(() => {
    fetchProducts();
  }, []);

  const { user } = useAuthContext();
  const userID = user ? user.id : null;

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="flex-1 flex  px-2 lg:ml-6 lg:justify-end" style={{ marginTop: "80px" }}>
        <div className="max-w-lg w-full lg:max-w-xs">
        
        </div>
      </div>
      <div className="flex flex-wrap gap-6 mt-10 mb-10" style={{ paddingLeft: "20px", paddingTop: "5px", paddingRight: "5px" }}>
        {filteredProducts.map((product) => (
          <div key={product.productId} className="w-64 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl py-6 ml-4">
            {product.base64Image ? (
              <Link to={`/products/${product.productId}`}>
                <img
                  src={`data:image/png;base64, ${product.base64Image}`}
                  alt="Product"
                  className="h-48 w-64 object-cover rounded-t-xl"
                />
              </Link>
            ) : (
              <div className="h-48 w-64 bg-gray-200 flex items-center justify-center">
                Image Not Available
              </div>
            )}
            <div className="px-4 py-3 w-64">
              <span className="text-gray-400 mr-3 uppercase text-xs">
                {product.authorName}
              </span>
              <p className="text-lg font-bold text-black truncate block capitalize">
                {product.title}
              </p>
              <div className="flex items-center">
                <p className="text-lg font-semibold text-black cursor-auto my-3">
                  Rs{product.price.toFixed(2)}
                </p>
                <div className="ml-auto mt-2">
                  <button
                    className="flex items-center justify-center bg-blue-500 text-white rounded-full p-2 focus:outline-none hover:bg-blue-600"
                  >
                    <FaShoppingBag size={20} color="currentColor" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </>
  );
};

export default Product;
