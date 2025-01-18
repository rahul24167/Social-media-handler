import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div>
      <Navbar className="sticky w-full bg-red-500"/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default RootLayout