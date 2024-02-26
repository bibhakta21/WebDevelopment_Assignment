import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa"; // Import social icons


const Footer = () => {
  return (
    <footer className="bg-[#4460e6]">
      <div className="w-[80%] footer-links ">
        <div className="">
          <h2 className="text-[22px] text-white mb-10">decorNepal</h2>
          <h6 className="text-white text-[15px] ">
            decorNepal is a website where you only find the best decor equipment
          </h6>
          <h6 className="text-white text-[15px] mt-3">
            decorNepal is a website where you only find the best decor equipment
          </h6>
        </div>
        <div className="w-full flex flex-col gap-3 justify-center items-start px-3">
          <h2 className="text-[22px] text-white">Browse</h2>
          <ul className="flex flex-col justify-center items-start gap-3">
            <li>
              <Link to="/" className="font-semibold text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="font-semibold text-white">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/contact" className="font-semibold text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div className="w-full flex flex-col gap-3 justify-center items-start px-3">
          <h2 className="text-[22px] text-white">Your Info</h2>
          <ul className="flex flex-col justify-center items-start gap-3">
            <li>
              <Link to="/orderdetailuser" className="font-semibold text-white">
                Your Orders
              </Link>
            </li>
            <li>
              <Link to="/userorder" className="font-semibold text-white">
               Your Cart
              </Link>
            </li>
            <li>
              <Link to="/user-profile" className="font-semibold text-white">
                Your Profile
              </Link>
            </li>
          </ul>
        </div>
        <div className="w-full flex flex-col gap-3 justify-center items-start px-2">
          <h2 className="text-[22px] mb-4 text-white">Follow Us</h2>
          <div className="w-full flex flex-row gap-3 items-center px-3 mb-12">
          <Link to="https://www.instagram.com/decornepal_/" target="_blank"> <FaFacebook size={30} color="white" /> </Link>
          <Link to="https://www.instagram.com/decornepal_/" target="_blank"> <FaInstagram size={30} color="white" /> </Link>
           <Link to="https://www.instagram.com/decornepal_/" target="_blank"> <FaTwitter size={30} color="white" /> </Link>
          <Link to="https://www.instagram.com/decornepal_/" target="_blank"><FaYoutube size={30} color="white" /> </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
