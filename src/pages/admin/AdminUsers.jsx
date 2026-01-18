import { useEffect, useState } from "react";
import api from "../../api/axios";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/admin/users").then(res => setUsers(res.data));
  }, []);

  const changeRole = async (id, role) => {
    await api.put(`/admin/users/${id}/role`, { role });

    setUsers(prev =>
      prev.map(u =>
        u._id === id ? { ...u, role } : u
      )
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">
        User Management
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-slate-700 rounded-lg">
          <thead className="bg-slate-800 text-gray-300 text-sm">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-center">Role</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map(user => (
              <tr
                key={user._id}
                className="border-t border-slate-700 text-sm text-gray-300"
              >
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3 text-center capitalize">
                  {user.role}
                </td>
                <td className="p-3 text-center">
                  {user.role === "admin" ? (
                    <span className="text-gray-500">
                      Protected
                    </span>
                  ) : user.role === "reader" ? (
                    <button
                      onClick={() =>
                        changeRole(user._id, "author")
                      }
                      className="px-3 py-1 text-xs rounded bg-green-600 text-white"
                    >
                      Make Author
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        changeRole(user._id, "reader")
                      }
                      className="px-3 py-1 text-xs rounded bg-yellow-600 text-black"
                    >
                      Remove Author
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <p className="text-gray-400 text-center py-10">
            No users found
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;