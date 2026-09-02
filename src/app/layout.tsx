import type { Metadata } from "next";
import "./globals.css";

import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";

import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import Footer from "@/components/layout/Footer";
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
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              
              {/* Sticky Header + Navbar */}
              <div className="sticky top-0 z-50">
                <Header />
                <Navbar />
              </div>

              <main>{children}</main>
              <Footer />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}