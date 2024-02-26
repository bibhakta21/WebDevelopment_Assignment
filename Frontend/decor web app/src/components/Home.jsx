import React from "react";
import Banner from "./Banner";
import Services from "./Services";
import LandingPage from "./LandingPage";
import ItemIcons from "./ItemIcons";
import Sale from "./Sale";
import SpecialProduct from "./SpecialProduct";

const Home = () => {
  return (
    <>
      <LandingPage />
      <ItemIcons />
      <Sale />
      <Services />
      <SpecialProduct />
      <Banner/>
    </>
  );
};

export default Home;
