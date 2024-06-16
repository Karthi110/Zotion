"use-client";
import ImageUploader from "../image-uploader";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { useCoverImage } from "@/hooks/use-cover-image";

const CoverImageModal = () => {
  const coverImage = useCoverImage();
  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader className="border-b pb-3">
          <h2 className="text-center text-lg font-semibold">Cover Image</h2>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center p-2 w-full">
          <ImageUploader />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CoverImageModal;
