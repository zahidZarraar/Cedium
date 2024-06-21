import { Blog, Bookmark, Like, User } from "@prisma/client";

export interface BlogFull extends Blog {
    comments?: Comment[];
    likes?: Like[];
    author?: User;
    bookmarks?: Bookmark[];
}