'use server'

import prisma from "../lib/db"


export async function createTask(title : string) {
    // await prisma.task.create({
    //     data:{
    //         title,
    //         completed: false,
    //     }
    // })

}


export async function updateTask(id : string, title : string) {
    // return  await prisma.task.update({
    //     where: {id},
    //     data:{title: title}
    // })

}