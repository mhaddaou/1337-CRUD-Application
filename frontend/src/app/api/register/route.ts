// app/api/register/route.ts
import { Register } from "@/app/lib/interfaces/register.interface";
import { NextResponse } from "next/server";
import { HashPassword } from "../utils/hashAndCompare";
import prisma from "@/app/lib/db";
import { checkPassword } from "../utils/checkPassword";

export async function POST(request: Request) {
  try {
    const registerData: Register = await request.json();

    // check password is the same as confirm password
    // if (!checkPassword(registerData.password, registerData.confirmPassword))
    //   throw new Error("Password and confirm password do not match");
    const res = checkPassword(registerData.password, registerData.confirmPassword);
    if(!res) throw new Error('Password and confirm password do not match')

    // check if email already exists
    const user = await prisma.users.findUnique({
      where: {
        email: registerData.email,
      },
    });
    if (user) throw new Error("Email already exists");

    console.log(registerData);
    // Hash the password
    const hashedPassword = await HashPassword(registerData.password);

    // Here you would save the username and hashedPassword to your database
    // Example: await db.users.insert({ username, password: hashedPassword });

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (err) {
    if (err instanceof Error) {
        return NextResponse.json({ message: err.message }, { status: 400 });
    }
  }
}
