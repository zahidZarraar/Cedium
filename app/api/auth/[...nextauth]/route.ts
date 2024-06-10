import { prisma } from "@/lib/prisma";
import NextAuth from "next-auth"

import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        // GoogleProvider({
        //     clientId: process.env.GOOGLE_CLIENT_ID as string,
        //     clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        //   })
    ],
  callbacks: {
    async signIn({ user }) {
      // Check if user exists in the database
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email as string },
      });

      // If user doesn't exist, create a new user
      if (!existingUser) {
        await prisma.user.create({
          data: {
            email: user.email as string,
            name: user.name,
            image: user.image,
          },
        });
      }

      // Allow sign-in
      return true;
    },
    // async session({ session, user }) {
    //   // Attach user info to the session object
    //   session.expires = "sdfsdf";

    //   return session;
    // },
  },
})

export { handler as GET, handler as POST }
