import React, {  useState } from "react";
import "../css/Navbar.css";
import { Link } from "react-router-dom";
import { useLogout } from "../context/useLogout";
import "../css/dashboard.css";


const DashboardHeader = () => {
    const [isNavOpen, setNavOpen] = useState(false);

    const toggleNav = () => {
      setNavOpen(!isNavOpen);
    };
    const { logout } = useLogout();

    const handleLogout = () => {
      // Dispatch the "LOGOUT" action to update the user state
      logout();
    };

  return (
    <navs className={isNavOpen ? 'navs-open' : ''}>
    <Link to="/"><div className="logo">Trek Nepal</div></Link>
    <div className="navs-items" style={{ marginRight: "100px" }}>
      <a href="/dashboard/add">Add</a> <a href="/dashboard/view">View</a> <a href="/dashboard/users">User</a> <a href="/dashboard/orders">Order</a> 
      <a href="/login" onClick={handleLogout}>Logout</a>
    </div>
    <div className="burger" onClick={toggleNav}>
      <div className="line"></div>
      <div className="line"></div>
      <div className="line"></div>
    </div>
  </navs>
  );
};

export default DashboardHeader;
