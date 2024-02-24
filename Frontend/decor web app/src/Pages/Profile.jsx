import React, { useContext, useEffect, useState } from "react";
import { useAuthContext } from "../context/useAuthContext";
import axios from "axios";
import { Link } from "react-router-dom";

const Userprofile = () => {
  const { user } = useAuthContext();

  return (
    <div className="mx-auto max-w-xl px-4 mt-[100px] mb-8">
      <div className="flex flex-col rounded-lg border border-gray-200 bg-white p-6">
        <div className="flex flex-col mb-4">
          <h2 className="text-lg font-semibold mb-2" style={{ textDecoration: "underline", fontFamily: "poppins" }}>Your Information</h2>
          <div className="text-lg font-semibold mb-2" style={{ fontFamily: "poppins" }}>Username:</div>
          <span className="text-gray-700">{user.username}</span>
        </div>
        <div className="flex flex-col mb-4">
          <div className="text-lg font-semibold mb-2" style={{ fontFamily: "poppins" }}>Email:</div>
          <span className="text-gray-700">{user.email}</span>
        </div>
        <div className="flex flex-row gap-3 mb-4">
          <Link to="/orderdetailuser" className="bg-[#4460e6] text-white py-2 px-4 rounded-md ">Your Orders</Link>
          <Link to="/userorder" className="bg-[#4460e6] text-white py-2 px-4 rounded-md ">Your Cart</Link>
          <Link to="/forgotpass" className="bg-[#4460e6] text-white py-2 px-4 rounded-md">Change Password</Link>
        </div>
      </div>
    </div>
  );
};

export default Userprofile;
