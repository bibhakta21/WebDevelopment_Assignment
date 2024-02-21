import React from "react";
import img1 from "../assets/icon-1.png";
import img2 from "../assets/icon-2.png";
import img3 from "../assets/icon-3.png";
import img4 from "../assets/icon-4.png";
import img5 from "../assets/icon-5.png";
import img6 from "../assets/icon-6.png";
import img7 from "../assets/icon-7.png";

const ItemIcons = () => {
  return (
    <section className="banner__1">
    <div className="section__container banner__1__container">
      <div className="icon">
        <img src={img1} alt="icon" />
        <span>SOFA</span>
      </div>
      <div className="icon">
      <img src={img2} alt="icon" />
        <span>CHAIR</span>
      </div>
      <div className="icon">
      <img src={img3} alt="icon" />
        <span>MINI TABLE</span>
      </div>
      <div className="icon">
      <img src={img4} alt="icon" />
        <span>LAMP</span>
      </div>
      <div className="icon">
      <img src={img5} alt="icon" />
        <span>TABLE</span>
      </div>
      <div className="icon">
      <img src={img6} alt="icon" />
        <span>DINING</span>
      </div>
      <div className="icon">
      <img src={img7} alt="icon" />
        <span>BED</span>
      </div>
    </div>
  </section>

  );
};

export default ItemIcons;
