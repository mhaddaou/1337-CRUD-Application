import ContactSkeleton from "../sub/Skeleton";

export default function DisplaySkeleton(){
    return (
        <div className=" flex overflow-x-hidden flex-col w-full px-2  md:w-[90%] mx-auto md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 py-4">
           <div className="w-full border-[0.5px] border-black/20 bg-white rounded-md">
            <ContactSkeleton/>
            <ContactSkeleton/>
            <ContactSkeleton/>
            <ContactSkeleton/>

           </div>
        </div>
    )
}