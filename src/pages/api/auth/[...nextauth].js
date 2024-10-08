// pages/api/auth/[...nextauth].js

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"; // Import Google provider directly
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb"; // Ensure you have MongoDB connection setup

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // Other providers can be added here
  ],
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt", // Use JWT for session management
    maxAge: 365 * 24 * 60 * 60, // 1 year in seconds
  },
  callbacks: {
    async jwt({ token, account, profile, user }) {
      if (account) {
        // If this is the first sign-in, store more profile information
        token.accessToken = account.access_token;
        if (profile) {
          token.emailVerified = profile.email_verified || null;
          token.image = profile.picture; // Get the profile image
        }
      }
      return token;
    },
    async session({ session, token }) {
      // Add extra fields to the session
      session.accessToken = token.accessToken;
      session.user.emailVerified = token.emailVerified;
      session.user.image = token.image;
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Always redirect to the dashboard page after login
      return baseUrl + "/dashboard";
    },
  },
});
