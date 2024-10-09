import bcrypt from "bcryptjs";
import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    const client = await clientPromise;
    const db = client.db();

    const existingUser = await db.collection("users").findOne({ email });

    if (existingUser) {
      res.status(400).json({ success: false, message: "User already exists" });
      return;
    }

    await db.collection("users").insertOne({ email, password: hashedPassword });

    res.status(201).json({ success: true, message: "User registered" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
