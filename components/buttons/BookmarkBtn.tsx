"use client";

import React, { useEffect, useState } from "react";
import { addBookmark, removeBookmark } from "@/actions/bookmark";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import { toast } from "sonner";
import { useCookies } from "next-client-cookies";
import { BlogFull } from "@/actions/Types";

const BookmarkBtn = ({ id, bookmarks }: Partial<BlogFull>) => {
    const cookies = useCookies();
    const userId = cookies.get("user-id");

    const [bookmarked, setBookMarked] = useState<boolean>(false);
    const bookmarkedId = bookmarks && Number(bookmarks[0]?.id);

    useEffect(() => {
        const isBookmarked = bookmarks?.some((blog) => blog.userId == Number(userId));

        if (isBookmarked) {
            setBookMarked(true);
        }
    }, [bookmarks]);

    const handleBookmark = async () => {
        let response;

        if (bookmarked && bookmarkedId) {
            response = await removeBookmark(bookmarkedId);
        } else {
            response = await addBookmark(Number(id));
        }

        if (response) {
            setBookMarked((prev) => !prev);
        } else {
            setBookMarked(false);
            toast.error("Error while bookmarking !");
        }
    };

    return (
        <button className="cursor-pointer" onClick={handleBookmark}>
            {!bookmarked ? (
                <IoBookmarkOutline size={18} className="hover:text-black" />
            ) : (
                <IoBookmark
                    size={18}
                    className={`text-black`}
                    enableBackground={"red"}
                />
            )}
        </button>
    );
};

export default BookmarkBtn;
