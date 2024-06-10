// pages/api/posts/create.js
import { getSession } from "next-auth/react";
import { prisma } from '../../lib/prisma'
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function POST(req: NextRequest) {
    const session = await getServerSession({});
    
    console.log('session : ', session);
    
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" });
  }

  const { title, published,description, categoryIds } = await req.json();

  try {
    const post = await prisma.blog.create({
      data: {
        title,
            published,
        description,
        author: { connect: { email: session.user?.email as string} },
        // categories: { connect: categoryIds.map(id => ({ id })) },
      },
    });

    return NextResponse.json(post);
  } catch (error) {
      console.error(error);
    return NextResponse.json({ error: "Error creating post" });
  }
}
