import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [securityCode, setSecurityCode] = useState(""); // New state for security code
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !securityCode) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (username.length <= 5 || !/\d/.test(username)) {
      setErrorMessage("Username should be more than 5 characters and have at least one number.");
      return;
    }

    const emailRegex = /^[^\s@]+@gmail\.com$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please use a valid Gmail address.");
      return;
    }

    if (password.length <= 6) {
      setErrorMessage("Password should be more than 6 characters.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/v2/users/register", {
        username,
        email,
        password,
        securityCode, // Include security code in the request body
      });

      if (response.status === 201) {
        setSuccessMessage("Sign Up Successful. Please login!");
        setUsername("");
        setEmail("");
        setPassword("");
        setSecurityCode(""); // Clear security code after successful registration

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "An error occurred.";
      setErrorMessage(errorMessage);
    }
  };

  return (
    <>
      <div className="bg-gray-100 flex items-center justify-center mt-[90px] mb-2">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full" style={{ maxWidth: "550px" }}>
          <h2 className="text-2xl font-semibold text-center mb-4">Create a new account</h2>
          <p className="text-gray-600 text-center mb-6">Enter your details to register.</p>
          {successMessage && (
            <div className="mt-4 mb-4 p-2 bg-green-200 text-green-800 rounded">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="mt-4 mb-4 p-2 bg-red-200 text-red-800 rounded">
              {errorMessage}
            </div>
          )}
          <form onSubmit={handleRegister}>
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
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
