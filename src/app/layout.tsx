import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ResponseProvider } from "@/context/ResponseContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Timetabling - Algoritmos Genéticos",
  description: "Todos os direitos reservados.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased`} 
      >
        <ResponseProvider>
          {children}
        </ResponseProvider>
      </body>
    </html>
  );
}

