"use client";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Error = () => {
  return (
    <div className="w-full h-full">
      <Image
        src="/error.png"
        alt="error"
        width={500}
        height={500}
        className="dark:hidden"
      />
      <Image
        src="/error-dark.png"
        alt="error"
        width={500}
        height={500}
        className="hidden dark:block"
      />
      <h2 className="text-2xl font-medium">Something went wrong</h2>
      <Link href={"/documents"} className={buttonVariants({ size: "lg" })}>
        Go back
      </Link>
    </div>
  );
};

export default Error;
