import QueryClientWrapper from "@/lib/ReactQueryWrapper";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { CookiesProvider } from "next-client-cookies/server";
import { Inter as FontSans } from "next/font/google";
import { Toaster } from "sonner";
import Nav from "../components/Nav";
import SessionWrapper from "../lib/SessionWrapper";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  title: "Cedium",
  description: "Cedium inspired by Medium"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <CookiesProvider>
        <QueryClientWrapper>
          <html lang="en">
            <body
              className={cn(
                "min-h-screen bg-background font-sans antialiased",
                fontSans.variable
              )}
            >
              <Nav />
              {children}
              <Toaster richColors />
            </body>
          </html>
          {/* </QueryClientProvider> */}
        </QueryClientWrapper>
      </CookiesProvider>
    </SessionWrapper>
  );
}
