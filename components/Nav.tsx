"use client";

import { Pen } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Nav = () => {
  const { data: session } = useSession();

  console.log("data : ", session);

  return (
    <nav className="flex justify-between w-full items-center py-4 px-10 border-b border-gray-700">
      <h1 className="font-serif text-2xl font-semibold">Cedium</h1>
      {session?.user?.name ? (
        <div className="flex space-x-4 items-center">
          <Link href="/new-blog">
            <span className='flex hover:text-green-600 items-center'>
              <Pen size={16} className="mr-2 hover:text-inherit text-[0.9rem]" />
              Write
            </span>
          </Link>

          <h3>{session?.user?.name}</h3>
          <button onClick={() => signOut()}>Signout</button>
        </div>
      ) : (
        <button onClick={() => signIn("github")}>Signin with Github</button>
      )}
    </nav>
  );
};

export default Nav;
