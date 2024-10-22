"use client";

import Image from "next/image";
import prisma from "./lib/db";
import { useState } from "react";

export default function Home() {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="   bg-red-600 w-screen h-screen pt-16">
      <div className="container w-full h-full"></div>
    </div>
  );
}
