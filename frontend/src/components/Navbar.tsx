import { useNavigate,useLocation } from "react-router-dom";


interface NavbarProps {
  className: string;
}
const Navbar = ({ className }: NavbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const logoutHandler = async () => {
    navigate("/signout");
  };
  const navigateSignin = async () => {
    navigate("/user");
  };
  return (
    <div className={className}>  
      <div>
        {(location.pathname=='/user' || location.pathname=='/admin') ? (
          <div>
            <button onClick={logoutHandler}>signout</button>
          </div>
        ) : (
          <div>
            <button onClick={navigateSignin}>signin as User </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
