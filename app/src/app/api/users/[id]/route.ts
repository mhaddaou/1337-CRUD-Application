import { NextRequest, NextResponse } from "next/server";
import prisma from "../../lib/prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const user = await prisma.users.findUnique({
      where: { id },
    });
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching user" },
      { status: 400 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await request.json();

  try {
    const updatedUser = await prisma.users.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating user" },
      { status: 500 }
    );
  }
}
