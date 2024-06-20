import { cn, formatDate } from "@/lib/utils";
import { Bookmark, BookmarkIcon, MessageCircle } from "lucide-react";

interface BlogMiniT {
    updatedAt: Date;
    className?: string;
    blog: any;
}

const BlogMiniBox = ({ updatedAt, className, blog }: BlogMiniT) => {
    const comments = blog?.comments && blog?.comments.length;

    console.log("blog : ", blog);

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
            <div>
                <BookmarkIcon
                    size={18}
                    color="red"
                    enableBackground={"red"}
                />
            </div>
        </div>
    );
};

export default BlogMiniBox;
