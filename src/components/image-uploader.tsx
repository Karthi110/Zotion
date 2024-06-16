"use client";
import { UploadButton, UploadDropzone } from "@/lib/uploadthing";
import React from "react";
import { buttonVariants } from "./ui/button";
import { useParams } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { toast } from "sonner";
import { useCoverImage } from "@/hooks/use-cover-image";
import { deleteImage } from "@/actions/action";

const ImageUploader = () => {
  const params = useParams();
  const coverImage = useCoverImage();
  const update = useMutation(api.documents.update);
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<"documents">,
  });
  const onUpdate = async (imgUrl: string, key: string) => {
    if (document?.coverImgKey) {
      deleteImage(document.coverImgKey);
    }
    const promise = update({
      id: params.documentId as Id<"documents">,
      coverImage: imgUrl,
      coverImgKey: key,
    });

    toast.promise(promise, {
      loading: "Updating the cover image...",
      success: "Cover image updated.",
      error: "Failed to update cover image",
    });
    coverImage.onClose();
  };
  return (
    <>
      <UploadButton
        className={buttonVariants({
          className: "h-20 bg-emerald-500 hover:bg-emerald-400 text-xl w-full",
        })}
        endpoint="imageUploader"
        onClientUploadComplete={([res]) => {
          onUpdate(res.serverData.imageUrl, res.serverData.imgKey);
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          console.log(error);
        }}
      />
    </>
  );
};

export default ImageUploader;
