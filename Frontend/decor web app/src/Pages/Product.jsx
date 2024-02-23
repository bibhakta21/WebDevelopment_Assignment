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
         
          <form method="get" action="#" className="relative z-50">
            <button
              type="submit"
              id="searchsubmit"
              className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            <input
              type="text"
              name="s"
              id="s"
              value={searchQuery}
              onChange={handleSearchChange}
              className="block w-full pl-10 pr-3 py-2 border border-transparent
               rounded-md shadow-lg text-gray-300 placeholder-gray-400
                focus:outline-none bg-white  sm:text-sm "
              placeholder="Search Here.."
            />
          </form>
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
