import prisma from "../lib/db";
import { Register } from "../lib/interfaces/register.interface";
import { HashPassword } from "./utils/hashAndCompare";

export async function createUser(registerData: Register) {
  try {
    // check if email already exists
    const user = await prisma.users.findUnique({
      where: { email: registerData.email },
    });
    if (user) throw new Error("email already exists");
    
    // hashing password
    const passwordHash = await HashPassword(registerData.password);
    console.log(passwordHash);
    // return await prisma.users.create({ data: registerData });
  } catch (e) {
    if(e instanceof Error){
        console.log(e.message, 'this is the error');
      return e.message;
    }
  }

  // return  await prisma.task.update({
  //     where: {id},
  //     data:{title: title}
  // })
}
