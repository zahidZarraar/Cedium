import { getSession } from "next-auth/react";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function POST(req: NextRequest) {

  const cookiestore = cookies();

  const userid = cookiestore.get("user-id");

  if (!userid || userid == undefined) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 500 });
  }

  const { title, description, blogImage } = await req.json();

  try {
    const post = await prisma.blog.create({
      data: {
        title,
        description,
        blogImage,
        authorId: Number(userid?.value)
      }
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error creating post" },
      { status: 400 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { blogId: string } }
) {
  const { blogId } = params;

  console.log("blogId : ", blogId);

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
