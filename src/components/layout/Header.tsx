"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Search,
  ShoppingCart,
  Heart,
  UserRound,
  Menu,
  Phone,
} from "lucide-react";

import MobileMenu from "./MobileMenu";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  return (
    <>
      <header className="w-full bg-white">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="flex min-h-[76px] items-center gap-4 lg:min-h-[84px] lg:gap-6">

            {/* Mobile Menu */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-gray-700 transition hover:bg-gray-100 lg:hidden"
              aria-label="Open menu"
            >
              <Menu size={23} strokeWidth={2} />
            </button>

            {/* Logo */}
            <Link href="/" className="shrink-0" aria-label="Rawaj Shop Home">
              <div className="flex items-center">
                <span className="text-[25px] font-extrabold tracking-[-1.2px] text-[#6044f0] sm:text-[28px] lg:text-[30px]">
                  Rawaj
                </span>

                <span className="ml-1 text-[25px] font-extrabold tracking-[-1.2px] text-gray-800 sm:text-[28px] lg:text-[30px]">
                  Shop
                </span>
              </div>
            </Link>

            {/* Search */}
            <div className="hidden flex-1 md:block">
              <form className="mx-auto flex h-[44px] w-full max-w-[610px] overflow-hidden rounded-[4px] border border-[#dedede] bg-white">
                <input
                  type="search"
                  placeholder="Search products..."
                  className="min-w-0 flex-1 px-4 text-[14px] text-gray-700 outline-none placeholder:text-gray-400"
                />

                <button
                  type="submit"
                  className="flex w-[52px] shrink-0 items-center justify-center bg-[#6044f0] text-white transition hover:bg-[#5035d8]"
                  aria-label="Search"
                >
                  <Search size={20} />
                </button>
              </form>
            </div>

            {/* Order Inquiry */}
            <div className="hidden items-center gap-3 xl:flex">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3f0ff] text-[#6044f0]">
                <Phone size={18} />
              </div>

              <div className="whitespace-nowrap">
                <p className="text-[12px] leading-4 text-gray-500">
                  Order Inquiry
                </p>

                <a
                  href="tel:+8801700000000"
                  className="text-[14px] font-semibold text-gray-800 transition hover:text-[#6044f0]"
                >
                  +880 1700-000000
                </a>
              </div>
            </div>

            {/* Actions */}
            <div className="ml-auto flex items-center gap-1 sm:gap-2">

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="group relative flex h-10 w-10 items-center justify-center rounded-full text-gray-700 transition hover:bg-[#f5f3ff] hover:text-[#6044f0]"
                aria-label="Wishlist"
              >
                <Heart size={21} strokeWidth={1.8} />

                <span className="absolute right-0 top-0 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#6044f0] px-1 text-[9px] font-bold text-white">
                  {wishlistCount}
                </span>
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="group relative flex h-10 w-10 items-center justify-center rounded-full text-gray-700 transition hover:bg-[#f5f3ff] hover:text-[#6044f0]"
                aria-label="Shopping cart"
              >
                <ShoppingCart size={21} strokeWidth={1.8} />

                <span className="absolute right-0 top-0 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#6044f0] px-1 text-[9px] font-bold text-white">
                  {cartCount}
                </span>
              </Link>

              {/* Login */}
              <Link
                href="/login"
                className="hidden items-center gap-2 rounded-md px-2 py-2 text-gray-700 transition hover:bg-gray-100 hover:text-[#6044f0] lg:flex"
              >
                <UserRound size={20} strokeWidth={1.8} />

                <span className="whitespace-nowrap text-[13px] font-medium">
                  Login / Register
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="border-t border-gray-100 px-4 py-3 md:hidden">
          <form className="mx-auto flex h-[42px] max-w-[600px] overflow-hidden rounded-[4px] border border-[#dedede] bg-white">
            <input
              type="search"
              placeholder="Search products..."
              className="min-w-0 flex-1 px-3 text-[13px] text-gray-700 outline-none placeholder:text-gray-400"
            />

            <button
              type="submit"
              className="flex w-[48px] shrink-0 items-center justify-center bg-[#6044f0] text-white"
              aria-label="Search"
            >
              <Search size={19} />
            </button>
          </form>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  );
}

