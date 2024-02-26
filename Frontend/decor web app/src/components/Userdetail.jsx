import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/dashboard.css";
import "../css/userdetail.css";

const Userdetail = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUserDetails();
  }, []); // Initial fetch on component mount

  const fetchUserDetails = () => {
    axios
      .get("http://localhost:8080/api/v2/users/all")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  };

  const handleRoleChange = (userId, currentRole) => {
    const updateRolesApiUrl = `http://localhost:8080/api/v2/users/edit/${userId}`;

    if (currentRole === 'admin') {
      toast.info('User is already an admin');
    } else {
      axios
        .patch(updateRolesApiUrl, { roles: 'admin' })
        .then((response) => {
          toast.success('User made admin successfully');
          fetchUserDetails();
        })
        .catch((error) => {
          toast.error('Error making user admin');
          console.error('Error making user admin:', error);
        });
    }
  };

  const handleDeleteUser = (userId) => {
    // Check if the user is the first user in the table
    if (userId === users[0]?.id) {
      toast.warn('Cannot delete the first user');
      return;
    }

    const deleteApiUrl = `http://localhost:8080/api/v2/users/delete/${userId}`;

    axios
      .delete(deleteApiUrl)
      .then((response) => {
        toast.success('User deleted successfully');
        fetchUserDetails();
      })
      .catch((error) => {
        toast.error('Error deleting user');
        console.error('Error deleting user:', error);
      });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white  sm:mt-[250px]" style={{ maxWidth: "800px",marginBottom:"400px"}}>

        <div className="overflow-x-auto border-x border-t">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Search by Username:</label>
            <input
              type="text"
              className="mt-1 p-2 border border-gray-300 rounded-md"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <table className="table-auto w-full" style={{ maxWidth: "800px" }}>
            <thead className="border-b bg-gray-100">
              <tr>
                <th className="text-left p-4 font-medium">Username</th>
                <th className="text-left p-4 font-medium">Email</th>
                <th className="text-left p-4 font-medium">Roles</th>
                <th className="text-left p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users
                .filter(user => user.username.toLowerCase().includes(searchTerm.toLowerCase()))
                .sort((a, b) => a.id - b.id)
                .map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">{user.username}</td>
                    <td className="p-4">{user.email}</td>
                    <td className="p-4">{user.roles}</td>
                    <td className="p-4">
                      <button
                        className="action-button rounded text-white bg-black p-1 w-18 mr-2"
                        onClick={() => handleRoleChange(user.id, user.roles)}
                      >
                        {user.roles === 'admin' ? 'Already Admin' : 'Make Admin'}
                      </button>
                      <button
                        className="action-button rounded text-white bg-red-500 p-1 w-18"
                        onClick={() => handleDeleteUser(user.id)}
                        disabled={user.id === users[0]?.id}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Toastify Notifications */}
        <ToastContainer position="bottom-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default Userdetail;
