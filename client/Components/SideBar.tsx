// EnhancedSidebar.js

import React from "react";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";

const SideBar = () => {
  return (
    <div className="fixed inset-y-0 right-0 top-11 bg-blue-900 text-white z-50 overflow-y-auto w-48">
      <ul className="p-4">
        <li className="mb-4">
          <Link href="/" className="flex items-center space-x-2">
            Home
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/about" className="flex items-center space-x-2">
            About
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/rental-list" className="flex items-center space-x-2">
            Rental List
          </Link>
        </li>
      </ul>
      <div className="p-4">
        <button className="flex items-center bg-white text-blue-900 gap-2 px-4 py-2 rounded-md">
          Get Started <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default SideBar;
