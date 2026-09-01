
"use client";

import Link from "next/link";
import { CheckCircle, ShoppingBag, ArrowRight } from "lucide-react";

export default function OrderSuccessPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto flex max-w-2xl justify-center">
        <div className="w-full overflow-hidden rounded-2xl bg-white shadow-sm">
          {/* Success Header */}
          <div className="flex flex-col items-center px-6 py-10 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <CheckCircle
                size={46}
                className="text-green-600"
                strokeWidth={2}
              />
            </div>

            <h1 className="mt-6 text-3xl font-bold text-gray-900">
              Order Placed Successfully!
            </h1>

            <p className="mt-3 max-w-md text-sm leading-6 text-gray-500">
              Thank you for your order. We have received your order and will
              process it shortly.
            </p>

            {/* Order Status */}
            <div className="mt-6 w-full rounded-xl border border-gray-100 bg-gray-50 p-5">
              <div className="flex items-center justify-center gap-3">
                <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
                <span className="text-sm font-semibold text-gray-800">
                  Order Confirmed
                </span>
              </div>

              <p className="mt-2 text-xs text-gray-500">
                Your order is now being prepared.
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100" />

          {/* Actions */}
          <div className="grid gap-3 p-6 sm:grid-cols-2">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              <ShoppingBag size={18} />
              Continue Shopping
            </Link>

            <Link
              href="/collections/trending"
              className="flex items-center justify-center gap-2 rounded-xl bg-[#6044f0] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#5035d8]"
            >
              Explore Products
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

