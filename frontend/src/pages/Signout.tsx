import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
const Signout = () => {
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}api/v1/logout`);
      if (response.status !== 200) {
        alert("Error during logout");
        return;
      }
      navigate("/signout");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("An error occurred during logout");
    }
  };

  useEffect(() => {
    logoutHandler();
  }, []);
  return (
    <div>Signout</div>
  )
}

export default Signout