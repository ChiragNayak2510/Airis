'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import * as React from "react";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="fixed top-0 left-0 w-full bg-black h-16 shadow-lg z-50 px-56">
      <div className="w-full flex items-center p-4 justify-between text-md">

        <div className="flex items-center gap-6">
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
              pathname === "/about" ? "text-white" : ""
            }`}
          >
            Prompt
          </Link>
          <Link
            href="/graph"
            className={`text-gray-400 hover:text-gray-200 ${
              pathname === "/services" ? "text-white" : ""
            }`}
          >
            Graph
          </Link>
          <Link
            href="/docs"
            className={`text-gray-400 hover:text-gray-200 ${
              pathname === "/contact" ? "text-white" : ""
            }`}
          >
            Documentation
          </Link>
        </div>

        <Link
          href="/profile"
          className={`text-gray-400 text-lg hover:underline ${
            pathname === "/profile" ? "text-white" : ""
          }`}
        >
          Profile
        </Link>
      </div>
    </div>
  );
}
