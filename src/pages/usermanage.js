import UserManage from "../components/admin/UserManage";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const UserManagePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Redirect if the user is not logged in or not an admin
    if (status === "loading") return; // Wait until loading is complete
    if (!session || session.user.role !== "admin") {
      router.push("/"); // Redirect to home if not admin
    }
  }, [session, status]);

  return (
    <div>
      {session?.user?.role === "admin" ? (
        <>
          <h1 className="text-3xl font-bold p-6">User Management</h1>
          <UserManage />
        </>
      ) : (
        <p>You are not authorized to view this page.</p>
      )}
    </div>
  );
};

export default UserManagePage;
