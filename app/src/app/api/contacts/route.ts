import { NextRequest, NextResponse } from "next/server";
import prisma from "../lib/prisma/client";

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
  ) {
    try {
      const { id } = params;
      console.log('im here for fetching users')
  
      const contacts = await prisma.contacts.findMany({
        where: {
          userId: id,
        },
      });
      console.log(contacts);
  
      return NextResponse.json({ data: contacts });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred.";
  
      return NextResponse.json({ message: errorMessage }, { status: 400 });
    }
  }