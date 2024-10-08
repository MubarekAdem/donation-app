// lib/mongodb.js

import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI; // Make sure you have this in your .env.local file
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable to ensure we reuse the MongoClient
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, create a new MongoClient
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
