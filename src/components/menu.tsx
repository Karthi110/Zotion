"use client";
import React from "react";
import { Id } from "../../convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button, buttonVariants } from "./ui/button";
import { MoreHorizontal, Trash } from "lucide-react";

const Menu = ({ documentId }: { documentId: Id<"documents"> }) => {
  const router = useRouter();
  const { user } = useUser();

  const archive = useMutation(api.documents.archive);

  const onArchive = () => {
    const promise = archive({ id: documentId });

    toast.promise(promise, {
      loading: "Moving to trash....",
      success: "Note moved to trash!",
      error: "Failed to archive note.",
    });
    router.push("/documents");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="ghost">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-52 p-2"
        align="start"
        alignOffset={8}
        forceMount
      >
        <DropdownMenuItem
          className={buttonVariants({
            variant: "destructive",
            className: "w-full",
          })}
        >
          <Trash size={20} className="mr-2" /> Delete
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="text-sm text-muted-foreground p-1">
          Last edited by : {user?.fullName}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Menu;
