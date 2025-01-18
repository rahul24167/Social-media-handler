import { useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();
  const handelClick = () => {
    navigate("/admin/auth");
  };
  return (
    <div className="bg-blue-400 p-6 rounded-lg max-w-sm mx-auto shadow-md">
    <div className="text-center">
      <button 
        onClick={handelClick} 
        className="px-4 py-2 bg-white text-blue-500 font-semibold rounded-lg shadow hover:bg-blue-500 hover:text-white transition duration-300"
      >
        Login as Admin
      </button>
    </div>
  </div>
  );
};

export default Footer;
