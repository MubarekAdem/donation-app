// models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false }, // Not required
  phone: { type: String, required: false }, // Not required
  resetToken: { type: String, default: null },
  resetTokenExpiry: { type: Date, default: null },
  role: { type: String, default: "user" }, // Default role
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
