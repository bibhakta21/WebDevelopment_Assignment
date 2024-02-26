import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

//All Homepage user and admin both
import Home from "./components/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Registration";
import ForgotPass from "./Pages/ForgotPass";
import Navigation from "./components/Navbar";
import Footer from "./components/Footer";
import Product from "./Pages/Product";
import ProductDetails from "./Pages/ProductDetails";
import Sofa from "./Pages/Sofa";
import Chair from "./Pages/Chair";
import Table from "./Pages/Table";

import Userprofile from "./Pages/Profile";
import Orderdetail from "./components/Orderdetail";
import Orderdetailuser from "./Pages/Orderdetailuser";

//Error page ko lagi
import Errorpage from "./components/Errorpage";

// dashboard ko lagi
import Dashboard from "./Pages/Dashboard";
import DashboardContent from "./components/DashboardMain";
import Userdetail from "./components/Userdetail";
import Addproduct from "./components/Addproduct";
import ViewProducts from "./components/ViewProducts";
import Userorder from "./Pages/Userorder";  //
import { useAuthContext } from "./context/useAuthContext";



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
      {showNavigation && <Navigation />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Product />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/sofa" element={<Sofa />} />
        <Route path="/chair" element={<Chair />} />
        <Route path="/table" element={<Table />} />
        <Route path="/forgotpass" element={<ForgotPass />} />
        <Route path="/user-profile" element={<Userprofile />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
        <Route path="/userorder" element={<Userorder />} />
        <Route path="/orderdetailuser" element={<Orderdetailuser />} />


        {/* error page ko lagi route */}
        <Route path="*" element={<Errorpage />} />


        {user && user.roles === "admin" ? (
          <Route path="/dashboard/*" element={<Dashboard />}>
            <Route index element={<DashboardContent />} />
            <Route path="orders" element={<Orderdetail />} />
            <Route path="users" element={<Userdetail />} />
            <Route path="add" element={<Addproduct />} />
            <Route path="view" element={<ViewProducts />} />
          </Route>
        ) : (
          <Route path="/dashboard/*" element={<Errorpage />} />
        )}
      </Routes>
      {showNavigation && <Footer />}
    </>
  );
}

export default App;
