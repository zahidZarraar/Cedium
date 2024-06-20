"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { useParams } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { submitHandler } from "./utils";
import { toast } from "sonner";

const CommentBox = ({ params, userId }: { params: { id: string }, userId: number }) => {
  const { id } = params;


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const response = await submitHandler(formData, Number(id), userId);

    if (response.success) {
      toast.success("commented !");
    } else {
      toast.error(response.message);
    }

  };

  // TODO : on form submission make the input values reset
  return (
    <div className="flex w-full items-center space-x-2">
      <form onSubmit={handleSubmit} className="w-full flex space-x-1">
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
