"use client";
import useScrollTop from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import Logo from "./logo";
import { ModeToggle } from "./mode-toggle";
import { Button, buttonVariants } from "./ui/button";
import {
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { SignedIn } from "@clerk/clerk-react";

const Navbar = () => {
  const scrolled = useScrollTop();
  const { isLoading } = useConvexAuth();
  return (
    <div
      className={cn(
        "z-50 bg-background fixed top-0 flex items-center w-full p-4",
        scrolled && "border-b-2 shadow-sm"
      )}
    >
      <div className="flex justify-between container mx-auto ">
        <Logo />
        <aside className="flex items-center justify-center gap-4 transition-all">
          {isLoading ? (
            <span className="bg-secondary h-10 rounded-lg animate-pulse w-40 inline-flex items-center justify-center">
              <Loader2 className="animate-spin" size={24} />
            </span>
          ) : (
            <>
              <SignedIn>
                <Link href={"/documents"} className={buttonVariants()}>
                  Documents
                </Link>
                <UserButton />
              </SignedIn>

              <SignedOut>
                <SignInButton mode="modal">
                  <Button variant={"outline"} className="text-base font-bold">
                    Login
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button className="text-base">Get started</Button>
                </SignUpButton>
              </SignedOut>
            </>
          )}
          <ModeToggle />
        </aside>
      </div>
    </div>
  );
};

export default Navbar;
