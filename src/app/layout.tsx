import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import ConvexClientProvider from "@/components/providers/convex-provider";
import { Toaster } from "@/components/ui/sonner";
import ModalProvider from "@/components/providers/modal-provider";

const fonts = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zotion",
  description: "Connected workspace!",
  icons: {
    icon: [
      {
        url: "/logo-dark.svg",
        href: "/logo-dark.svg",
        sizes: "14px",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={fonts.className}>
        <ConvexClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
            storageKey="zotion-theme"
          >
            <ModalProvider />
            {children}
            <Toaster position="bottom-center" richColors />
          </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
