
// export default Navigation;
import React, { useState } from 'react';
import { FiShoppingCart, FiUser, FiLogOut} from 'react-icons/fi';
import { useAuthContext } from "../context/useAuthContext";
import { useLogout } from "../context/useLogout";
import { Link } from 'react-router-dom';

import { FiMenu } from 'react-icons/fi';

const Navigation = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const handleLogout = () => {
    // Dispatch the "LOGOUT" action to update the user state
    logout();
  };

  const [isNavOpen, setNavOpen] = useState(false);

  const handleNavToggle = () => {
    setNavOpen(!isNavOpen);
  };

  return (
    <>
    <nav className="fixed top-0 left-0 right-0 z-10  flex items-center shadow-lg bg-[#0766AD] p-3 flex-wrap">
      {/* Logo */}
      <a href="/" className="p-2 mr-4 inline-flex items-center">
        <span className="text-xl text-white font-bold tracking-wide">
          decorNepal
        </span>
      </a>
      {/* Mobile Menu Button */}
      <button
        className="text-white text-bold inline-flex p-3 hover:bg-gray-900 rounded lg:hidden ml-auto hover:text-white outline-none nav-toggler"
        onClick={handleNavToggle}
      >
        <FiMenu />
      </button>
      {/* Navigation Links */}
      <div
        className={`${
          isNavOpen ? 'block' : 'hidden'
        } top-navbar w-full lg:inline-flex lg:flex-grow lg:w-auto`}
        id="navigation"
      >
        {/* Links for larger screens */}
        <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start gap-6  flex flex-col lg:h-auto justify-center">
          {/* Dashboard link for admin */}
          {user && user.roles === "admin" && (
            <Link to="/dashboard" className="nav-link text-white">
              Dashboard
            </Link>
          )}
          {/* Other links */}
          <Link to="/" className="nav-link text-white">
            Home
          </Link>
          <Link to="/products" className="nav-link text-white">
            Products
          </Link>
          <Link to="/sofa" className="nav-link text-white">
            Sofa
          </Link>
          <Link to="/table" className="nav-link text-white">
            Decor
          </Link>
        </div>
        {/* Login/Logout and User Profile links */}
        <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start gap-3 flex flex-col lg:h-auto justify-center">
          {user ? (
            <button
            onClick={handleLogout}
            className="nav-link text-white"
            title="Logout" // This text will be displayed on hover
          >
            <FiLogOut className="text-white h-6 w-6 ml-4 cursor-pointer" />
          </button>
          ) : (
            <Link to="/login" className="nav-link text-white border-2 p-[4px] rounded-lg hover-bg-grey-300">
              Register/Login
            </Link>
          )}
          {user && (
            <Link to="/user-profile" className="nav-link">
              <FiUser   title="view profile" className="text-white h-6 w-6 ml-4 cursor-pointer" />
            </Link>
          )}
          {user && (
            <Link to="/userorder" className="nav-link">
              <FiShoppingCart   title="view cart"  className="text-white h-6 w-6 ml-4 cursor-pointer" />
            </Link>
          )}
        </div>
      </div>
    </nav>
  </>
);
};

export default Navigation;