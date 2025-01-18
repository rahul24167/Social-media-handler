import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminAuth = () => {
  const [cookie] = useState(
    document.cookie
      .split("; ")
      .find((row) => row.startsWith("login="))
      ?.split("=")[1]
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (cookie) {
      navigate("/");
    }
  }, [cookie]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signinHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:5000/api/v1/admin/auth/signin",
      { email, password },
      { withCredentials: true }
    );
    if (response.status === 200) {
      console.log(response.data);
      navigate("/dashboard");
    }
  };
  return (
    <div className="flex bg-slate-500">
      Signin
      <form onSubmit={signinHandler}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default AdminAuth;

