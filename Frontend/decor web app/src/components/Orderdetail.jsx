import React, { useEffect, useState } from "react";
import axios from "axios";

const Orderdetail = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleCompleteClick = async (order) => {
    try {
      await axios.patch(
        `http://localhost:8080/api/v2/orders/update/${order.orderId}`,
        {
          status: !order.status,
        }
      );
      fetchOrders();
    } catch (e) {
      console.error("Error updating", e);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v2/orders/all");
      const filteredOrders = res.data.filter(order =>
        order.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
      filteredOrders.sort((a, b) => a.orderId - b.orderId);
      setOrders(filteredOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDeleteClick = async (orderId) => {
    try {
      const res = await axios.delete(
        `http://localhost:8080/api/v2/orders/delete/${orderId}`
      );

      if (res.status === 200) {
        fetchOrders(); // Refresh the orders after deletion
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };


  return (
    <>
      <div className="container border-t ml-8 mt-8 mb-8" style={{ maxWidth: "900px" }}>
        <div className="max-w-full mx-auto rounded-md shadow-lg table-container overflow-x-auto bg-white">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Search by Username:</label>
            <input
              type="text"
              className="mt-1 p-2 border border-gray-300 rounded-md"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">User</th>
                <th className="p-2">Number</th>
                <th className="p-2">Name</th>
                <th className="p-2">Quantity</th>
                <th className="p-2">Total Price</th>
                <th className="p-2">Status</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td className="p-2">{order.username}</td>
                  <td className="p-2">{order.contactNumber}</td>
                  <td className="p-2">{order.productTitle}</td>
                  <td className="p-2 text-center">{order.quantity}</td>
                  <td className="p-2 text-center">{order.totalPrice}</td>
                  <td className="p-2">{order.status ? "Completed" : "Pending"}</td>
                  <td className="p-2">
                    <button className="action-button rounded text-white bg-red-500 p-1 mr-2 w-auto" 
                    onClick={() => handleDeleteClick(order.orderId)}>
                      Delete
                    </button>
                    <button
                      className={`action-button rounded text-white bg-blue-500 p-1 w-auto`}
                      onClick={() => handleCompleteClick(order)}
                    >
                      {order.status ? "Completed" : "Pending"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Orderdetail;
