"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loading from "../components/ui/loadin";
export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/auth/register");
  });

  return (
    <div className=" w-screen h-screen  overflow-x-hidden  bg-background pt-16 flex items-center justify-center">
      <Loading />
    </div>
  );
}
