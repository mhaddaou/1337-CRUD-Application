// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../lib/prisma/client";
import { HashPassword } from "../../lib/utils/utils/hashAndCompare";
import { Register } from "@/app/lib/interfaces/register.interface";

export async function POST(request: NextRequest) {
  try {
    const { firstname, lastname, email, password, confirmPassword }: Register =
      await request.json();

    // check email already in use
    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    });
    if (user) throw new Error("email is already in use");

    // Check if password and confirmPassword match
    if (password !== confirmPassword)
      throw new Error("Passwords do not match. Please try again.");

    // Hash the password before storing it in the database
    const hashedPassword = await HashPassword(password);

    // Create a new user in the database
    const newUser = await prisma.users.create({
      data: {
        firstname,
        lastname,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "User registered successfully", user: newUser},
      { status: 201 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred.";

    return NextResponse.json({ message: errorMessage }, { status: 400 });
  }
}
