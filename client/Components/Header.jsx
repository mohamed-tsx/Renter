"use client";
import React, { useState } from "react";
import Link from "next/link";
import { RiMenu4Line } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import SideBar from "@/Components/SideBar.jsx";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { logout } from "@/Redux/Features/auth/authSlice";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const { user, isOwner } = useSelector((state) => state.auth);
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
          {isOwner ? (
            <li>
              {" "}
              <Link href="#" className="hover:text-gray-800">
                Dashboard
              </Link>
            </li>
          ) : (
            <li>
              {" "}
              <Link href="#" className="hover:text-gray-800">
                Rental Lists
              </Link>
            </li>
          )}
        </ul>
      </div>
      {user ? (
        <div className="hidden md:flex items-center justify-center space-x-2">
          <button
            className="flex items-center bg-black text-white gap-2 px-4 py-2 rounded-md"
            onClick={() => dispatch(logout())}
          >
            Logout
          </button>
          <p>{user.firstName}</p>
          <Image
            src={user.image}
            width={30}
            height={30}
            className="rounded-full"
            alt="Profile picture"
          ></Image>
        </div>
      ) : (
        <div className="hidden md:flex items-center space-x-2">
          <button>
            <Link href={"/signin"}>Login</Link>
          </button>
          <button className="flex items-center justify-center px-2 py-2 text-white rounded-md bg-black hover:bg-gray-700">
            <Link href={"/signup"}>Get Started</Link>
          </button>
        </div>
      )}
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
