"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import React from "react";
import { api } from "../../../../convex/_generated/api";
import { toast } from "sonner";

const DocumentsPage = () => {
  const { user } = useUser();
  const create = useMutation(api.documents.create);

  const onCreate = () => {
    const promise = create({ title: "Untitled" });

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note.",
    });
  };
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        src={"/empty.png"}
        alt="empty"
        width={300}
        height={300}
        className="dark:hidden"
      />
      <Image
        src={"/empty-dark.png"}
        alt="empty"
        width={300}
        height={300}
        className="hidden dark:block"
      />
      <h2>welcome to {user?.fullName}</h2>
      <Button onClick={onCreate}>
        Create Document <PlusCircle className="ml-2" />
      </Button>
    </div>
  );
};

export default DocumentsPage;
