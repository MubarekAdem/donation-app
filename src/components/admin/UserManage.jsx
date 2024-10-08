import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Select } from "antd";
import { useSession } from "next-auth/react";

const { Option } = Select;

const UserManage = () => {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const showModal = (user) => {
    setSelectedUser(user);
    setNewRole(user.role); // Pre-select current role
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    if (selectedUser) {
      const response = await fetch(`/api/users?id=${selectedUser._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUsers((prev) =>
          prev.map((user) =>
            user._id === updatedUser._id ? updatedUser : user
          )
        );
        setIsModalOpen(false);
      } else {
        console.error("Failed to update role");
      }
    }
  };

  return (
    <div>
      <h1>User Management</h1>
      <Table dataSource={users} rowKey="_id">
        <Table.Column title="Name" dataIndex="name" key="name" />
        <Table.Column title="Email" dataIndex="email" key="email" />
        <Table.Column title="Role" dataIndex="role" key="role" />
        <Table.Column title="Actions" key="actions">
          {(text, record) => (
            <Button type="primary" onClick={() => showModal(record)}>
              Change Role
            </Button>
          )}
        </Table.Column>
      </Table>

      <Modal
        title="Change User Role"
        open={isModalOpen} // Use 'open' instead of 'visible'
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
      >
        <Select
          defaultValue={newRole}
          onChange={(value) => setNewRole(value)}
          style={{ width: 120 }}
        >
          <Option value="user">User</Option>
          <Option value="admin">Admin</Option>
          <Option value="agent">Agent</Option>
        </Select>
      </Modal>
    </div>
  );
};

export default UserManage;
