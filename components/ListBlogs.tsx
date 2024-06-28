import { Blog, User } from "@prisma/client";
import BlogContainer from "./BlogContainer";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { Plus } from "lucide-react";
import { BlogFull } from "@/actions/Types";

const getData = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APPURL}/api/blogs`, {
    cache: "no-store",
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

const ListBlogs = async () => {
  const data = await getData();

  if (!data || data?.length <= 0) {
    return (
      <div>
        <h1 className="text-red-400 font-semibold py-4 px-2 rounded-md bg-black/10 border border-gray-300 text-center mt-20 text-2xl">
          No Blogs to view. Please come back later :)
        </h1>
        <Link
          href="/new-blog"
          // className={buttonVariants()}
          className={cn(
            "text-center !py-1 px-4 rounded-md mt-3",
            buttonVariants()
          )}
        >
          Create Blog
          <Plus className="ml-2" />
        </Link>
      </div>
    );
  }

  return (
    <main>
      <h1 className="pb-10 text-3xl font-semibold ">Blogs</h1>
      <ul>
        {data?.length > 0 &&
          data.map((blog: BlogFull) => (
            <BlogContainer key={blog.id} blog={blog} />
          ))}
      </ul>
    </main>
  );
};

export default ListBlogs;
