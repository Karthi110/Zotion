import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { ImageIcon, X } from "lucide-react";
import { useCoverImage } from "@/hooks/use-cover-image";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "../../convex/_generated/dataModel";
import { deleteImage } from "@/actions/action";
import { toast } from "sonner";

interface CoverImageProps {
  url?: string;
  preview?: boolean;
  Coverkey?: string;
}

const Cover = ({ preview, url, Coverkey }: CoverImageProps) => {
  const coverImage = useCoverImage();
  const params = useParams();
  const removeCoverImage = useMutation(api.documents.removeCoverImage);

  const onRemove = () => {
    deleteImage(Coverkey!);
    const promise = removeCoverImage({
      id: params.documentId as Id<"documents">,
    });
    toast.promise(promise, {
      loading: "Deleting Cover image...",
      success: "Cover image deleted!",
      error: "Failed to delete cover image.",
    });
  };
  return (
    <div
      className={cn(
        "relative w-full h-[30vh] group",
        !url && "h-[20vh]",
        url && "bg-muted"
      )}
    >
      {!!url && (
        <Image
          src={url}
          alt="Cover"
          fill
          className="object-cover rounded-t-lg"
        />
      )}

      {url && !preview && (
        <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
          <Button
            className="text-muted-foreground"
            variant="outline"
            size="sm"
            onClick={coverImage.onOpen}
          >
            <ImageIcon />
            Change cover
          </Button>
          <Button
            className="text-muted-foreground"
            variant="outline"
            size="sm"
            onClick={onRemove}
          >
            <X />
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cover;
