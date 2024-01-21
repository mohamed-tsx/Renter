import React from "react";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

const Header = () => {
  return (
    <div className="flex items-center justify-between">
      <h1>Logo</h1>
      <div>
        <ul className="flex items-center justify-center space-x-4">
          <li>
            <Link href="#">Home</Link>
          </li>
          <li>
            {" "}
            <Link href="#">About</Link>
          </li>
          <li>
            {" "}
            <Link href="#">Services</Link>
          </li>
          <li>
            {" "}
            <Link href="#">Contact</Link>
          </li>
        </ul>
      </div>
      <div>
        <button className="flex items-center justify-center px-2 py-2 text-white rounded-md bg-black hover:bg-gray-700">
          Get Started
          <FaArrowRightLong />
        </button>
      </div>
    </div>
  );
};

export default Header;
