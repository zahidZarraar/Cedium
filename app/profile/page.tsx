// components/UserProfile.tsx
"use client";

import { useUser } from "@/hooks/queries";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import Blog from "./Blog";
import Loader from "./[components]/Loader";

const Page = () => {
  const { data: user, isLoading, error } = useUser();

  if (isLoading) return <Loader />;
  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        Error loading user data
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white py-10 shadow-md rounded-lg">
      <div className="profile-header text-center">
        <Image
          className="rounded-full mx-auto"
          src={user?.image}
          width={150}
          height={150}
          alt={user.name}
        />
        <h1 className="text-3xl font-bold mt-4">{user.name}</h1>
        <p className="text-gray-600">{user.email}</p>
        <p className="text-gray-500">Joined on: {formatDate(user.createdAt)}</p>
      </div>

      <div className="profile-details mt-8">
        <h2 className="text-2xl font-semibold mb-4">Blogs</h2>
        <ul className="profile-blogs space-y-4">
          {user.blogs.map((blog: any) => (
            <Blog key={blog?.id} blog={blog} />
          ))}
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Bookmarks</h2>
        <ul className="profile-bookmarks space-y-4">
          {user.bookmarks.map((bookmark) => (
            <li
              key={bookmark.id}
              className="bookmark-item p-4 bg-gray-100 rounded-md shadow-sm"
            >
              <p className="text-gray-700">
                #{bookmark.id} : {bookmark.blog.title}
              </p>
            </li>
          ))}
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Comments</h2>
        <ul className="profile-comments space-y-4">
          {user.comments.map((comment) => (
            <li
              key={comment.id}
              className="comment-item p-4 bg-gray-100 rounded-md shadow-sm"
            >
              <p className="text-gray-700">{comment.content}</p>
              <p className="text-gray-500">Blog ID: {comment.blogId}</p>
              <p className="text-gray-500">
                Posted at: {formatDate(comment.createdAt)}
              </p>
            </li>
          ))}
        </ul>

        {/* <h2 className="text-2xl font-semibold mt-8 mb-4">Likes</h2>
        <ul className="profile-likes space-y-4">
          {user.likes.map((like) => (
            <li
              key={like.id}
              className="like-item p-4 bg-gray-100 rounded-md shadow-sm"
            >
              <p className="text-gray-700">Blog ID: {like.blogId}</p>
            </li>
          ))}
        </ul> */}
      </div>
    </div>
  );
};

export default Page;
