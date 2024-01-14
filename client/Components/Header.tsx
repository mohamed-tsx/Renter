import Image from "next/image";
import logo from "@/public/logo.png";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

const Header = () => {
  return (
    <div className="flex justify-between items-center text-center">
      <Image src={logo} alt="logo" width={70} height={70} />
      <ul className="flex gap-7 items-center">
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
        <button className="flex items-center bg-black text-white gap-2 px-4 py-2 rounded-md">
          Get Started <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Header;
