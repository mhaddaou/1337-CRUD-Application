import prisma from "@/app/api/lib/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const limit = Number(process.env.LIMIT);
    const page = await request.json();

    const pageNumber = Math.max(1, page);
    const offset = (pageNumber - 1) * limit;

    const count = await prisma.contacts.count({
      where: {
        userId: id,
      },
    });

    const totalPage = Math.ceil(count / limit);

    const contacts = await prisma.contacts.findMany({
      where: {
        userId: id,
      },
      skip: offset,
      take: limit,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(
      { message: "Get contacts successfully", data: contacts, totalPage },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred.";

    return NextResponse.json({ message: errorMessage }, { status: 400 });
  }
}
