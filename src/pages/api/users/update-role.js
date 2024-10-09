import connectToDatabase from "../../../utils/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, role } = req.body;

    const db = await connectToDatabase();
    const usersCollection = db.collection("users");

    const result = await usersCollection.updateOne(
      { email },
      { $set: { role } }
    );

    if (result.modifiedCount > 0) {
      res.status(200).json({ message: "User role updated" });
    } else {
      res.status(400).json({ message: "Failed to update role" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
