import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

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
      `${BACKEND_URL}api/v1/admin/auth`,
      { email, password }
    );
    if (response.status === 200) {
      console.log(response.data);
      navigate("/admin/dashboard");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screenp-6">
      <h1 className="text-2xl font-bold text-white mb-6">Signin</h1>
      <form
        onSubmit={signinHandler}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default AdminAuth;
