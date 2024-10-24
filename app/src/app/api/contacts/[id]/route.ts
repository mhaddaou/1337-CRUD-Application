import { NextRequest, NextResponse } from "next/server";
import prisma from "../../lib/prisma/client";
import { CreateContact } from "@/app/lib/interfaces/create-contact.interface";

// create contact
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

// GET all contacts for user
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

// Update contact
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const { data, idContact } = await request.json();

    // find the contact is already in the database
    const contact = await prisma.contacts.findUnique({
      where: {
        userId: id,
        id: idContact,
      },
    });
    if (!contact) throw new Error("Contact not found");

    // update the contact
    const newContact = await prisma.contacts.update({
      where: {
        id: contact.id,
      },
      data,
    });
    return NextResponse.json({
      message: "Contact updated successfuly",
      data: newContact,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred.";

    return NextResponse.json({ message: errorMessage }, { status: 400 });
  }
}

// Delete contact
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const idContact  = await request.json();

    // find the contact is already in the database
    const contact = await prisma.contacts.delete({
      where: {
        userId: id,
        id: idContact,
      },
    });

    return NextResponse.json({
      message: "Contact deleted successfuly",
      data: contact,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred.";

    return NextResponse.json({ message: errorMessage }, { status: 400 });
  }
}
