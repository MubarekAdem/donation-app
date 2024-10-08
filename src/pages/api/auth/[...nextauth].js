import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
import User from "../../../models/User"; // Import your User model

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
    maxAge: 365 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;

        // Fetch the user from the database using their email
        const user = await User.findOne({ email: profile.email });

        // If user exists in the database, assign their role to the token
        if (user) {
          token.role = user.role;
        } else {
          // Assign a default role if the user is not found
          token.role = "user";
        }

        token.emailVerified = profile.email_verified || null;
        token.image = profile.picture; // Get the profile image
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user.emailVerified = token.emailVerified;
      session.user.image = token.image;
      session.user.role = token.role; // Add role to session
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl + "/dashboard";
    },
  },
});
