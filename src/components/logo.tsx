import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { Recursive } from "next/font/google";
const fonts = Recursive({ subsets: ["latin"], weight: ["700"] });

const Logo = () => {
  return (
    <div className="hidden md:flex items-center gap-x-2">
      <Image
        src="/logo.svg"
        height={35}
        width={35}
        alt="Logo"
        className="dark:hidden"
      />
      <Image
        src="/logo-dark.svg"
        height={35}
        width={35}
        alt="Logo"
        className="hidden dark:block"
      />
      <p className={cn("font-semibold text-base", fonts.className)}>Zotion</p>
    </div>
  );
};

export default Logo;
