"use client";

import { BlogFull } from "@/actions/Types";
import { cn, formatDate } from "@/lib/utils";
import { MessageCircle } from "lucide-react";
import BookmarkBtn from "../buttons/BookmarkBtn";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useGetBlog } from "@/hooks/queries";



const BlogMiniBox = ({ className, id }: { className?: string; id: number }) => {
    const blogId = Number(id);
    const { data: blog, isLoading, isError } = useGetBlog(blogId);


    console.log('blogdata : ', blog);

    if (isLoading) {
        return <h1 className='mx-auto text-center'>Loading....</h1>
    }

    const comments = blog?.comments && blog?.comments.length;
    const bookmarks = blog?.bookmarks;

    return (
        <div
            className={cn("flex space-x-4 items-center justify-between", className)}
        >
            <div className="flex space-x-4 items-center">
                <p className="max-md:text-[0.9rem]">{formatDate(blog?.updatedAt)}</p>
                <p className="flex items-center">
                    <MessageCircle className="mr-1" size={18} />
                    {comments}
                </p>
            </div>
            <div className="flex space-x-1 items-center">
                <BookmarkBtn id={blogId} bookmarks={blog?.bookmarks} />
                <p className="text-gray-600 text-[0.8rem]">{bookmarks?.length}</p>
            </div>
        </div>
    );
};

export default BlogMiniBox;
