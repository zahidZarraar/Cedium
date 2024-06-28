import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const cookiestore = cookies();
  const userId = cookiestore.get("user-id");

  if (!userId || userId == undefined) {
    return Response.json({ message: "Unauthorized" }, { status: 500 });
  }

  try {
    const userDetails = await prisma.user.findUnique({
      where: {
        id: Number(userId.value)
      },
      include: {
        bookmarks: {
          include: {
            blog: true
          }
        },
        blogs: true,
        comments: true,
        likes: true
      }
    });

    if (!userDetails) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    return Response.json(userDetails, { status: 200 });
  } catch (error) {
    console.error("Error fetching user details:", error);
    return Response.json({ message: "Internal server error" }, { status: 501 });
  }
}
