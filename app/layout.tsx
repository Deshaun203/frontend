import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit, Poppins, Ubuntu } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ["400","700"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

const outfit = Outfit({
  weight: ["400","700"],
  variable: "--font-outfit",
  subsets: ["latin"],
});

const ubuntu = Ubuntu({
  weight: ["400","700"],
  variable: "--font-ubuntu",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Daemon S",
  description: "In-house Data Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${outfit.variable} ${ubuntu.variable} antialiased`}
      >
        {children}
         <Toaster/>
      </body>
     
    </html>
  );
}
