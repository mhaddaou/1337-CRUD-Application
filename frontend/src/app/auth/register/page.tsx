"use client";

import { SignupForm } from "@/app/components/main/SignupForm";
import Image from "next/image";
import { useState } from "react";

export default function Register() {
  // const tasks = await prisma.task.findMany()
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className=" w-screen min-h-screen     overflow-x-hidden  bg-background py-12">
      <div className="w-full h-full container ">
        <div className="w-full flex items-center justify-center  h-full">
          <div className="w-full  ">
            <SignupForm />
          </div>
        </div>
      </div>
    </div>
  );
}
