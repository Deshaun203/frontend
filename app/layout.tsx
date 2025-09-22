import '@ant-design/v5-patch-for-react-19';
import type { Metadata } from "next";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Geist, Geist_Mono, Inter, Outfit, Poppins, Ubuntu } from "next/font/google";
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
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
   display: "swap",
});

const outfit = Outfit({
  weight: ["400","700"],
  variable: "--font-outfit",
  subsets: ["latin"],
   display: "swap",
});

const ubuntu = Ubuntu({
  weight: ["400","700"],
  variable: "--font-ubuntu",
  subsets: ["latin"],
   display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
   display: "swap",
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
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${outfit.variable} ${ubuntu.variable}${inter.variable} antialiased`}
      >
       
        <AntdRegistry>{children}</AntdRegistry>
         <Toaster toastOptions={{className: "font-outfit"}} position="top-right"/>
      </body>
     
    </html>
  );
}
