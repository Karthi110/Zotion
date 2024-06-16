"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { Loader2, Trash, Undo } from "lucide-react";
import { toast } from "sonner";

import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import ConfirmModal from "./modal/confirm-modal";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Button, buttonVariants } from "./ui/button";

export function TrashBox() {
  const router = useRouter();
  const params = useParams();
  const documents = useQuery(api.documents.getTrash);
  const restore = useMutation(api.documents.restore);
  const remove = useMutation(api.documents.remove);

  const onClick = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  const onRestore = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    documentId: Id<"documents">
  ) => {
    event.stopPropagation();

    const promise = restore({ id: documentId });

    toast.promise(promise, {
      loading: "Restoring note...",
      success: "Note restored!",
      error: "Failed to restore note",
    });
  };

  const onRemove = (documentId: Id<"documents">) => {
    const promise = remove({ id: documentId });

    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Note deleted!",
      error: "Failed to delete note",
    });
    if (params.documentId === documentId) {
      router.push("/documents");
    }
  };

  if (documents === undefined) {
    return (
      <div className="flex h-full items-center justify-center p-4">
        <Loader2 size={34} />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-x-1 p-2">
      <Command className="space-y-2 w-full p-2 border-2 border-dashed">
        <CommandInput placeholder="Type name or search..." />

        <CommandList>
          <CommandEmpty>No documents found</CommandEmpty>
          <CommandGroup heading="documents" className="py-2">
            {documents?.map((document) => (
              <CommandItem asChild key={document._id}>
                <Button
                  variant={"ghost"}
                  onClick={() => onClick(document._id)}
                  className="w-full flex justify-between items-center p-2 mt-2"
                >
                  <span className="truncate">{document.title}</span>
                  <div className="flex gap-2 items-center">
                    <div
                      className="rounded-sm hover:bg-neutral-200
              dark:hover:bg-neutral-600 h-8 w-8 flex items-center justify-center cursor-pointer"
                      onClick={(e) => onRestore(e, document._id)}
                    >
                      <Undo className="text-muted-foreground" size={20} />
                    </div>
                    <ConfirmModal onConfirm={() => onRemove(document._id)}>
                      <Button
                        variant="destructive"
                        size={"icon"}
                        className="h-8 w-8"
                      >
                        <Trash size={20} />
                      </Button>
                    </ConfirmModal>
                  </div>
                </Button>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
}
