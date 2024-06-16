import { buttonVariants } from "@/components/ui/button";
import { ArrowRightCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="max-w-4xl text-3xl md:text-7xl font-bold text-center">
          Your Ideas, Documents & Plans Unified.
          <br /> Welcome to <span className="underline">Zotion</span>
        </h1>
        <h3 className="text-base md:text-xl font-semibold text-muted-foreground">
          Zotion is the connected workspace where better, faster work happens.
        </h3>
        <Link
          href={"/documents"}
          className={buttonVariants({ size: "lg", className: "text-xl" })}
        >
          Get Started <ArrowRightCircle className="ml-2" />
        </Link>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-around p-20">
        <Image
          src="/documents.png"
          alt="documents"
          width={500}
          height={500}
          className="object-contain dark:hidden"
        />
        <Image
          src="/documents-dark.png"
          alt="documents"
          width={500}
          height={500}
          className="object-contain hidden dark:block"
        />
        <Image
          src="/reading.png"
          alt="reading"
          width={500}
          height={500}
          className="object-contain hidden md:block dark:hidden"
        />
        <Image
          src="/reading-dark.png"
          alt="reading"
          width={500}
          height={500}
          className="object-contain hidden md:dark:block"
        />
      </div>
    </div>
  );
}
