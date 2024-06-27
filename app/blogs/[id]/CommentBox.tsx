"use client";

import { Button } from "@/components/ui/button";
import { FormEvent, useRef } from "react";
import { toast } from "sonner";
import { submitHandler } from "./utils";

const CommentBox = ({
  params,
  userId
}: {
  params: { id: string };
  userId: number;
}) => {
  const { id } = params;
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);


    const response = await submitHandler(formData, Number(id), userId);

    if (response.success) {
      toast.success("commented !");
    } else {
      toast.error(response.message);
    }

    formRef.current?.reset();
  };

  return (
    <div className="flex w-full items-center space-x-2">
      <form ref={formRef} onSubmit={handleSubmit} className="w-full flex space-x-1">
        <input
          name="comment"
          className="border-gray-400 w-full border py-1 px-4
        "
          type="text"
          placeholder="The Post is very Informative. Loving it!"
        />
        <Button type="submit">Comment</Button>
      </form>
    </div>
  );
};

export default CommentBox;
