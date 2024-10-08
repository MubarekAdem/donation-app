// pages/dashboard/user-manage.js

import { useSession } from "next-auth/react";
import UserManage from "@/components/admin/UserManage";

const UserManagePage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  // Check if the session exists and if the user is admin
  if (!session || session.user.role !== "admin") {
    return <p>You do not have access to this page.</p>;
  }

  return <UserManage />;
};

export default UserManagePage;
