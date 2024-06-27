"use client";

import { Pen } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { cookies } from "next/headers";
import { useCookies } from "next-client-cookies";

const Nav = () => {
  const { data: session } = useSession();
  const cookies = useCookies();

  const signoutHandler = () => {
    cookies.set("user-id", "");

    signOut();
  };

  return (
    <nav className="flex justify-between w-full items-center py-4 px-10 border-b border-gray-700">
      <Link href="/" className="font-serif text-2xl font-semibold">
        Cedium
      </Link>
      {session?.user?.name ? (
        <div className="flex space-x-4 items-center">
          <Link href="/new-blog">
            <span className="flex hover:text-green-600 items-center">
              <Pen
                size={16}
                className="mr-2 hover:text-inherit text-[0.9rem]"
              />
              Write
            </span>
          </Link>

          <div className="flex items-center space-x-1">
            <Image
              height={40}
              width={40}
              className="rounded-full p-1"
              alt="user-image"
              src={session?.user?.image as string}
            />
            <Link href="/profile">
              <h3 className="cursor-hover hover:border-b py-2 border-black">
                {session?.user?.name}
              </h3>
            </Link>
          </div>
          <Button
            variant={"link"}
            className="text-red-700"
            onClick={signoutHandler}
          >
            Signout
          </Button>
        </div>
      ) : (
        <div className="flex space-x-2">
          {/* <Button */}
          <button onClick={() => signIn("oauth")}>Signin</button>
        </div>
      )}
    </nav>
  );
};

export default Nav;
