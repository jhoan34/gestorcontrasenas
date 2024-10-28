
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import authConfig from "./auth.config"

const prisma = new PrismaClient()
export const {handlers, signIn, signOut, auth} = NextAuth({
  adapter: PrismaAdapter(prisma),
  ...authConfig,
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token }) {
      console.log("JWT Callback Token:", token);
      return token;
    },
    async session({ session, token }) {
      console.log("Session Callback Token:", token);
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
    
})
