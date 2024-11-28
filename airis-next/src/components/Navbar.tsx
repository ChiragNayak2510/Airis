'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import * as React from "react";
import { GiArtificialHive } from 'react-icons/gi';
import { Button } from './ui/button';

interface UserInterface {
  userId?: number;
  username: string;
  email: string;
}

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname();
  
  const user: UserInterface | null = null; 

  const logout = () => {
    localStorage.setItem('token', "")
    router.push("/")
  }

  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full bg-black h-16 shadow-lg z-50 flex">
      <div className="flex items-center justify-between w-full max-w-6xl mx-auto px-4">
        {/* Left Section */}
        <div className="flex items-center gap-6">
          <div className='flex items-center justify-center gap-2'>
            <GiArtificialHive color="white" size={40} />
            <p className='font-bold mr-2 text-lg'>Airis</p>
          </div>
          <Link
            href="/home/"
            className={`text-gray-400 hover:text-gray-200 ${
              pathname === "/" ? "text-white" : ""
            }`}
          >
            Home
          </Link>

          
          <Link
            href="/home/graph"
            className={`text-gray-400 hover:text-gray-200 ${
              pathname === "/graph" ? "text-white" : ""
            }`}
          >
            Graph
          </Link>
          <Link
            href="/home/prompt"
            className={`text-gray-400 hover:text-gray-200 ${
              pathname === "/prompt" ? "text-white" : ""
            }`}
          >
            Prompt
          </Link>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <span className="text-gray-400">{user}</span>
          ) : (
            <>
              <Button className='bg-red-500' variant={"destructive"} onClick={logout}>Logout</Button>
              {/* <Button onClick={registerModal.onOpen} variant={'outline'}>Sign Up</Button>   */}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
