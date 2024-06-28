"use client";

import Comment from "@/components/ui/comment";
import { useGetBlog } from "@/hooks/queries";
import { useParams } from "next/navigation";

const CommentDisplay = () => {
  const { id } = useParams();

  const { data: blog, isLoading, isError } = useGetBlog(Number(id));

  const comments = blog?.comments;

  if (isLoading) {
    return <h1 className="mx-auto text-center">Loading....</h1>;
  }

  return (
    <>
      {comments?.length > 0 &&
        comments?.map((comment, index) => (
          <Comment key={index} comment={comment} />
        ))}
    </>
  );
};

export default CommentDisplay;
