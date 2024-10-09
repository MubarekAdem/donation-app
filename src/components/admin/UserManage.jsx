import { useEffect, useState } from "react";
import { MongoClient } from "mongodb";

const UserManage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const client = await MongoClient.connect(process.env.MONGODB_URI);
      const usersCollection = client.db().collection("users");
      const allUsers = await usersCollection.find().toArray();
      setUsers(allUsers);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    const response = await fetch("/api/updateRole", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, newRole }),
    });

    if (response.ok) {
      // Optionally, refetch users or update local state
      alert("User role updated successfully");
    } else {
      alert("Failed to update user role");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl mb-4">User Management</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.email}</td>
              <td>
                <select
                  onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  defaultValue="user" // Set a default role value
                >
                  <option value="user">User</option>
                  <option value="agent">Agent</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td>
                <button onClick={() => handleRoleChange(user._id)}>
                  Change Role
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManage;
