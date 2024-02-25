import React from "react";
import { AiOutlineDashboard, AiOutlinePlus, AiOutlineEye, AiOutlineUser,AiOutlineOrderedList, AiOutlineLogout } from 'react-icons/ai';
import { useAuthContext } from "../context/useAuthContext";
import {useLogout} from "../context/useLogout";
import "../css/dashboard.css";

const DashboardSidebar = () => {
  const { user } = useAuthContext();

  const { logout } = useLogout();

  const handleLogout = () => {
    // Dispatch the "LOGOUT" action to update the user state
    logout();
  };
  

  return (
    <div className="fixed flex flex-col top-14 left-0 w-14 hover:w-64 md:w-64 bg-[#4460e6]  h-full text-white transition-all duration-300 border-none z-10 sidebar">
    <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
      <ul className="flex flex-col py-4 space-y-1">
        <li className="px-5 hidden md:block">
          <div className="flex flex-row items-center h-8">
            <div className="text-sm font-light tracking-wide text-gray-400 uppercase">Hi, {user.username}</div>
          </div>
        </li>
        <li>
          <a href="/dashboard" className="relative flex flex-row items-center h-11 focus:outline-none   text-white-600  border-l-4 border-transparent  dark:hover:border-red-800 pr-6">
          <span className="inline-flex justify-center items-center ml-4">
                <AiOutlineDashboard className="w-5 h-5" />
              </span>
            <span className="ml-2 text-sm tracking-wide truncate">Dashboard</span>
          </a>
        </li>
        <li>
          <a href="/dashboard/add"  className="relative flex flex-row items-center h-11 focus:outline-none   text-white-600  border-l-4 border-transparent  dark:hover:border-red-800 pr-6">
          <span className="inline-flex justify-center items-center ml-4">
                <AiOutlinePlus className="w-5 h-5" />
              </span>
            <span className="ml-2 text-sm tracking-wide truncate">Add Product</span>
         
          </a>
        </li>
        <li>
          <a href="/dashboard/view"  className="relative flex flex-row items-center h-11 focus:outline-none   text-white-600  border-l-4 border-transparent  dark:hover:border-red-800 pr-6">
          <span className="inline-flex justify-center items-center ml-4">
                <AiOutlineEye className="w-5 h-5" />
              </span>
            <span className="ml-2 text-sm tracking-wide truncate">View Product</span>
          </a>
        </li>
        <li>
          <a href="/dashboard/users" className="relative flex flex-row items-center h-11 focus:outline-none   text-white-600  border-l-4 border-transparent  dark:hover:border-red-800 pr-6">
          <span className="inline-flex justify-center items-center ml-4">
                <AiOutlineUser className="w-5 h-5" />
              </span>
            <span className="ml-2 text-sm tracking-wide truncate">Users</span>
            
          </a>
        </li>
       
        <li>
          <a href="/dashboard/orders"  className="relative flex flex-row items-center h-11 focus:outline-none   text-white-600  border-l-4 border-transparent  dark:hover:border-red-800 pr-6">
          <span className="inline-flex justify-center items-center ml-4">
                <AiOutlineOrderedList className="w-5 h-5" />
              </span>
            <span className="ml-2 text-sm tracking-wide truncate">Orders</span>
            
          </a>
        </li>
       
       

        <li>
          <a href="#"  className="relative flex flex-row items-center h-11 focus:outline-none   text-white-600  border-l-4 border-transparent  dark:hover:border-red-800 pr-6">
          <span className="inline-flex justify-center items-center ml-4">
                <AiOutlineLogout className="w-5 h-5" />
              </span>
            <span className="ml-2 text-sm tracking-wide truncate" onClick={handleLogout}>Logout</span>
          </a>
        </li>
      </ul>
    
    </div>
  </div>
  );
};

export default DashboardSidebar;
