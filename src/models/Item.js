// models/Items.js

import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"], // This specifies the GeoJSON type
        required: true,
      },
      coordinates: {
        type: [Number], // Array of numbers for [longitude, latitude]
        required: true,
      },
    },
  },
  { timestamps: true }
);

// Create a 2dsphere index for geospatial queries
ItemSchema.index({ location: "2dsphere" });

export default mongoose.models.Item || mongoose.model("Item", ItemSchema);
