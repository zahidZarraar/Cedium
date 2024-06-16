import React from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { User2Icon } from "lucide-react";
import Image from "next/image";
import BlogMiniBox from "@/components/ui/BlogMiniBox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Page = () => {
  return (
    <MaxWidthWrapper className="p-2 pt-10 flex flex-col space-y-4">
      {/* title */}
      <h1 className="font-bold font-sans text-[2rem] max-sm:text-[1.5rem]">Title</h1>
      <div className="flex space-x-2 items-center">
        <User2Icon
          size={36}
          className="bg-gray-500 text-white p-2 rounded-full"
        />
        <div className="flex leading-5 text-gray-600 flex-col">
          <h2 className="text-black font-semibold">Author name</h2>
          <p>Published on - Mar 18 2024</p>
        </div>
      </div>

      <BlogMiniBox
        updatedAt={new Date()}
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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
          officiis perspiciatis nemo. Inventore facilis nam enim voluptas
          veritatis nobis eveniet quia perspiciatis nulla architecto pariatur
          unde maiores ut nostrum, vero quisquam maxime, commodi necessitatibus
          repudiandae voluptatibus aut cum vitae quam! Ad deleniti
          necessitatibus ipsam quia voluptate rem fugiat dolorem minus?
        </p>
        <BlogMiniBox
          updatedAt={new Date()}
          className="py-3 border-y border-gray-200 px-4"
        />

        {/* comment box */}
        <div className="flex w-full items-center space-x-2">
          <Input type="email" placeholder="The Post is very Informative. Loving it!" />
          <Button type="submit">Comment</Button>
        </div>
      </main>
    </MaxWidthWrapper>
  );
};

export default Page;
