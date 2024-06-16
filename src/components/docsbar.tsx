"use client";
import { useQuery } from "convex/react";
import React from "react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import Title from "./title";
import Banner from "./banner";
import Menu from "./menu";

const DocsBar = ({ documentId }: { documentId: string }) => {
  const document = useQuery(api.documents.getById, {
    documentId: documentId as Id<"documents">,
  });

  if (document === undefined) {
    return (
      <nav className="bg-muted px-4 py-2 w-full flex items-center">
        <Title.Skeleton />
      </nav>
    );
  }
  if (document === null) {
    return <p>null</p>;
  }
  return (
    <>
      <nav className="bg-muted px-6 py-4 w-full flex items-center justify-between gap-x-4">
        <Title initialData={document} />
        <div className="flex items-center gap-x-2">
          <Menu documentId={document._id} />
        </div>
      </nav>
      {document.isArchived && <Banner documentId={document._id} />}
    </>
  );
};

export default DocsBar;
