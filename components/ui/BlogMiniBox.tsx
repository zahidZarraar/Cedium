import { cn } from "@/lib/utils";
import { Bookmark, MessageCircle } from "lucide-react";
import moment from "moment";
import React from "react";

interface BlogMiniT {
    updatedAt: Date;
    className?: string;
}

const BlogMiniBox = ({ updatedAt, className }: BlogMiniT) => {

    const date = moment(updatedAt).format("MMM Do YY");

    return (
        <div className={cn("flex space-x-4 items-center justify-between", className)}>
            <div className="flex space-x-4 items-center">
                <p className="max-md:text-[0.9rem]">{date}</p>
                <p className="flex items-center">
                    <MessageCircle className="mr-1" size={18} />
                    13
                </p>
            </div>
            <div>
                <Bookmark size={18} />
            </div>
        </div>
    );
};

export default BlogMiniBox;
