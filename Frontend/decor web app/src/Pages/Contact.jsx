import React from "react";
import { FiGlobe, FiPhone, FiMail, FiClock } from 'react-icons/fi';


const Contact = () => {
  return (
    <>
       <div className="bg-gray-100 mt-20 mb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-[#4460e6] font-semibold tracking-wide uppercase text-[40px]">Contact Us</h2>
          {/* <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            DecorNepal  Store
          </p> */}
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto" style={{marginLeft:"300px"}}>
          Welcome to Decor Nepal, the brainchild of Softwarica College student Bibhakta Lamsal.
        
          </p>
        </div>

        <div className="mt-10" style={{marginLeft:"200px"}}>
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {/* Address */}
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center bg-[#4460e6] h-12 w-12 rounded-md  text-white">
                  <FiGlobe className="w-6 h-6" />
                </div>
              </div>
              <div className="ml-4">
                <dt className="text-lg leading-6 font-medium text-gray-900">
                  Address
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  Dillibazar<br />
                  Kathmandu,Nepal
                </dd>
              </div>
            </div>

            {/* Phone number */}
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#4460e6] text-white">
                  <FiPhone className="w-6 h-6" />
                </div>
              </div>
              <div className="ml-4">
                <dt className="text-lg leading-6 font-medium text-gray-900">
                  Phone number
                </dt>
                <a href="tel:9813056161" className="text-blue-500">
                <dd className="mt-2 text-base text-gray-500">
                  9813056161
                </dd>
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#4460e6] text-white">
                  <FiMail className="w-6 h-6" />
                </div>
              </div>
              <div className="ml-4">
                <dt className="text-lg leading-6 font-medium text-gray-900">
                  Email
                </dt>
                <a href="mailto:decorNepal@gmail.com"><dd className="mt-2 text-base text-gray-500">
                  decorNepal@gmail.com
                </dd>
                </a>
              </div>
            </div>

            {/* Store Hours */}
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#4460e6] text-white">
                  <FiClock className="w-6 h-6" />
                </div>
              </div>
              <div className="ml-4">
                <dt className="text-lg leading-6 font-medium text-gray-900">
                  Store Hours
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  Monday - Friday: 9am to 5pm<br />
                  
                </dd>
              </div>
            </div>
          </dl>
        </div>
      </div>
    </div>
    </>
  );
};

export default Contact;
