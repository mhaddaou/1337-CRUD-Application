import { CreateContact } from "../interfaces/create-contact.interface";

export const createContact = async (data: CreateContact) => {
  const id = localStorage.getItem("id");
  const registerUrl = process.env.NEXT_PUBLIC_CONTACTS;

  if (!registerUrl) {
    throw new Error("The contacts environment variable is not defined.");
  }
  const response = await fetch(registerUrl + id, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Create contact failed");
  }

  return await response.json();
};

export const getContacts = async () => {
  const id = localStorage.getItem("id");
  const registerUrl = process.env.NEXT_PUBLIC_CONTACTS;

  if (!registerUrl) {
    throw new Error("The contacts environment variable is not defined.");
  }
  const response = await fetch(registerUrl + id, {
    method: "Get",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Get contacts failed");
  }

  return await response.json();
};

export const updateContactApi = async (
  data: CreateContact,
  idContact: string | undefined
) => {
  const id = localStorage.getItem("id");
  const registerUrl = process.env.NEXT_PUBLIC_CONTACTS;

  if (!registerUrl)
    throw new Error("The contacts environment variable is not defined.");
  const response = await fetch(registerUrl + id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data, idContact }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Update contact failed");
  }

  return await response.json();
};

export const deleteContactApi = async (idContact: string | undefined) => {
  const id = localStorage.getItem("id");
  const registerUrl = process.env.NEXT_PUBLIC_CONTACTS;

  if (!registerUrl)
    throw new Error("The contacts environment variable is not defined.");
  const response = await fetch(registerUrl + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(idContact),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Delete contact failed");
  }

  return await response.json();
};


export const getPaginationContact = async (page: number) => {
  const id = localStorage.getItem("id");
  const registerUrl = process.env.NEXT_PUBLIC_PAGINATION;

  if (!registerUrl) {
    throw new Error("The pagination contact environment variable is not defined.");
  }
  const response = await fetch(registerUrl + id, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(page),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Get pagination contacts failed");
  }

  return await response.json();
};


export const getSearchContact = async (page: number, query : string) => {
  const id = localStorage.getItem("id");
  const registerUrl = process.env.NEXT_PUBLIC_SEARCH;

  if (!registerUrl) {
    throw new Error("The pagination contact environment variable is not defined.");
  }
  const response = await fetch(registerUrl + id, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({page, query}),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Get pagination contacts failed");
  }

  return await response.json();
};

