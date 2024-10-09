import { hash } from "bcryptjs";
import clientPromise from "../../../lib/mongodb"; // Make sure you have a correct MongoDB connection function

export default async function signup(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const client = await clientPromise;
  const db = client.db();
  const userCollection = db.collection("users");

  // Check if user already exists
  const existingUser = await userCollection.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Create new user with default role 'user'
  const hashedPassword = await hash(password, 10);
  const newUser = await userCollection.insertOne({
    email,
    password: hashedPassword,
    role: "user", // Default role
  });

  res.status(201).json({ message: "User created", user: newUser.ops[0] });
}
