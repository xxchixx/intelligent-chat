"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Brand Name */}
        <Link href="/" className="text-xl font-bold">
          Intelligent Chat
        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-4">
          <Link href="/" className="hover:underline">
            Home
          </Link>
        </div>
      </div>
    </nav>
  );
}
