import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Navbar />
      <main className="h-full pt-40 container mx-auto">
        {children}
        <Footer />
      </main>
    </div>
  );
};

export default Layout;
