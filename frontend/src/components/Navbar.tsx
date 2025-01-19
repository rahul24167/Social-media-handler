import { useNavigate,useLocation,matchPath } from "react-router-dom";

interface NavbarProps {
  className: string;
}
const Navbar = ({ className }: NavbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const logoutHandler = async () => {
    navigate("/signout");
  };
  const handleSignin = async () => {
    navigate("/user");
  };
  return (
    <div className={`${className} p-4 bg-gray-100 rounded-lg max-w-sm mx-auto`}>
  <div className="text-center">
    {(location.pathname == '/user' || matchPath('/admin/*', location.pathname)) ? (
      <div>
        <button 
          onClick={logoutHandler} 
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>
    ) : (
      <div>
        <button 
          onClick={handleSignin} 
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Sign in as User
        </button>
      </div>
    )}
  </div>
</div>

  );
};

export default Navbar;
