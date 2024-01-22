// HeroSection.js
import React from "react";
import { FaKey, FaSearch } from "react-icons/fa"; // Import FontAwesome icons
import Link from "next/link";

const quotes = [
  "Find your perfect rental experience!",
  "Discover homes that suit your lifestyle.",
  "Rent with confidence, live with style.",
  "Your dream rental is just a click away!",
  "Unlock the door to your new home.",
];

const getRandomQuote = () => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};

const getRandomPosition = () => {
  const randomPosition = Math.random() * 80; // Adjust as needed
  return `${randomPosition}vw`;
};

const Hero = () => {
  return (
    <div className="bg-white text-gray-800 h-screen flex items-center justify-center relative">
      <div className="text-center z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          {getRandomQuote()}
        </h1>
        <p className="text-lg md:text-xl mb-8">
          <FaSearch className="inline-block mr-2 text-black text-sm" />{" "}
          {getRandomQuote()}
        </p>
        <Link
          href="/signup"
          className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-700 transition duration-300"
        >
          <FaKey className="inline-block mr-2 text-black text-sm" /> Get Started
        </Link>
      </div>
    </div>
  );
};

export default Hero;
