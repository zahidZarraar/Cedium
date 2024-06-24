import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import BlogMiniBox from "@/components/ui/BlogMiniBox";
import { formatDate } from "@/lib/utils";
import { User2 } from "lucide-react";
import { cookies } from "next/headers";
import Image from "next/image";
import { Toaster } from "sonner";
import CommentBox from "./CommentBox";
import CommentDisplay from "./CommentDisplay";

const getBlog = async (id: number) => {
  const res = await fetch(`http://localhost:3000/api/blogs/${id}`, {
    cache: "no-cache",
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

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const blogId = Number(id);

  const blog = await getBlog(blogId);

  const comments = blog?.comments;
  console.log("c ; ", comments);

  const cookiestore = cookies();
  const userId = Number(cookiestore.get("user-id")?.value);

  if (!blog || blog == undefined) {
    return (
      <div className="flex mt-40 justify-center items-center">
        <h1 className="text-3xl animate-pulse">Blog not found !</h1>
      </div>
    );
  }

  return (
    <MaxWidthWrapper className="p-2 pt-10 flex flex-col space-y-4">
      {/* title */}
      <h1 className="font-bold font-sans text-[2rem] max-sm:text-[1.5rem]">
        {blog.title}
      </h1>
      <div className="flex space-x-2 items-center">
        {blog?.author?.image ? (
          <Image
            src={blog?.author.image}
            alt="author Image"
            className="mr-1 text-white rounded-full p-1"
            width={50}
            height={50}
          />
        ) : (
          <User2 className="mr-1 bg-gray-500 text-white rounded-full p-1" />
        )}
        <div className="flex leading-5 text-gray-600 flex-col">
          <h2 className="text-black font-semibold">{blog?.author?.name}</h2>
          <p>{formatDate(blog?.updatedAt)}</p>
        </div>
      </div>

      <BlogMiniBox
        id={blog?.id}
        className="py-3 border-y border-gray-200 px-4 w-full"
      />

      {/* the main container */}

      <main className="py-6 flex flex-col space-y-8">
        <div className="relative w-full h-[230px] rounded-xl">
          <Image
            src={"/assets/blogImage.jpeg"}
            alt="just an Image"
            className="relative object-fill w-full h-full"
            fill
          />
        </div>
        <p className="text-[1.1rem] text-gray-900 leading-6">
          {blog?.description}
        </p>
        <BlogMiniBox
          id={blog?.id}
          className="py-3 border-y border-gray-200 px-4"
        />

        {/* comments display */}
        <div className="flex flex-col space-y-4">
          <h2 className="text-lg font-bold">Comments</h2>
          <CommentDisplay />
        </div>

        {/* comment box */}
        <CommentBox params={params} userId={userId} />
        <Toaster />
      </main>
    </MaxWidthWrapper>
  );
};

export default Page;
