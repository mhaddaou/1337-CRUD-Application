'use client'

import { createTask, updateTask } from "../api/action"


export default function Contacts(){
    
    const handlclick = () =>{
        createTask("new task")
    }
    const handlupdate = () =>{
        updateTask("cm2j1f69c00005a5wxg4h7llq", "update task")
    }
    return (
        <section className="pt-16">
            contacts
            <button onClick={handlclick} className="bg-black text-white px-4 py-2 rounded-lg">click</button>
            <button onClick={handlupdate} className="bg-black text-white px-4 py-2 rounded-lg">update</button>
        </section>
    )
}