import React from "react";
import Logo from "./logo";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

const Footer = () => {
  return (
    <div className="container mx-auto flex items-center justify-between px-4 py-10">
      <Logo />
      <div className="flex items-center justify-center">
        <Link href={"#"} className={buttonVariants({ variant: "ghost" })}>
          Privacy Policy
        </Link>
        <Link href={"#"} className={buttonVariants({ variant: "ghost" })}>
          Terms and Condition
        </Link>
      </div>
    </div>
  );
};

export default Footer;
