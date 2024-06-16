"use client";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useTheme } from "next-themes";
import { PartialBlock } from "@blocknote/core";
import { UploadButton, uploadFiles } from "@/lib/uploadthing";
import { buttonVariants } from "./ui/button";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

const Editor = ({ onChange, editable, initialContent }: EditorProps) => {
  const editor = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    uploadFile: async (file: File) => {
      const [res] = await uploadFiles("imageUploader", { files: [file] });
      return res.url;
    },
  });
  const { resolvedTheme } = useTheme();

  return (
    <BlockNoteView
      editor={editor}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      formattingToolbar
      onChange={() => onChange(JSON.stringify(editor.document, null, 2))}
      editable
    />
  );
};

export default Editor;
