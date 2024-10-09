import connectToDatabase from "../../../utils/db";

export default async function handler(req, res) {
  const db = await connectToDatabase();
  const usersCollection = db.collection("users");

  const users = await usersCollection.find({}).toArray();

  res.status(200).json({ users });
}
