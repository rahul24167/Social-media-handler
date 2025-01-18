import { useState } from "react";
import axios from "axios";
import { useDebounce } from "../hooks/useDebounce";
import { BACKEND_URL } from "../config";
type User = {
  name: string;
  socialHandle: string;
  images: File[];
};
const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const changePage = ({ change }: any) => {
    if (page + change > 0) {
      setPage((prev) => prev + change);
    }
  };
  const fetchUsers = async () => {
    const response = await axios.post<{ data: Object[] }>(
      `${BACKEND_URL}api/v1/admin/users?name=${name}&page=${page}`
    );
    setUsers(response.data.data as User[]);
  };
  useDebounce(fetchUsers, [name, page], 500);
  return (
    <div>
      <div>
        <label htmlFor="name">
          Search by name
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </label>
      </div>
      <div>
        <button onClick={() => changePage(-1)}>Previous Page</button>
        <button onClick={() => changePage(1)}>{page + 1}</button>
        <button onClick={() => changePage(2)}>{page + 2}</button>
        <button onClick={() => changePage(3)}>{page + 3}</button>
        <button onClick={() => changePage(1)}>Next Page</button>
      </div>
      <div>
        {users.map((user) => (
          <div key={user.socialHandle}>
            <div>{user.name}</div>
            <div>{user.socialHandle}</div>
            <div>
              {user.images.map((image) => (
                <img
                  key={image.name}
                  src={URL.createObjectURL(image)}
                  alt={image.name}
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
