import prisma from "@/lib/prisma";
import NextAuth from "next-auth";

import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";
const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    })
    // GoogleProvider({
    //     clientId: process.env.GOOGLE_CLIENT_ID as string,
    //     clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    //   })
  ],
  callbacks: {
    async signIn({ user }) {
      // Check if user exists in the database
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email as string }
      });

      let newUser: any;

      // If user doesn't exist, create a new user
      if (!existingUser) {
        await prisma.user
          .create({
            data: {
              email: user.email as string,
              name: user.name as string,
              image: user.image
            }
          })
          .then((res) => {
            console.log("new user : ", res);
            newUser = res;
          });
      }
      const userId = existingUser?.id || newUser?.id;

      if (userId) {
        cookies().set("user-id", String(userId), {
          maxAge: 60 * 60 * 24 * 7, // Cookie expires in 7 days
          path: "/"
        });
      }

      // Allow sign-in
      return true;
    }
  }
});

export { handler as GET, handler as POST };
