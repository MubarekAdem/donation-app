import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "PATCH") {
    const { userId, newRole } = req.body;

    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const usersCollection = client.db().collection("users");

    try {
      await usersCollection.updateOne(
        { _id: new ObjectId(userId) },
        { $set: { role: newRole } }
      );
      res.status(200).json({ message: "Role updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to update role" });
    } finally {
      client.close();
    }
  } else {
    res.setHeader("Allow", ["PATCH"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
