import React, { useState, useEffect } from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import axios from 'axios';
import { useAuthContext } from "../context/useAuthContext";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserOrder = () => {
  const { user } = useAuthContext();
  const userId = user ? user.id : null;
  const [cart, setCart] = useState([]);
  const [contactNumber, setContactNumber] = useState('');

  const handleIncreaseQuantity = async (cartId, quantity) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/api/v2/carts/update/${cartId}`,
        { newQuantity: quantity + 1 }
      );
      if (response.status === 200) {
        fetchCart();
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const handleDecreaseQuantity = async (cartId, quantity) => {
    if (quantity > 1) {
      try {
        const response = await axios.patch(
          `http://localhost:8080/api/v2/carts/update/${cartId}`,
          { newQuantity: quantity - 1 }
        );
        if (response.status === 200) {
          fetchCart();
        }
      } catch (error) {
        console.error("Error updating cart:", error);
      }
    }
  };

  const handleRemoveCartItem = async (cartId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v2/carts/delete/${cartId}`
      );
      if (response.status === 200) {
        fetchCart();
      }
    } catch (error) {
      console.error("Error deleting cart:", error);
    }
  };

  const fetchCart = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/v2/carts/get-by-user/${userId}`);
      
      const cartWithImages = res.data.map(async (cartItem) => {
        const productResponse = await axios.get(`http://localhost:8080/api/v2/products/${cartItem.productId}`);
        const product = productResponse.data;

        return {
          ...cartItem,
          productImage: product.base64Image,
        };
      });

      const cartItemsWithImages = await Promise.all(cartWithImages);
      cartItemsWithImages.sort((a, b) => a.productId - b.productId);

      setCart(cartItemsWithImages);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [userId]);

  const handleCheckout = async () => {
    if (cart.length === 0) {
      toast.error('Cart is empty. Add items to your cart before checkout.', { position: 'top-center', autoClose: 3000 });
      return;
    }
    if (!contactNumber.trim() || contactNumber.trim().length < 10) {
      toast.error('Please enter a valid contact number (at least 10 characters).', { position: 'top-center', autoClose: 3000 });
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:8080/api/v2/orders/create', {
        orderDate: Date.now(),
        contactNumber,
        cartItems: cart,
      });
  
      if (response.status === 200) {
        toast.success('Order placed successfully!', { position: 'top-center', autoClose: 3000 });
        setCart([]);
        setContactNumber('');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      toast.error('Error during checkout. Please try again later.', { position: 'top-center', autoClose: 3000 });
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <div className="mx-auto max-w-5xl justify-center px-6 md:px-0">
        <div className="md:flex mb-6">
          <div className="md:w-2/3 mb-6 md:mb-0">
            {cart.map((cartItem) => (
              <div key={cartItem.cartId}>
                <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
                  <div className="text-center md:text-left">
                    <Link to=""><h2 className="text-lg font-bold text-gray-900">{cartItem.title}</h2></Link>
                    <img
                      className='w-[100px] h-[100px]'
                      src={`data:image/png;base64, ${cartItem.productImage}`}
                      alt={`product-${cartItem.productId}`}
                    />
                    <p className="mt-1 text-xs text-gray-700">{`Rs ${cartItem.price}`}</p>
                  </div>
                  <div className="mt-4 flex justify-center md:justify-between md:space-x-6">
                    <div className="flex items-center border-gray-100">
                      <button
                        type="button"
                        className="text-indigo-600 hover:text-indigo-500"
                        onClick={() => handleDecreaseQuantity(cartItem.cartId, cartItem.quantity)}
                      >
                        -
                      </button>
                      <span className="mx-2">{cartItem.quantity}</span>
                      <button
                        type="button"
                        className="text-indigo-600 hover:text-indigo-500"
                        onClick={() => handleIncreaseQuantity(cartItem.cartId, cartItem.quantity)}
                      >
                        +
                      </button>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button
                        type="button"
                        className="font-medium hover:text-indigo-500"
                        style={{ color: 'black' }}
                        onClick={() => handleRemoveCartItem(cartItem.cartId)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
             <p  className="text-sm text-gray-700">1. We only offer cash on delivery</p>
             <p  className="text-sm text-gray-700">2. Please Only Enter Valid Phone number</p>
             <p  className="text-sm text-gray-700">3. We will call you before order placement so dont worry</p>
               <Link to="/orderdetailuser"> <p  className="text-[20px] text-gray-700  cursor-pointer"
                style={{textDecoration:"underline"}}>Your Orders </p></Link>
          </div>

          <div className="w-full md:w-1/3 ml-4">
            <div className="rounded-lg border bg-white p-6 shadow-md">
              <div className="mb-2 flex justify-between">
                <p className="text-gray-700">Subtotal</p>
              </div>
              <div className="mb-2 flex justify-between">
                <p className="text-gray-700">Tel No:</p>
                <input
                  type="tel"
                  className="border rounded p-1 text-gray-700"
                  placeholder="Enter contact number"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                />
              </div>
              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-lg font-bold">Total</p>
                <div className="">
                  <p className="mb-1 text-lg font-bold">
                    Rs  {cart.reduce((total, cartItem) => total + cartItem.total, 0)}
                  </p>
                </div>
              </div>
              <p  className="text-sm text-gray-700">Including Shipping Charge: Rs 70</p>
              <button
                className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
                onClick={handleCheckout}
              >
                Check out
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserOrder;
