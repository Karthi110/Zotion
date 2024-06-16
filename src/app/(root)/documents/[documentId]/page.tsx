"use client";
import DocsBar from "@/components/docsbar";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import Toolbar from "@/components/toolbar";
import Cover from "@/components/cover";
import Editor from "@/components/editor";

type searchParams = {
  params: { documentId: Id<"documents"> };
};

const Page = ({ params }: searchParams) => {
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId,
  });
  const update = useMutation(api.documents.update);

  const onChange = (content: string) => {
    update({
      id: params.documentId,
      content,
    });
  };

  if (document === undefined) {
    return <div>Loading....</div>;
  }
  if (document === null) {
    return null;
  }
  return (
    <>
      <DocsBar documentId={params.documentId} />
      <Cover url={document?.coverImage} Coverkey={document.coverImgKey} />
      <div className="pb-40 p-6 flex flex-col items-center justify-center">
        <div className="mx-auto w-full">
          <Toolbar initialData={document} />
          <Editor onChange={onChange} initialContent={document.content} />
        </div>
      </div>
    </>
  );
};

export default Page;
