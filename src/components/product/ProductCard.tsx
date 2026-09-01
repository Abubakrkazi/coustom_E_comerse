
"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";

import { Product } from "@/types/product";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/context/WishlistContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  const { addToCart } = useCart();

  const {
    toggleWishlist,
    isInWishlist,
  } = useWishlist();

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleWishlist = () => {
    toggleWishlist(product);
  };

  return (
    <article className="group relative overflow-hidden rounded-lg border border-gray-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Product Image */}
      <div
        className="relative w-full overflow-hidden bg-gray-50"
        style={{ aspectRatio: "1 / 1" }}
      >
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

        {/* Badge */}
        {product.badge && (
          <span className="absolute left-2 top-2 rounded bg-[#6044f0] px-2 py-1 text-[10px] font-semibold text-white sm:text-xs">
            {product.badge}
          </span>
        )}

        {/* Wishlist */}
        <button
          type="button"
          onClick={handleWishlist}
          aria-label={
            isWishlisted
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
          className={`absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 shadow-sm transition ${
            isWishlisted
              ? "text-red-500"
              : "text-gray-600 hover:bg-[#6044f0] hover:text-white"
          }`}
        >
          <Heart
            size={16}
            fill={isWishlisted ? "currentColor" : "none"}
          />
        </button>
      </div>

      {/* Product Information */}
      <div className="p-3 sm:p-4">
        {/* Product Name */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="line-clamp-2 min-h-[40px] text-sm font-medium leading-5 text-gray-800 transition hover:text-[#6044f0]">
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
          onClick={handleAddToCart}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-md bg-[#6044f0] px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-[#5035d8] sm:text-sm"
        >
          <ShoppingCart size={16} />
          Add to Cart
        </button>
      </div>
    </article>
  );
}

