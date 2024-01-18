"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Toaster, toast } from "sonner";

const RegistrationPage = () => {
  const apiUrl = "http://localhost:4321/user/login";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Logged In Successfully");
        toast.success(successMessage);
        // Optionally, you can redirect the user to another page on successful registration
      } else {
        setError(data.error || "Login failed.");
        toast.error(error);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Toaster position="top-center" richColors />

      <div className="border-2 border-blue-500 rounded-lg p-8 bg-gray-100 shadow-md">
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            value={formData.email}
            name="email"
            type="email"
            className="border-2 p-3 w-full rounded-md"
            placeholder="Email"
            onChange={handleInputChange}
          />
          <input
            value={formData.password}
            name="password"
            type="password"
            className="border-2 p-3 w-full rounded-md"
            placeholder="Password"
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className={`bg-blue-500 text-white px-4 py-2 rounded-md ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
            }`}
            disabled={loading}
          >
            {loading ? "Login..." : "Login"}
          </button>
        </form>
      </div>
      <div>
        <p>
          Don't have an account?{" "}
          <Link href={"/signup"} className="text-sky-500">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationPage;
