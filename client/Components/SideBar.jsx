import React from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { logout } from "@/Redux/Features/auth/authSlice";
const SideBar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <div className="fixed inset-y-0 right-0 top-14 bg-black text-white z-50 overflow-y-auto w-48">
      <ul className="p-4">
        <li className="mb-4">
          <Link href="" className="flex items-center space-x-2">
            Home
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/about" className="flex items-center space-x-2">
            About
          </Link>
        </li>
        <li className="mb-4">
          <Link href="" className="flex items-center space-x-2">
            Rental List
          </Link>
        </li>
      </ul>
      {user ? (
        <div className="px-4 space-y-2">
          <button
            className="flex items-center bg-white text-black gap-2 px-4 py-2 rounded-md"
            onClick={() => dispatch(logout())}
          >
            Logout
          </button>
          <div className="flex items-center justify-center space-x-2">
            <p>{user.firstName}</p>
            <Image
              src={user.image}
              width={30}
              height={30}
              className="rounded-full"
              alt="Profile picture"
            ></Image>
          </div>
        </div>
      ) : (
        <div className="px-4 space-y-2">
          <Link href={"/signin"}>Login</Link>
          <Link
            href=""
            className="flex items-center bg-white text-black gap-2 px-4 py-2 rounded-md"
          >
            Get Started
          </Link>
        </div>
      )}
    </div>
  );
};

export default SideBar;
