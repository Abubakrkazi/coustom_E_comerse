
import type { Metadata } from "next";

import "./globals.css";

import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";

import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";

export const metadata: Metadata = {
  title: "Rawaj Shop",
  description: "HT Bazar - Online Shopping",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <WishlistProvider>
            <Header />
            <Navbar />

            <main>{children}</main>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}

