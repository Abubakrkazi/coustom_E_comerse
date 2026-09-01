
"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";

import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/hooks/useCart";

export default function WishlistPage() {
  const {
    wishlistItems,
    wishlistCount,
    removeFromWishlist,
    clearWishlist,
  } = useWishlist();

  const { addToCart } = useCart();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-6xl px-4">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              My Wishlist
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              {wishlistCount}{" "}
              {wishlistCount === 1 ? "item" : "items"} in your wishlist
            </p>
          </div>

          {wishlistItems.length > 0 && (
            <button
              type="button"
              onClick={clearWishlist}
              className="text-sm font-medium text-red-500 hover:underline"
            >
              Clear Wishlist
            </button>
          )}
        </div>

        {/* Empty Wishlist */}
        {wishlistItems.length === 0 ? (
          <div className="rounded-lg bg-white p-10 text-center shadow-sm">
            <div className="mb-4 flex justify-center">
              <Heart
                size={52}
                strokeWidth={1.5}
                className="text-gray-300"
              />
            </div>

            <h2 className="text-xl font-semibold text-gray-800">
              Your wishlist is empty
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Looks like you haven't added anything to your wishlist yet.
            </p>

            <Link
              href="/"
              className="mt-6 inline-block rounded-md bg-[#6044f0] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#5035d8]"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          /* Wishlist Products */
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {wishlistItems.map((product) => (
              <article
                key={product.id}
                className="group overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <Link
                    href={`/products/${product.slug}`}
                    className="absolute inset-0"
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>

                  {/* Remove */}
                  <button
                    type="button"
                    onClick={() => removeFromWishlist(product.id)}
                    aria-label={`Remove ${product.name} from wishlist`}
                    className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-white text-red-500 shadow-sm transition hover:bg-red-500 hover:text-white"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-3 sm:p-4">
                  <Link href={`/products/${product.slug}`}>
                    <h3 className="line-clamp-2 min-h-[40px] text-sm font-medium leading-5 text-gray-800 hover:text-[#6044f0]">
                      {product.name}
                    </h3>
                  </Link>

                  {/* Rating */}
                  <div className="mt-2 flex items-center gap-1">
                    <span className="text-sm text-yellow-500">
                      ★
                    </span>

                    <span className="text-xs font-medium text-gray-600">
                      {product.rating}
                    </span>

                    <span className="text-xs text-gray-400">
                      ({product.reviews})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-base font-bold text-[#6044f0]">
                      ৳ {product.price}
                    </span>

                    {product.oldPrice && (
                      <span className="text-xs text-gray-400 line-through">
                        ৳ {product.oldPrice}
                      </span>
                    )}
                  </div>

                  {/* Add To Cart */}
                  <button
                    type="button"
                    onClick={() => addToCart(product)}
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-md bg-[#6044f0] px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-[#5035d8] sm:text-sm"
                  >
                    <ShoppingCart size={16} />
                    Add to Cart
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

