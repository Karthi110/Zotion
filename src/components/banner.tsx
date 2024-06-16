"use client";
import React from "react";
import { Id } from "../../convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";
import { Button } from "./ui/button";
import ConfirmModal from "./modal/confirm-modal";

const Banner = ({ documentId }: { documentId: Id<"documents"> }) => {
  const router = useRouter();

  const remove = useMutation(api.documents.remove);
  const restore = useMutation(api.documents.restore);

  const onRemove = () => {
    const promise = remove({ id: documentId }).then(() =>
      router.push("/documents")
    );

    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Note Deleted.",
      error: "Failed to delete note.",
    });
  };

  const onRestore = () => {
    const promise = restore({ id: documentId });

    toast.promise(promise, {
      loading: "Restoring note...",
      success: "Note restored.",
      error: "Failed to restore note.",
    });
  };

  return (
    <div className="w-full flex items-center justify-center p-2">
      <div className="w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center max-w-3xl rounded-md">
        <p>This page is in the Trash.</p>
        <Button
          size={"sm"}
          onClick={onRestore}
          variant={"outline"}
          className="text-white hover:text-white bg-emerald-500 hover:bg-emerald-400"
        >
          Restore page
        </Button>
        <ConfirmModal onConfirm={onRemove}>
          <Button
            size={"sm"}
            variant={"outline"}
            className="text-white hover:text-white bg-transparent hover:bg-rose-600"
          >
            Delete forever
          </Button>
        </ConfirmModal>
      </div>
    </div>
  );
};

export default Banner;
