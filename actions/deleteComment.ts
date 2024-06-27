"use server";

import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { unstable_noStore as noStore } from "next/cache";

const cookiestore = cookies();

export const deleteComment = async (blogId) => {
    noStore();

    const userId = cookiestore.get("user-id");

    if (!userId) {
        return false;
    }

    try {
        await prisma.comment.delete({
            where: {
                id: blogId
            }
        });

        return true;
    } catch (err) {
        console.log("err : ", err);
        return false;
    }
};