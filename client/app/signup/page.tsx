"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Toaster, toast } from "sonner";

const RegistrationPage = () => {
  const apiUrl = "http://localhost:4321/user";

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    role: "renter", // Assuming role is part of registration
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

  const handleRegistration = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(`${apiUrl}?role=${formData.role}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Registration successful!");
        toast.success(successMessage);
        // Optionally, you can redirect the user to another page on successful registration
      } else {
        setError(data.error || "Registration failed.");
        toast.error(error);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <Toaster richColors />

      <div className="border-2 border-blue-500 rounded-lg p-8 bg-gray-100 shadow-md">
        <form onSubmit={handleRegistration} className="space-y-4">
          <input
            value={formData.firstName}
            name="firstName"
            type="text"
            className="border-2 p-3 w-full rounded-md"
            placeholder="First Name"
            onChange={handleInputChange}
          />
          <input
            value={formData.lastName}
            name="lastName"
            type="text"
            className="border-2 p-3 w-full rounded-md"
            placeholder="Last Name"
            onChange={handleInputChange}
          />
          <input
            value={formData.username}
            type="text"
            name="username"
            className="border-2 p-3 w-full rounded-md"
            placeholder="Username"
            onChange={handleInputChange}
          />
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
          <div>
            <select
              value={formData.role}
              name="role"
              id="role"
              className="border-2 p-3 w-full rounded-md"
              onChange={handleInputChange}
            >
              <option value="renter">Renter</option>
              <option value="owner">Owner</option>
            </select>
          </div>
          <button
            type="submit"
            className={`bg-blue-500 text-white px-4 py-2 rounded-md ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
            }`}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
      <div>
        <p>
          Already Have Account?{" "}
          <Link href={"#"} className="text-sky-500">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationPage;
