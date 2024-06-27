"use server";

import prisma from "@/lib/prisma";
import { unstable_noStore as noStore } from "next/cache";

export const submitHandler = async (
  formData: FormData,
  blogId: number,
  authorId: number
) => {
  noStore();
  const comment = formData.get("comment");
  try {
    const newComment = await prisma.comment.create({
      data: {
        content: comment as string,
        blogId,
        authorId: authorId
      }
    });

    console.log("new : ", newComment);

    return { success: true, message: "Comment created successfully" };
  } catch (err) {
    console.log("err : ", err);
    return { success: false, message: "Failed to create comment" };
  }
};
