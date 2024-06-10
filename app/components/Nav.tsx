"use client";

import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'

const Nav = () => {

    const { data: session } = useSession();

    console.log('data : ', session);

    return (
        <nav className='flex justify-between w-full items-center py-4 px-10'>
            <h1 className='font-serif text-2xl font-semibold'>Cedium</h1>
            {session?.user?.name ? (
                <div className='flex space-x-4 items-center'>
                    <h3>{session?.user?.name}</h3>
                    <button
                        onClick={() => signOut()}
                    >Signout</button>
                </div>
            ) : (
                <button
                    onClick={() => signIn("github")}
                >Signin with Github</button>
            )}

        </nav>
    )
}

export default Nav