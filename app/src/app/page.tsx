"use client";

import { Button } from "@nextui-org/react";
import { TextGenerateEffect } from "./components/ui/text-generate-effect";
import { useEffect, useState } from "react";
import { BottomGradient } from "./components/main/SignupForm";
import { useRouter } from "next/navigation";

const words = `Welcome to Contaxly
Effortlessly manage your connections with Contaxly. Our intuitive contact management app simplifies the way you store, organize, and retrieve contact information. With a sleek design and powerful features, Contaxly allows you to seamlessly add, edit, and delete contacts, ensuring you always have your important connections at your fingertips.

Worried about losing your phone? With Contaxly, your contacts and your future are secure. Rest easy knowing that your important connections are backed up and accessible anytime, anywhere. Stay organized and never miss an opportunity to connect—experience the future of contact management today!
`;

export default function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handStarted = () => {
    setLoading(true);
    const id = localStorage.getItem("id");
    router.push(id ? "/contacts" : "/auth");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 18600);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="w-screen h-screen">
      <div className="w-full h-full container  flex items-center justify-center">
        <div className="max-w-xl">
          <TextGenerateEffect words={words} />
          {isVisible && (
            <Button
              onClick={handStarted}
              isLoading={loading}
              className=" mt-8 bg-gradient-to-br max-w-xs flex py-1 relative  from-black  to-neutral-600   w-full text-white rounded-md h-12
              
               font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
            >
              <p className="">Get Started Today &rarr;</p>
              <BottomGradient />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
