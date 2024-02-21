import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductContext } from "../context/ProductContext";
const LandingPage = () => {
    const { products, fetchProducts } = useProductContext();
    const [divanSofaImage, setDivanSofaImage] = useState(null);


  return (
    <div className="min-h-[650px] flex justify-center items-center py-12" style={{ backgroundColor: "#2c569a"}}>
      <div className="container" >
        <div
          style={{ backgroundColor: "#2c569a" }}
          className="grid   grid-cols-1 md:grid-cols-3 gap-6 items-center text-white rounded-3xl" 
         
        >
          {/* first col */}
          <div className="p-6 sm:p-8">
            <p data-aos="slide-right" className="text-sm"  style={{color:"white"}}>
              heavy discount
            </p>
            <h1
              data-aos="zoom-out"
              className="uppercase text-white text-4xl lg:text-7xl font-bold "
              style={{color:"white"}}
            >
              Divan Sofa
            </h1>
            <p data-aos="fade-up" className="text-sm"  style={{color:"white"}}>
              made with love
            </p>
          </div>
          {/* second col */}
          <div data-aos="zoom-in" className="h-full flex items-center">
            
              
              <img
                src={""}
                alt="Divan Sofa"
                className="scale-125 w-[250px] md:w-[340px] mx-auto drop-shadow-[-10px_10px_12px_rgba(0,0,0,.6)] object-cover"
              />
        
          </div>
          {/* third col */}
          <div className="flex flex-col justify-center gap-4 p-6 sm:p-8">
            <p data-aos="zoom-out" className="font-bold text-xl" style={{color:"white"}}>
              Nothing can be more confortable
            </p>
            <p data-aos="fade-up" className="text-3xl sm:text-5xl font-bold text-white"  style={{color:"white"}}>
              Winter Sale
            </p>
            <p data-aos="fade-up" className="text-sm tracking-wide leading-5 text-white"  style={{color:"white"}}>
             This is made from most expensive and durable wood in nature, Nothng can be more confortable.
            </p>
            <div data-aos="fade-up" data-aos-offset="0">
            
            <Link to={""}>
                <button
                  style={{ color:"#4460e6" }}
                  className="bg-white py-2 px-4 rounded-full"
                >
                  Find More
                </button>
              </Link>
            </div>
            
          </div>
        
        </div>
      </div>
    </div>

    
  );
};

export default LandingPage;
