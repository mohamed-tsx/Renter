"use client";
import React, { useState } from "react";
import Link from "next/link";
import { RiMenu4Line } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import SideBar from "@/Components/SideBar.jsx";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  console.log(isMenuOpen, "Menu is Open");
  return (
    <div className="flex items-center justify-between">
      <h1>Logo</h1>
      <div className="hidden md:block">
        <ul className="flex items-center justify-center space-x-4">
          <li>
            <Link href="#" className="hover:text-gray-800">
              Home
            </Link>
          </li>
          <li>
            {" "}
            <Link href="#" className="hover:text-gray-800">
              About
            </Link>
          </li>
          <li>
            {" "}
            <Link href="#" className="hover:text-gray-800">
              Services
            </Link>
          </li>
          <li>
            {" "}
            <Link href="#" className="hover:text-gray-800">
              Contact
            </Link>
          </li>
        </ul>
      </div>
      <div className="hidden md:flex items-center space-x-2">
        <button>
          <Link href={""}>Login</Link>
        </button>
        <button className="flex items-center justify-center px-2 py-2 text-white rounded-md bg-black hover:bg-gray-700">
          <Link href={"/signup"}>Get Started</Link>
        </button>
      </div>
      <button
        className="block md:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <IoMdClose /> : <RiMenu4Line />}
      </button>
      {isMenuOpen && <SideBar />}
      {/* <SideBar /> */}
    </div>
  );
};

export default Header;
