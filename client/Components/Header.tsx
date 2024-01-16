"use client";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { RiMenu4Fill } from "react-icons/ri";
import SideBar from "./SideBar";
import { useState } from "react";
import { IoIosClose } from "react-icons/io";

const Header = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  return (
    <nav className="flex justify-between items-center">
      <h1>Logo</h1>
      <ul className="hidden md:flex gap-7 items-center">
        <li>
          <Link href={"#"} className="hover:text-gray-400">
            Home
          </Link>
        </li>
        <li>
          <Link href={"#"} className="hover:text-gray-400">
            About
          </Link>
        </li>
        <li>
          <Link href={"#"} className="hover:text-gray-400">
            Rent List
          </Link>
        </li>
      </ul>
      <div>
        <Link
          href="/signup"
          className="hidden md:flex items-center bg-black text-white gap-2 px-4 py-2 rounded-md"
        >
          Get Started <FaArrowRight />
        </Link>
      </div>
      <div className="md:hidden">
        <button onClick={toggleSidebar}>
          {isSidebarOpen ? (
            <IoIosClose className="" />
          ) : (
            <RiMenu4Fill className="" />
          )}
        </button>
        {isSidebarOpen && <SideBar />}
      </div>
    </nav>
  );
};

export default Header;
