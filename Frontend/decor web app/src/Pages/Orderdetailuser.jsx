import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../context/useAuthContext";
import { Link } from "react-router-dom";

const Orderdetailuser = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuthContext();

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/v2/orders/user/${user.id}`);
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <div className="container border-t mt-40 mb-8 flex justify-center items-center">
        <div className="max-w-full mx-auto rounded-md shadow-lg table-container overflow-x-auto bg-white">
          <table className="w-full">
            <thead>
              <tr className="">
                <th className="p-2">User</th>
                <th className="p-2">Number</th>
                <th className="p-2">Name</th>
                <th className="p-2">Quantity</th>
                <th className="p-2">Total Price</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td className="p-2">{order.username}</td>
                  <td className="p-2">{order.contactNumber}</td>
                  <td className="p-2" style={{color:"blue",textDecoration:"underline"}}>
                    <Link to={`/products/${order.productId}`}>{order.productTitle}</Link>
                  </td>
                  <td className="p-2 text-center">{order.quantity}</td>
                  <td className="p-2 text-center">{order.totalPrice}</td>
                  <td className="p-2">{order.status ? "Completed" : "Pending"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Orderdetailuser;
