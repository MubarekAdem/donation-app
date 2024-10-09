import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import clientPromise from "../../../lib/mongodb";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // You can add authorization URL if needed
    }),
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        const client = await clientPromise;
        const db = client.db();
        const user = await db
          .collection("users")
          .findOne({ email: credentials.email });

        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return { email: user.email };
        }
        return null;
      },
    }),
  ],
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.email = token.email;
      return session;
    },
    async signIn({ user, account, profile }) {
      const client = await clientPromise;
      const db = client.db();

      // Check if the user already exists in the database
      const existingUser = await db
        .collection("users")
        .findOne({ email: profile.email });
      if (!existingUser) {
        // Create a new user if they do not exist
        await db.collection("users").insertOne({
          email: profile.email,
          name: profile.name,
          // Add any other user fields you want
          role: "user", // Set default role
        });
      }
      return true; // Return true to proceed with sign-in
    },
  },
});
