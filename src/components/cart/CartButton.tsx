"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";

import { useCart } from "@/context/CartContext";

export default function CartButton() {
  const { cartCount } = useCart();

  return (
    <Link
      href="/cart"
      aria-label="Shopping Cart"
      className="relative flex items-center"
    >
      <ShoppingCart size={22} />

      {cartCount > 0 && (
        <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#6044f0] px-1 text-[10px] font-bold text-white">
          {cartCount}
        </span>
      )}
    </Link>
  );
}