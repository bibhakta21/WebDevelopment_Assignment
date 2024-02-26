import React from "react";
import Land from "../assets/land.png"
import "../css/dashboard.css";
import { Link } from "react-router-dom";
const DashboardContent = () => {
  return (
    <section className="flex flex-wrap items-center -mx-3 font-sans px-4 mx-auto w-full mt-20 lg:max-w-screen-lg sm:max-w-screen-sm md:max-w-screen-md pb-20">
    {/* Column-1 */}
    <div className="px-3 w-full lg:w-2/5">
      <div className="mx-auto mb-8 max-w-lg text-center lg:mx-0 lg:max-w-md lg:text-left">
        <h2 className="mb-4 text-large font-bold text-left lg:text-5xl">
          Decor
          <span className="text-5xl text-blue-500 leading-relaxed">
            Nepal
          </span>
        
        </h2>
        <p className="visible mx-0 mt-3 mb-0 text-sm leading-relaxed text-left text-slate-400">
          Revolizing the interior design technique
        </p>
      </div>

      <div className="text-center lg:text-left">
        <Link to="/dashboard/add"
          className="block visible py-4 px-8 mb-4 text-xs font-semibold tracking-wide leading-none text-white bg-blue-500 rounded cursor-pointer sm:mr-3 sm:mb-0 sm:inline-block"
        >
          Get Started
        </Link>
       
      </div>
    </div>

    {/* Column-2 */}
    <div className="px-3 mb-12 w-full lg:mb-0 lg:w-3/5">
      {/* Illustration Container */}
      <div className="flex justify-center items-center">
        <img
          className="block max-w-full h-auto align-middle lg:max-w-lg"
          src={Land}
          alt="Illustration"
        />
      </div>
    </div>
  </section>
  );
};

export default DashboardContent;
