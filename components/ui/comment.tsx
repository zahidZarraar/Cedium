"use client";

import { deleteBlog } from "@/actions/deleteBlog";
import { deleteComment } from "@/actions/deleteComment";
import { useGetBlog } from "@/hooks/queries";
import { useValidateComment } from "@/hooks/useHooks";
import { Trash2, User2 } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Comment = ({ comment }: any) => {
    const showDelete = useValidateComment(Number(comment?.id));

    return (
        <>
            <main
                className="flex justify-between items-center border-b pb-2 pt-0"
            >
                <div className="flex space-x-3 items-center">
                    {comment?.author?.image ? (
                        <Image
                            src={comment?.author.image}
                            alt="author Image"
                            className="mr-1 text-white rounded-full p-1"
                            width={35}
                            height={35}
                        />
                    ) : (
                        <User2 className="mr-1 bg-gray-500 text-white rounded-full p-1" />
                    )}
                    {/* name and comment */}
                    <div className="flex flex-col text-[0.9rem]">
                        <h2 className="text-gray-700">{comment?.author?.name}</h2>
                        <h2>{comment?.content}</h2>
                    </div>
                </div>

                {showDelete && (
                    <button onClick={() => deleteComment(Number(comment?.id))}>
                        <Trash2 size={20} className="text-gray-800" />
                    </button>
                )}
            </main>
        </>
    );
};

export default Comment;
