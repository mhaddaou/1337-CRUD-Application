import {Skeleton} from "@nextui-org/react";

export default function ContactSkeleton() {
  return (
    <div className=" w-full   border-b  ">
      <div className="w-full flex items-center  justify-around gap-3  p-4 ">
      <div className=" flex  items-center gap-4 ">
        <Skeleton className="flex rounded-full w-12 h-12"/>
      <div className=" flex flex-col gap-2">
        <Skeleton className="h-3 w-28 rounded-lg"/>
        <Skeleton className="h-3 w-44 rounded-lg"/>
      </div>
        </div>  
        <Skeleton className="h-3 w-28 rounded-lg"/>
        <Skeleton className="h-3 w-28 rounded-lg"/>
        <Skeleton className="h-3 w-16 rounded-lg"/>
        <div className="flex gap-2">
        <Skeleton className="h-5 w-5 rounded-full"/>
        <Skeleton className="h-5 w-5 rounded-full"/>
        <Skeleton className="h-5 w-5 rounded-full"/>

        </div>
     
      

      </div>
    </div>
  );
}