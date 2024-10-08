// pages/api/items.js

import mongoose from "mongoose";
import Items from "@/models/Item"; // Ensure to create this model

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Connect to MongoDB
      if (!process.env.MONGODB_URI) {
        throw new Error("MONGODB_URI is not defined");
      }

      console.log("MongoDB URI:", process.env.MONGODB_URI); // Log to check

      await mongoose.connect(process.env.MONGODB_URI); // Connect using the correct URI

      const itemData = req.body; // This should include user name and other data
      const { userName, description, phoneNumber, location } = itemData;

      // Check if location is valid and format it
      if (!location || !location.latitude || !location.longitude) {
        return res.status(400).json({ error: "Invalid location data." });
      }

      // Create a new item entry
      const newItem = await Items.create({
        userName,
        description,
        phoneNumber,
        location: {
          type: "Point", // GeoJSON type
          coordinates: [location.longitude, location.latitude], // Ensure correct order [longitude, latitude]
        },
      });

      res.status(201).json(newItem);
    } catch (error) {
      console.error("Error creating item entry:", error);
      res.status(500).json({ error: "Error creating item entry." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
