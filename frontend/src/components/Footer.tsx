import { useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();
  const handelClick = () => {
    navigate("/admin/auth");
  };
  return (
    <div className="bg-blue-400">
      <div>
        <button onClick={handelClick}>Login as Admin</button>
      </div>
    </div>
  );
};

export default Footer;
