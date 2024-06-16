"use server";

import { UTApi } from "uploadthing/server";

export const deleteImage = async (key: string) => {
  const utapi = new UTApi();
  await utapi.deleteFiles(key);
};
