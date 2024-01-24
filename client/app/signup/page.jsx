"use client";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { useSelector, useDispatch } from "react-redux";
import { register, logout } from "@/Redux/Features/auth/authSlice";
import { useRouter } from "next/navigation";

const Page = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    confirmPassword: "",
    role: "owner",
  });
  const router = useRouter();
  const { username, email, password, firstName, lastName, role } = userData;

  const dispatch = useDispatch();
  const { isLoading, isError, user, message, isSuccess } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess && user) {
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

  const handleRegistration = (e) => {
    e.preventDefault();

    if (userData.password !== userData.confirmPassword) {
      toast.error("Passwords don't match");
    } else {
      const formData = { username, email, password, firstName, lastName, role };
      dispatch(register(formData));
      toast.success("Registrated successfully");
    }
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="bg-white flex items-center justify-center">
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
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-300"
            >
              First Name <span className="text-red-700">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              onChange={handleInputChange}
              value={userData.firstName}
              placeholder="First name"
              className="mt-1 p-2 border rounded w-full bg-gray-800 text-white"
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-300"
            >
              Last Name <span className="text-red-700">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={userData.lastName}
              onChange={handleInputChange}
              placeholder="Last name"
              className="mt-1 p-2 border rounded w-full bg-gray-800 text-white"
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-300"
            >
              Username <span className="text-red-700">*</span>
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={userData.username}
              onChange={handleInputChange}
              placeholder="Username"
              className="mt-1 p-2 border rounded w-full bg-gray-800 text-white"
            />
          </div>

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
              value={userData.email}
              onChange={handleInputChange}
              placeholder="Email"
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
              value={userData.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="mt-1 p-2 border rounded w-full bg-gray-800 text-white"
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-300"
            >
              Role <span className="text-red-700">*</span>
            </label>
            <select
              name="role"
              id="role"
              onChange={handleInputChange}
              value={userData.role}
              className="mt-1 p-2 border rounded w-full bg-gray-800 text-white focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="owner">owner</option>
              <option value="renter">renter</option>
            </select>
          </div>

          <div className="mb-3">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-300"
            >
              Confirm Password <span className="text-red-700">*</span>
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={userData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm password"
              className="mt-1 p-2 border rounded w-full bg-gray-800 text-white"
            />
          </div>
          <button
            type="submit"
            className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-300 transition duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
