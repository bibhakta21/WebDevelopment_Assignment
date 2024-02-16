import { Routes, Route,} from "react-router-dom";

//All Homepage user and admin both
import Home from "./components/Home";
import Navigation from "./components/Navbar";
import Footer from "./components/Footer";





function App() {





  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
       
      </Routes>
       <Footer />
    </>
  );
}

export default App;
