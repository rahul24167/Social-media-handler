import { useState } from "react";
import axios from "axios";
import { useDebounce } from "../hooks/useDebounce";
import { BACKEND_URL } from "../config";

type User = {
  _id: string;
  name: string;
  socialHandle: string;
  images: string[];
};

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");

  const changePage = (change: number) => {
    if (page + change > 0) {
      setPage((prev) => prev + change);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get<{ users: User[] }>(
        `${BACKEND_URL}api/v1/admin/users`,
        {
          params: { name, page },
          withCredentials: true,
        }
      );
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useDebounce(fetchUsers, [name, page], 500);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Search Section */}
      <div className="mb-6">
        <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
          Search by name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter name"
        />
      </div>

      {/* Pagination Section */}
      <div className="flex justify-center gap-2 mb-6">
        <button
          onClick={() => changePage(-1)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Previous Page
        </button>
        <span className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">
          Page {page}
        </span>
        <button
          onClick={() => changePage(1)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Next Page
        </button>
      </div>

      {/* Users Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <div key={user._id} className="p-4 bg-white shadow rounded-lg">
            <div className="text-lg font-semibold text-gray-800">
              {user.name}
            </div>
            <div className="text-sm text-gray-500 mb-4">
              @{user.socialHandle}
            </div>
            <div className="grid grid-cols-3 gap-2">
              {user.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Image ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg border"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;

