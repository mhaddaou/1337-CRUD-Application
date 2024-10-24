import { NextRequest, NextResponse } from "next/server";
import prisma from "../lib/prisma/client";

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
  ) {
    try {
      const { id } = params;
  
      const contacts = await prisma.contacts.findMany({
        where: {
          userId: id,
        },
      });
  
      return NextResponse.json({ data: contacts });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred.";
  
      return NextResponse.json({ message: errorMessage }, { status: 400 });
    }
  }