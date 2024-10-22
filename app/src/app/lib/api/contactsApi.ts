import { CreateContact } from "../interfaces/create-contact.interface";

export const createContact = async (data: CreateContact) => {
    const  id = localStorage.getItem('id');
    const registerUrl = process.env.NEXT_PUBLIC_CONTACTS ;
    console.log(registerUrl)
    
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
      throw new Error(errorData.message || 'Create contact failed');
    }
  
    return await response.json(); 
  };


  export const getContacts = async () => {
    const  id = localStorage.getItem('id');
    const registerUrl = process.env.NEXT_PUBLIC_CONTACTS ;
    
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
      throw new Error(errorData.message || 'Get contacts failed');
    }
  
    return await response.json(); 
  };
  