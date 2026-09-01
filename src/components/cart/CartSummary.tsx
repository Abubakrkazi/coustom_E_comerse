"use client";

import Link from "next/link";
import { useCart } from "@/hooks/useCart";

export default function CartSummary() {
  const { cartCount, cartTotal } = useCart();

  return (
    <div className="rounded-lg border border-gray-100 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-bold text-gray-900">
        Cart Summary
      </h2>

      <div className="mt-5 space-y-3">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Items</span>
          <span>{cartCount}</span>
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 pt-3">
          <span className="font-semibold text-gray-800">
            Total
          </span>

          <span className="text-xl font-bold text-[#6044f0]">
            ৳ {cartTotal}
          </span>
        </div>
      </div>

      <button
        type="button"
        className="mt-5 w-full rounded-md bg-[#6044f0] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#5035d8]"
      >
        Proceed to Checkout
      </button>

      <Link
        href="/"
        className="mt-3 block w-full rounded-md border border-gray-200 px-4 py-3 text-center text-sm font-semibold text-gray-700 transition hover:border-[#6044f0] hover:text-[#6044f0]"
      >
        Continue Shopping
      </Link>
    </div>
  );
}