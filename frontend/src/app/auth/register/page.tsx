import { SignupForm } from "@/app/components/main/SignupForm";

export default function Register() {
  return (
    <div className=" w-screen min-h-screen     overflow-x-hidden bg-background flex justify-center items-center ">
      <div className="w-full h-full container ">
            <SignupForm />
      </div>
    </div>
  );
}
