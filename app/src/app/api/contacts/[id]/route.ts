import { NextRequest, NextResponse } from "next/server";
import prisma from "../../lib/prisma/client";
import { CreateContact } from "@/app/lib/interfaces/create-contact.interface";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const {
      name,
      email,
      phone,
      company,
      jobTitle,
      address,
      category,
      note,
      vip,
    }: CreateContact = await request.json();

    // check if contact already exist
    const contact = await prisma.contacts.findUnique({
      where: {
        userId: id,
        phone,
      },
    });
    if (contact) throw new Error("Contact number already exist");

    // create new contact
    const newContact = await prisma.contacts.create({
      data: {
        name,
        email,
        phone,
        company,
        jobTitle,
        address,
        category,
        note,
        vip,
        userId: id,
      },
    });

    return NextResponse.json(
      { message: "contact created successfully", data: newContact },
      { status: 201 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred.";

    return NextResponse.json({ message: errorMessage }, { status: 400 });
  }
}


// GET all contacts
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