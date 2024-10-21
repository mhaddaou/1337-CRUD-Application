import { Login } from "../interfaces/login.interface";
import { Register } from "../interfaces/register.interface";


export const registerUser = async (data: Register) => {
  const registerUrl = process.env.NEXT_PUBLIC_REGISTER;
  console.log(registerUrl)
  
  if (!registerUrl) {
    throw new Error("The REGISTER environment variable is not defined.");
  }
  const response = await fetch(registerUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Registration failed');
  }

  return await response.json(); 
};


export const loginUser = async (data: Login) => {
  const registerUrl = process.env.NEXT_PUBLIC_LOGIN;
  console.log(registerUrl)
  
  if (!registerUrl) {
    throw new Error("The Login environment variable is not defined.");
  }
  const response = await fetch(registerUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Login failed');
  }

  return await response.json(); 
};




