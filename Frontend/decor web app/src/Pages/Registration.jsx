import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
 

  return (
    <>
      <div className="bg-gray-100 flex items-center justify-center mt-[90px] mb-2">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full" style={{ maxWidth: "550px" }}>
          <h2 className="text-2xl font-semibold text-center mb-4">Create a new account</h2>
          <p className="text-gray-600 text-center mb-6">Enter your details to register.</p>
     
            </div>
       
            </div>
        
          <form>
            <div className="flex flex-row gap-3">
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700 text-sm font-semibold mb-2">
                  User Name *
                </label>
                <input
                  type="text"
                  id="username"
                  className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                  required
                  placeholder="Bibhakta45"
                 
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                  required
                  placeholder="bibhakta8@gmail.com"
                
                />
              </div>
            </div>
            <div className="flex flex-row gap-3">
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
                  Password *
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                  required
                  placeholder="••••••••"
                 
                />
              </div>
              <div className="mb-6">
                <label htmlFor="securityCode" className="block text-gray-700 text-sm font-semibold mb-2">
                  Security Code*
                </label>
                <input
                  type="text"
                  id="securityCode"
                  className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                  required
                  placeholder="Enter your security code"
                  value={securityCode}
                  onChange={(e) => setSecurityCode(e.target.value)}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Register
            </button>
            <p className="text-gray-600 text-xs text-center mt-4">
              Already Have An Account? <Link to="/login" className="text-blue-500 hover:underline">Sign in</Link>.
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
