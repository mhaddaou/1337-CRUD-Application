"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "@nextui-org/react";
import { cn } from "@/app/lib/utils";
import { toast } from "sonner";
import { registerUser } from "@/app/lib/api/authApi";
import { useRouter } from "next/navigation";
import { User } from "@/app/lib/interfaces/User.interface";
import { useAppDispatch } from "@/app/lib/redux/hooks";
import { updateUser } from "@/app/lib/redux/features/user/userSLice";
import Link from "next/link";
export function SignupForm() {
  const dispatch = useAppDispatch();

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const resetForm = () => {
    setFormValues({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await registerUser(formValues);
      toast.success(result.message);
      const user : User = await result.user;
      dispatch(updateUser(user));
      router.push('/contacts');
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-light ">
      <h2 className="font-bold text-xl text-neutral-800 ">
        Welcome to Contaxly
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2  tracking-wide leading-relaxed">
        Join now to easily manage and organize all your contacts in one place.
        Simplify your networking and stay connected effortlessly yet
      </p>

      <form className="my-8 space-y-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input
              id="firstname"
              placeholder="Tyler"
              type="text"
              name="firstname"
              value={formValues.firstname}
              onChange={handleChange}
              required
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input
              id="lastname"
              placeholder="Durden"
              type="text"
              name="lastname"
              value={formValues.lastname}
              onChange={handleChange}
              required
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="projectmayhem@fc.com"
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            required
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            required
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="confirmpassword">Confirm password</Label>
          <Input
            id="confirmpassword"
            placeholder="••••••••"
            type="password"
            name="confirmPassword"
            value={formValues.confirmPassword}
            onChange={handleChange}
            required
          />
        </LabelInputContainer>

        <Button
          isLoading={loading}
          className="bg-gradient-to-br flex py-1 relative  from-black  to-neutral-600   w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          <p className="">Sign up &rarr;</p>
          <BottomGradient />
        </Button>

        <div>
          <p className="text-neutral-600 text-sm max-w-sm mt-2  tracking-wide leading-relaxed">
            Already have an account?{" "}
            <Link
              href='/auth/login'
              
              className="text-black font-semibold underline "
            >
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
