"use client";
import Navigation from "@/components/navigation";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useConvexAuth } from "convex/react";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  // if (isLoading)
  //   return (
  //     <div className="w-full h-full flex flex-col items-center justify-center">
  //       <Loader2 className="text-primary animate-spin" size={40} />
  //     </div>
  //   );
  if (!isAuthenticated) return redirect("/");
  return (
    <ResizablePanelGroup
      className="h-full flex dark:bg-[#1F1F1F]"
      direction="horizontal"
    >
      <Navigation />
      <ResizableHandle className="border-2 rounded-lg" />
      <ResizablePanel className="flex h-full">
        <ScrollArea className="flex-1 h-full">{children}</ScrollArea>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default layout;
