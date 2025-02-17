import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: number; // Add 'id' to the user object
    username: string;
  }

  interface Session {
    user: User; // Ensure session.user includes id and username
  }
}
