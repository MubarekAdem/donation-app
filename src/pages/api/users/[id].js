// src/pages/api/users/[id].js

import { dbConnect } from "@/lib/mongodb";
import User from "@/models/User";

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  await dbConnect();

  if (method === "PATCH") {
    try {
      const { role } = req.body; // Get role from the request body
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { role },
        { new: true }
      ); // Update the user role
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Error updating user role:", error);
      res.status(500).json({ error: "Error updating user role" });
    }
  } else {
    res.setHeader("Allow", ["PATCH"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
