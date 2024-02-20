import React, { useState } from "react";
import { Link } from "react-router-dom";


const Login = () => {
  

  return (
    <>
      <div className="bg-gray-100 flex items-center justify-center mt-[90px] mb-2">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm">
          <h2 className="text-2xl font-semibold text-center mb-4">Login to your account</h2>
          <p className="text-gray-600 text-center mb-6">Enter your details to login.</p>
          <form>
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
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
                Password *
              </label>
              <input
                type="password"
                id="password"
                className="form-input w-full px-4 py-2 mb-3 border rounded-lg text-gray-700 focus:ring-blue-500"
                required
                placeholder="••••••••"
              />
              <Link to="/" className="text-blue-500 hover:underline">
                {" "}
                Forgot password?
              </Link>
              .
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Login
            </button>
            <p className="text-gray-600 text-xs text-center mt-4">
              Don't Have An Account?
              <Link to="/" className="text-blue-500 hover:underline">
                {" "}
                Sign up
              </Link>
              .
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
