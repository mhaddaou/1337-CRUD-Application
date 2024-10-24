import { NextRequest, NextResponse } from "next/server";
import prisma from "../../lib/prisma/client";
import { ComparePassword } from "../../lib/utils/utils/hashAndCompare";
import { Login } from "@/app/lib/interfaces/login.interface";

export async function POST(request: NextRequest) {
  try {
    const { email, password }: Login = await request.json();
    const message =
      "Incorrect email or password. Please check your credentials and try again.";
    // check email already exist
    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    });
    if (!user) throw new Error(message);

    // Validate password and respond or throw an error.
    return (await ComparePassword(user.password, password))
      ? NextResponse.json(
          { message: "User signed in successfully", user },
          { status: 201 }
        )
      : (() => {
          throw new Error(message);
        })();
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred.";

    return NextResponse.json({ message: errorMessage }, { status: 400 });
  }
}
