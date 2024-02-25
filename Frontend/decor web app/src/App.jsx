import { Routes, Route,useLocation, useNavigate } from "react-router-dom";

//All Homepage user and admin both
import Home from "./components/Home";
import Navigation from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./Pages/Login";
import Register from "./Pages/Registration";
import Product from "./Pages/Product";
import Sofa from "./Pages/Sofa";
import Chair from "./Pages/Chair";
import Table from "./Pages/Table";
import Userprofile from "./Pages/Profile";
import ForgotPass from "./Pages/ForgotPass";
import ProductDetails from "./Pages/ProductDetails";
import Userorder from "./Pages/Userorder";
import Orderdetailuser from "./Pages/Orderdetailuser";

import Dashboard from "./Pages/Dashboard";
import DashboardContent from "./components/DashboardMain";





function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine whether to show the Navigation component based on the current route
  const showNavigation = !location.pathname.startsWith("/dashboard");
  const { user } = useAuthContext();

  const redirect = () => {
    // Dispatch the "LOGOUT" action to update the user state
    navigate("/");
  };





  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Product />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/sofa" element={<Sofa />} />
        <Route path="/chair" element={<Chair />} />
        <Route path="/table" element={<Table />} />
        <Route path="/user-profile" element={<Userprofile />} />
        <Route path="/forgotpass" element={<ForgotPass />} />
        <Route path="/userorder" element={<Userorder />} />
        <Route path="/orderdetailuser" element={<Orderdetailuser />} />


        {user && user.roles === "admin" ? (
          <Route path="/dashboard/*" element={<Dashboard />}>
            <Route index element={<DashboardContent />} />
          </Route>
        ) : (
          <Route path="/dashboard/*" element={<Home />} />
        )}
       
      </Routes>
       <Footer />
    </>
  );
}

export default App;
