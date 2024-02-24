// ForgotPass.js

import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "../context/useLogout";

const ForgotPass = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [securityCode, setSecurityCode] = useState(""); // Add state for security code
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { logout } = useLogout();

    
  const handleLogout = () => {
    // Dispatch the "LOGOUT" action to update the user state
    logout();
  };

    const handleForgotPassword = async (e) => {
        e.preventDefault();

        if (newPassword.length <= 7) {
            setErrorMessage("Password should be more than 7 characters.");
            setTimeout(() => {
              navigate("/");
          }, 1000);
            return;
        }

        try {
            // Make the API call to update the password
            const response = await axios.put("http://localhost:8080/api/v2/users/forgot-password", {
                email,
                newPassword,
                securityCode // Include security code in the request
            });

            if (response.status === 200) {
                setSuccessMessage("Password updated successfully");

                // Clear the form fields
                setEmail("");
                setNewPassword("");
                setSecurityCode("");
                handleLogout();

                setTimeout(() => {
                    navigate("/login");
                }, 1000);
            }
        } catch (error) {
            const errorMessage = error?.response?.data?.message || "An error occurred.";
            setErrorMessage(errorMessage);
            setTimeout(() => {
              setErrorMessage(""); // Clear error message after 1 second
          }, 1000);
        }
    };

    return (
        <>
            <div className="bg-gray-100 flex items-center justify-center mt-[90px] mb-2">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                    <h2 className="text-2xl font-semibold text-center mb-4">Forgot Password?</h2>
                    <p className="text-gray-600 text-center mb-6">Enter your email to recover.</p>
                    {successMessage && (
                        <div className="mt-4 mb-4 p-2 bg-green-200 text-green-800 rounded">{successMessage}</div>
                    )}
                    {errorMessage && (
                        <div className="mt-4 mb-4 p-2 bg-red-200 text-red-800 rounded">{errorMessage}</div>
                    )}
                    <form onSubmit={handleForgotPassword}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
                                Email Address *
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                                required
                                placeholder="hello@alignui.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="newPassword" className="block text-gray-700 text-sm font-semibold mb-2">
                                Change Password *
                            </label>
                            <input
                                type="password"
                                id="newPassword"
                                className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                                required
                                placeholder="••••••••"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
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
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            Reset Password
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ForgotPass;
