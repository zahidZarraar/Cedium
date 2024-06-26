import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loader = () => {
    return (
        <div className="py-24 flex flex-col space-y-20">
            <div className="flex items-center flex-col space-y-3">
                <Skeleton className="h-[120px] w-[120px] rounded-full" />
                <div className="space-y-2 flex  flex-col items-center">
                    <Skeleton className="h-4 rounde-full w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            </div>
            <div className="space-y-5 w-[60%] mx-auto">
                <Skeleton className="flex-1 w-full h-[70px] rounded-md" />
                <Skeleton className="w-full flex-[0.3] h-[20px] rounded-full" />
                <Skeleton className="flex-1 w-full h-[70px] rounded-md" />
                <Skeleton className="flex-1 w-full h-[70px] rounded-md" />
                <Skeleton className="flex-1 w-full h-[70px] rounded-md" />
                <Skeleton className="w-full flex-[0.3] h-[20px] rounded-full" />
            </div>
        </div>
    );
};

export default Loader;
