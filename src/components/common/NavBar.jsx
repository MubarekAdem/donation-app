import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="text-white text-lg">Donation App</div>
      {session ? (
        <div className="flex items-center space-x-4">
          <span className="text-white">{session.user.email}</span>
          <button
            onClick={() => signOut({ callbackUrl: "/signin" })}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <span className="text-white">Not logged in</span>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
