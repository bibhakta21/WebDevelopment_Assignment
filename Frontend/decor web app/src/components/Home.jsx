import React from "react";
import LandingPage from "./LandingPage";
import ItemIcons from "./ItemIcons";
import Services from "./Services";
import SpecialProduct from "./SpecialProduct";
import Banner from "./Banner";


const Home = () => {
  return (
    <>
      <LandingPage />
      <ItemIcons />
      <Services />
      <SpecialProduct />
      <Banner/>
    </>
  );
};

export default Home;
