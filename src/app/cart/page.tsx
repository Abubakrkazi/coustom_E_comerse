"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";

import { useCart } from "@/hooks/useCart";

export default function CartPage() {
  const {
    cartItems,
    cartCount,
    cartTotal,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#f1efff]">
              <ShoppingBag size={36} className="text-[#6044f0]" />
            </div>

            <h1 className="mt-6 text-2xl font-bold text-gray-900">
              Your Cart is Empty
            </h1>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              You haven't added any products to your cart yet. Start shopping
              and add your favorite products.
            </p>

            <Link
              href="/"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#6044f0] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#5035d8]"
            >
              Start Shopping
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8 sm:py-10">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mb-7">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#6044f0]"
          >
            <ArrowLeft size={17} />
            Continue Shopping
          </Link>

          <div className="mt-5 flex items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Shopping Cart
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                {cartCount} {cartCount === 1 ? "item" : "items"} in your cart
              </p>
            </div>

            <button
              type="button"
              onClick={clearCart}
              className="inline-flex items-center gap-2 text-sm font-medium text-red-500 transition hover:text-red-600"
            >
              <Trash2 size={16} />
              Clear Cart
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          {/* Cart Items */}
          <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="divide-y divide-gray-100">
              {cartItems.map((item) => (
                <article
                  key={item.id}
                  className="flex gap-4 p-4 sm:p-5"
                >
                  {/* Product Image */}
                  <Link
                    href={`/products/${item.slug}`}
                    className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-28 sm:w-28"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  </Link>

                  {/* Product Information */}
                  <div className="min-w-0 flex-1">
                    <Link href={`/products/${item.slug}`}>
                      <h2 className="line-clamp-2 text-sm font-semibold text-gray-800 transition hover:text-[#6044f0] sm:text-base">
                        {item.name}
                      </h2>
                    </Link>

                    <p className="mt-2 text-sm font-bold text-[#6044f0]">
                      ৳ {item.price}
                    </p>

                    {/* Quantity */}
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <div className="flex items-center overflow-hidden rounded-lg border border-gray-200">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="flex h-9 w-9 items-center justify-center text-gray-600 transition hover:bg-gray-50"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={15} />
                        </button>

                        <span className="flex h-9 min-w-10 items-center justify-center border-x border-gray-200 px-3 text-sm font-semibold text-gray-800">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="flex h-9 w-9 items-center justify-center text-gray-600 transition hover:bg-gray-50"
                          aria-label="Increase quantity"
                        >
                          <Plus size={15} />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-red-500 transition hover:text-red-600"
                      >
                        <Trash2 size={15} />
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Item Total */}
                  <div className="hidden text-right sm:block">
                    <p className="text-xs text-gray-400">Total</p>

                    <p className="mt-1 text-base font-bold text-gray-900">
                      ৳ {item.price * item.quantity}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Summary */}
          <aside className="h-fit rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-bold text-gray-900">
              Order Summary
            </h2>

            <div className="mt-5 space-y-3">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Items</span>
                <span>{cartCount}</span>
              </div>

              <div className="flex justify-between text-sm text-gray-500">
                <span>Subtotal</span>
                <span>৳ {cartTotal}</span>
              </div>

              <div className="flex justify-between text-sm text-gray-500">
                <span>Delivery</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
            </div>

            <div className="my-5 border-t border-gray-100" />

            <div className="flex items-center justify-between">
              <span className="text-base font-semibold text-gray-800">
                Total
              </span>

              <span className="text-xl font-bold text-[#6044f0]">
                ৳ {cartTotal}
              </span>
            </div>

            <Link
              href="/checkout"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#6044f0] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#5035d8]"
            >
              Proceed to Checkout
              <ArrowRight size={17} />
            </Link>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
              <ShoppingBag size={14} />
              Secure checkout
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}