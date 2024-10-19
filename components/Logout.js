"use client";
import { useAuth } from "@/context/AuthContect";
import React from "react";

export default function Logout() {
  const { logout, currentUser } = useAuth();
  if (!currentUser) {
    return null;
  }
  return (
    <button
      className={
        "flex items-center justify-between text-base sm:text-lg textGradient "
      }
      onClick={async () => await logout()}
    >
      <h1>Log out</h1>
    </button>
  );
}
