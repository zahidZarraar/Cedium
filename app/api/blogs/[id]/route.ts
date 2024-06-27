import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";
import { unstable_noStore as noStore } from "next/cache";


export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  noStore();

  const { id } = await params;

  if (typeof id !== "string") {
    return Response.json({ error: "Invalid blog ID" }, { status: 500 });
  }

  try {
    const blog = await prisma.blog.findUnique({
      where: {
        id: Number(id)
      },
      include: {
        author: {
          select: {
            name: true,
            image: true,
            createdAt: true
          }
        },
        comments: {
          include: {
            author: {
              select: {
                name: true,
                image: true
              }
            }
          }
        },
        bookmarks: {},
        likes: {}
      }
    });

    return Response.json(blog);
  } catch (error) {
    return Response.json(
      { error: "Internal server error" },
      {
        status: 500
      }
    );
  }
}
