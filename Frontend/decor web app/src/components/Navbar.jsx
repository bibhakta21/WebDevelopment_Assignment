
// export default Navigation;
import React, { useState } from 'react';
import { FiShoppingCart, FiUser } from 'react-icons/fi';
import { useAuthContext } from "../context/useAuthContext";
import { useLogout } from "../context/useLogout";
import { Link } from 'react-router-dom';
import "../css/navnew.css";

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
    <nav className="fixed top-0 left-0 right-0 z-10  flex items-center shadow-lg bg-[#4460e6] p-3 flex-wrap">
      <a href="#" className="p-2 mr-4 inline-flex items-center">
        <span className="text-xl text-white font-bold  tracking-wide">
          decorNepal
        </span>
      </a>
      <button
        className="text-white text-bold inline-flex p-3 hover:bg-gray-900 rounded lg:hidden ml-auto hover:text-white outline-none nav-toggler"
        onClick={handleNavToggle}
      >
        <i className="material-icons"><FiMenu/></i>
      </button>
      <div
        className={`${
          isNavOpen ? 'block' : 'hidden'
        } top-navbar w-full lg:inline-flex lg:flex-grow lg:w-auto`}
        id="navigation"
      > 
      
        <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start flex flex-col lg:h-auto justify-center">
          <div className='' style={{paddingRight:"300px"}}>
          {user && user.roles === "admin" ? (
            <Link to="/dashboard"
              
              className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center  hover:text-white"
            >
              <span className='text-white'>Dashboard</span>
            </Link>
          ) : null}
        
            <Link to="" className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center  hover:text-white">
              <span className='text-white'>Home</span>
            </Link>
          
           <Link to="/products"
            className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center  hover:text-white"
          >
            <span className='text-white'>Products</span>
          </Link>

          <Link to="/sofa"
            className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center  hover:text-white"
          >
            <span className='text-white'>Sofa</span>
          </Link>
          <Link to="/table"
            className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center  hover:text-white"
          >
            <span className='text-white'>Decor</span>
          </Link>
          </div>

         
          {user ? (
            <button
              onClick={handleLogout}
              className="lg:inline-flex lg:w-auto w-full  py-2 rounded text-gray-400 items-center justify-center"
            >
              <span className='login-btn text-white'>Logout</span>
            </button>
          ) : (
            <Link to="/login"
              className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center"
            >
              <span className='login-btn text-white'>Register/Login</span>
            </Link>
          )}
          {user && (
            <div className="group">
           <Link to="/user-profile">
            <button className="flex items-center justify-center font-bold gap-1 text-white">
              <FiUser className="text-white h-6 w-6 ml-4 cursor-pointer" />
            </button>
        </Link>
        </div>
          )}
          {user && (
           <Link to="/userorder"><FiShoppingCart className="text-white h-6 w-6 ml-4 cursor-pointer" /></Link>
          )}
        </div>
      </div>
    </nav>
    </>
  );
};

export default Navigation;
