"use client";
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch
import { login } from "@/Redux/Features/auth/authSlice";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";

const Page = () => {
  const dispatch = useDispatch(); // Initialize useDispatch
  const router = useRouter();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const { isLoading, isError, user, message, isSuccess } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (user) {
      router.push("/");
    }
  }, [isError, user, isLoading, isSuccess, message, dispatch, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login(userData)); // Use userData instead of formData
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-white flex items-center justify-center h-screen">
      <Toaster richColors position="top-right" />
      <div className="bg-black p-6 text-white rounded-lg shadow-md w-[600px]">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Create Your Account
        </h1>
        <p className="text-gray-300 text-center mb-4">
          Unlock the door to your new home.
        </p>
        <form className="flex flex-col" onSubmit={handleRegistration}>
          <div className="mb-3">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email <span className="text-red-700">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded w-full bg-gray-800 text-white"
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password <span className="text-red-700">*</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded w-full bg-gray-800 text-white"
            />
          </div>

          <button
            type="submit"
            className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-300 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
