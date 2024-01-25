"use client";
import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const { user, isOwner } = useSelector((state) => state.auth);
  if (!user) {
    router.push("/signin");
  }
  if (user && !isOwner) {
    router.push("/");
  }
  return <div>dashboard</div>;
};

export default page;
