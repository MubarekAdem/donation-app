// pages/api/auth/register.js

import { dbConnect } from "../../../lib/mongodb"; // Import dbConnect
import User from "../../../models/User"; // Make sure this User model is correctly defined
import bcrypt from "bcryptjs"; // Import bcrypt for password hashing

export default async function handler(req, res) {
  console.log("Attempting to connect to the database...");
  await dbConnect();
  console.log("Successfully connected to the database.");

  if (req.method === "POST") {
    const { name, email, password, phone } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      role: "user", // Assign a default role if needed
    });

    try {
      await newUser.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to register user" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
