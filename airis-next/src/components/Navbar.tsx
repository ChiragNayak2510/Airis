'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import * as React from "react";
import { GiArtificialHive } from 'react-icons/gi';
import { Button } from './ui/button';
import useLoginModal from '@/hooks/useLoginModal';
import useRegisterModal from '@/hooks/useRegisterModal';

interface UserInterface {
  userId?: number;
  username: string;
  email: string;
}

export default function Navbar() {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal(); 
  const pathname = usePathname();
  
  const user: UserInterface | null = null; 

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
            href="/"
            className={`text-gray-400 hover:text-gray-200 ${
              pathname === "/" ? "text-white" : ""
            }`}
          >
            Home
          </Link>

          <Link
            href="/prompt"
            className={`text-gray-400 hover:text-gray-200 ${
              pathname === "/prompt" ? "text-white" : ""
            }`}
          >
            Prompt
          </Link>
          <Link
            href="/graph"
            className={`text-gray-400 hover:text-gray-200 ${
              pathname === "/graph" ? "text-white" : ""
            }`}
          >
            Graph
          </Link>
          <Link
            href="/docs"
            className={`text-gray-400 hover:text-gray-200 ${
              pathname === "/docs" ? "text-white" : ""
            }`}
          >
            Documentation
          </Link>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <span className="text-gray-400">{user.username}</span>
          ) : (
            <>
              <Button onClick={loginModal.onOpen}>Sign In</Button>
              <Button onClick={registerModal.onOpen} variant={'outline'}>Sign Up</Button>  
            </>
          )}
        </div>
      </div>
    </div>
  );
}
