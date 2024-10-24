import prisma from "@/app/api/lib/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { page, query } = await request.json(); // Expecting 'page' and 'name' from the request body
    const limit = 10;
    const offset = (page - 1) * limit;

    // Count total contacts for pagination
    const count = await prisma.contacts.count({
      where: {
        userId: id,
        name: {
          contains: query, // Search by partial match in the 'name' field
          mode: 'insensitive', // Case-insensitive search
        },
      },
      
      
    });

    const totalPage = Math.ceil(count / limit);

    // Fetch contacts with pagination and search filter
    const contacts = await prisma.contacts.findMany({
      where: {
        userId: id,
        name: {
          contains: query, // Search by partial match in the 'name' field
          mode: 'insensitive', // Case-insensitive search
        },
        
      },
      skip: offset,
      take: limit,
      orderBy: { createdAt: "desc" },
    });


    return NextResponse.json(
      { message: "Get contacts successfully", data: contacts, totalPage },
      { status: 201 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred.";

    return NextResponse.json({ message: errorMessage }, { status: 400 });
  }
}
