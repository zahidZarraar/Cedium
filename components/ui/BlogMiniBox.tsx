import { BlogFull } from "@/actions/Types";
import { cn, formatDate } from "@/lib/utils";
import { MessageCircle } from "lucide-react";
import BookmarkBtn from "../buttons/BookmarkBtn";

interface BlogMiniT {
    updatedAt: Date;
    className?: string;
    blog: BlogFull;
}

const BlogMiniBox = ({ updatedAt, className, blog }: BlogMiniT) => {
    const comments = blog?.comments && blog?.comments.length;
    const bookmarks = blog?.bookmarks;

    const blogId = Number(blog?.id);

    return (
        <div
            className={cn("flex space-x-4 items-center justify-between", className)}
        >
            <div className="flex space-x-4 items-center">
                <p className="max-md:text-[0.9rem]">{formatDate(updatedAt)}</p>
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
