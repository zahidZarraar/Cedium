"use server";

import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

const cookiestore = cookies();

export const deleteBlog = async (blogId) => {
    const userId = cookiestore.get("user-id");

    if (!userId) {
        return false;
    }

    try {
        await prisma.blog.delete({
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
