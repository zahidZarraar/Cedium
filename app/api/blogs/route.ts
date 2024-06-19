// pages/api/posts/create.js
import { getSession } from "next-auth/react";
import { prisma } from "../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function POST(req: NextRequest) {
  const session = await getServerSession({});

  console.log("session : ", session);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" });
  }

  const { title, description } = await req.json();

  try {
    const post = await prisma.blog.create({
      data: {
        title,
        description,
        author: { connect: { email: session.user?.name as string } }
        // categories: { connect: categoryIds.map(id => ({ id })) },
      }
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error creating post" });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { blogId: string } }) {

  const { blogId } = params;

  console.log('blogId : ', blogId);

  try {
    const deletedBlog = await prisma.blog.delete({
      where: {
        id: Number(blogId)
      }
    });

    return NextResponse.json(deletedBlog);
  } catch (e) {
    console.error("SOME UNKNOWN ERROR : ", e);
    return Response.json(
      {
        message: "Something Went Wrong !"
      },
      {
        status: 404
      }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const allBlogs = await prisma.blog.findMany();

    return Response.json(allBlogs);
  } catch (err) {
    console.error(err);
    return Response.json(
      {
        message: "Something Went Wrong !"
      },
      {
        status: 404
      }
    );
  }
}
