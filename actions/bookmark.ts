"use server";

import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

const cookiestore = cookies();

export const addBookmark = async (blogId: number) => {
  const userId = cookiestore.get("user-id");

  if (!userId) {
    return false;
  }

  try {
    const bookmarked = await prisma.bookmark.create({
      data: {
        blogId,
        userId: Number(userId.value)
      }
    });

    console.log("bookmarked : ", await bookmarked);
    return true;
  } catch (err) {
    console.log("err : ", err);
    return false;
  }
};

export const removeBookmark = async (bookmarkId: number) => {
  const userId = cookiestore.get("user-id");

  if (!userId) {
    return false;
  }

  try {
    const bookmarked = await prisma.bookmark.delete({
      where: {
        id: bookmarkId
      }
    });

    console.log("bookmarked : ", await bookmarked);
    return true;
  } catch (err) {
    console.log("err : ", err);
    return false;
  }
};
