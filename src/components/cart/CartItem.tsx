"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";

import { CartItem as CartItemType } from "@/types/cart";
import { useCart } from "@/hooks/useCart";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const {
    updateQuantity,
    removeFromCart,
  } = useCart();

  const itemTotal = item.price * item.quantity;

  return (
    <div className="flex gap-4 border-b border-gray-100 py-5">
      {/* Product Image */}
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-50">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="96px"
          className="object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="line-clamp-2 text-sm font-semibold text-gray-800">
          {item.name}
        </h3>

        <p className="mt-1 text-sm font-semibold text-[#6044f0]">
          ৳ {item.price}
        </p>

        {/* Quantity */}
        <div className="mt-auto flex items-center justify-between gap-3">
          <div className="flex items-center rounded-md border border-gray-200">
            <button
              type="button"
              onClick={() =>
                updateQuantity(item.id, item.quantity - 1)
              }
              className="flex h-8 w-8 items-center justify-center text-gray-600 transition hover:bg-gray-50"
              aria-label="Decrease quantity"
            >
              <Minus size={14} />
            </button>

            <span className="flex h-8 min-w-8 items-center justify-center border-x border-gray-200 text-sm font-medium">
              {item.quantity}
            </span>

            <button
              type="button"
              onClick={() =>
                updateQuantity(item.id, item.quantity + 1)
              }
              className="flex h-8 w-8 items-center justify-center text-gray-600 transition hover:bg-gray-50"
              aria-label="Increase quantity"
            >
              <Plus size={14} />
            </button>
          </div>

          {/* Remove */}
          <button
            type="button"
            onClick={() => removeFromCart(item.id)}
            className="flex items-center gap-1 text-xs text-red-500 transition hover:text-red-600"
          >
            <Trash2 size={15} />
            Remove
          </button>
        </div>
      </div>

      {/* Item Total */}
      <div className="hidden text-right sm:block">
        <p className="text-sm font-bold text-gray-800">
          ৳ {itemTotal}
        </p>
      </div>
    </div>
  );
}