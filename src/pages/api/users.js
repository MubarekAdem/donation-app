// src/pages/api/users.js

import { dbConnect } from "@/lib/mongodb";
import User from "@/models/User";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      // Fetch name, email, and role
      const users = await User.find({}, "name email role"); // Include role here
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Error fetching users" });
    }
  } else if (req.method === "PATCH") {
    const { id } = req.query; // Ensure you are getting the ID from the query parameters
    const { role } = req.body;

    try {
      // Update user role
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { role },
        { new: true }
      ); // Return the updated document
      res.status(200).json(updatedUser); // Return the updated user details
    } catch (error) {
      console.error("Error updating user role:", error);
      res.status(500).json({ error: "Error updating user role" });
    }
  } else {
    res.setHeader("Allow", ["GET", "PATCH"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
