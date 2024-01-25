"use client";
import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Dashboard from "@/Components/Dashboard";

const page = () => {
  const router = useRouter();
  const { user, isOwner } = useSelector((state) => state.auth);
  if (!user) {
    router.push("/signin");
  }
  if (user && !isOwner) {
    router.push("/");
  }
  return (
    <div>
      <Dashboard />
    </div>
  );
};

export default page;
