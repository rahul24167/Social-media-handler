import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div>
      <Navbar className="sticky"/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default RootLayout