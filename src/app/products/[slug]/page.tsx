"use client";

import Image from "next/image";
import Link from "next/link";
import { use, useState } from "react";
import {
  ArrowLeft,
  Check,
  Heart,
  Minus,
  Plus,
  ShoppingCart,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";

import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface ProductDetailsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { slug } = use(params);

  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const product = products.find((item) => item.slug === slug);

  // Product not found
  if (!product) {
    return (
      <main className="min-h-screen bg-gray-50 py-16">
        <div className="mx-auto max-w-4xl px-4">
          <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-2xl">
              🛍️
            </div>

            <h1 className="text-2xl font-bold text-gray-800">
              Product Not Found
            </h1>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              Sorry, the product you are looking for does not exist or
              may have been removed.
            </p>

            <Link
              href="/"
              className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#6044f0] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#5035d8]"
            >
              <ArrowLeft size={16} />
              Back to Shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const discount =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round(
          ((product.oldPrice - product.price) / product.oldPrice) * 100
        )
      : 0;

  const isWishlisted = isInWishlist(product.id);

  const relatedProducts = products
    .filter(
      (item) =>
        item.category === product.category &&
        item.id !== product.id
    )
    .slice(0, 4);

  const handleDecrease = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const handleIncrease = () => {
    setQuantity((current) =>
      Math.min(product.stock, current + 1)
    );
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const handleWishlist = () => {
    toggleWishlist(product);
  };

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Breadcrumb */}
      <div className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-[#6044f0]"
          >
            <ArrowLeft size={16} />
            Back to Shopping
          </Link>
        </div>
      </div>

      {/* Product Details */}
      <section className="py-8 sm:py-10">
        <div className="mx-auto max-w-6xl px-4">

          <div className="grid gap-8 rounded-2xl bg-white p-4 shadow-sm sm:p-6 lg:grid-cols-2 lg:gap-10 lg:p-8">

            {/* Product Image */}
            <div>
              <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-50">

                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />

                {/* Product Badge */}
                {product.badge && (
                  <span className="absolute left-4 top-4 rounded-full bg-[#6044f0] px-3 py-1.5 text-xs font-semibold text-white shadow-sm">
                    {product.badge}
                  </span>
                )}

                {/* Discount */}
                {discount > 0 && (
                  <span className="absolute right-4 top-4 rounded-full bg-red-500 px-3 py-1.5 text-xs font-semibold text-white shadow-sm">
                    -{discount}%
                  </span>
                )}
              </div>
            </div>

            {/* Product Information */}
            <div className="flex flex-col">

              {/* Category */}
              <p className="text-xs font-semibold uppercase tracking-wider text-[#6044f0]">
                {product.category.replaceAll("-", " ")}
              </p>

              {/* Product Name */}
              <h1 className="mt-2 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="mt-4 flex flex-wrap items-center gap-3">

                <div className="flex items-center gap-1">
                  <Star
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />

                  <span className="text-sm font-semibold text-gray-800">
                    {product.rating}
                  </span>
                </div>

                <span className="text-sm text-gray-300">
                  |
                </span>

                <span className="text-sm text-gray-500">
                  {product.reviews} customer reviews
                </span>
              </div>

              {/* Price */}
              <div className="mt-6 flex flex-wrap items-center gap-3">

                <span className="text-3xl font-bold text-[#6044f0]">
                  ৳ {product.price}
                </span>

                {product.oldPrice && (
                  <span className="text-base text-gray-400 line-through">
                    ৳ {product.oldPrice}
                  </span>
                )}

                {discount > 0 && (
                  <span className="rounded-md bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                    Save {discount}%
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="mt-6 border-t border-gray-100 pt-6">

                <h2 className="text-sm font-bold text-gray-900">
                  Product Description
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {product.description ||
                    "A quality product carefully selected for your everyday needs."}
                </p>
              </div>

              {/* Stock */}
              <div className="mt-5">

                {product.stock > 0 ? (
                  <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-600">
                    <Check size={14} />
                    In Stock ({product.stock} available)
                  </div>
                ) : (
                  <div className="inline-flex items-center rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-500">
                    Out of Stock
                  </div>
                )}
              </div>

              {/* Quantity */}
              {product.stock > 0 && (
                <div className="mt-6">

                  <p className="mb-2 text-sm font-semibold text-gray-800">
                    Quantity
                  </p>

                  <div className="flex items-center gap-3">

                    <div className="flex h-11 items-center rounded-lg border border-gray-200 bg-white">

                      <button
                        type="button"
                        onClick={handleDecrease}
                        disabled={quantity <= 1}
                        className="flex h-full w-11 items-center justify-center text-gray-500 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <Minus size={16} />
                      </button>

                      <span className="w-12 text-center text-sm font-semibold text-gray-800">
                        {quantity}
                      </span>

                      <button
                        type="button"
                        onClick={handleIncrease}
                        disabled={quantity >= product.stock}
                        className="flex h-full w-11 items-center justify-center text-gray-500 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <Plus size={16} />
                      </button>

                    </div>

                    <span className="text-xs text-gray-400">
                      Maximum {product.stock}
                    </span>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">

                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                  className="flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#6044f0] px-5 text-sm font-semibold text-white transition hover:bg-[#5035d8] disabled:cursor-not-allowed disabled:bg-gray-300"
                >
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>

                <button
                  type="button"
                  onClick={handleWishlist}
                  aria-label={
                    isWishlisted
                      ? "Remove from wishlist"
                      : "Add to wishlist"
                  }
                  className={`flex min-h-12 items-center justify-center gap-2 rounded-lg border px-5 text-sm font-semibold transition ${
                    isWishlisted
                      ? "border-red-200 bg-red-50 text-red-500"
                      : "border-gray-200 bg-white text-gray-700 hover:border-[#6044f0] hover:text-[#6044f0]"
                  }`}
                >
                  <Heart
                    size={18}
                    fill={isWishlisted ? "currentColor" : "none"}
                  />

                  <span className="hidden sm:inline">
                    {isWishlisted
                      ? "Wishlisted"
                      : "Wishlist"}
                  </span>
                </button>

              </div>

              {/* Benefits */}
              <div className="mt-8 grid gap-3 border-t border-gray-100 pt-6 sm:grid-cols-3">

                {/* Delivery */}
                <div className="rounded-lg bg-gray-50 p-3">
                  <Truck
                    size={19}
                    className="text-[#6044f0]"
                  />

                  <p className="mt-2 text-xs font-semibold text-gray-800">
                    Fast Delivery
                  </p>

                  <p className="mt-1 text-[11px] text-gray-400">
                    Quick & reliable delivery
                  </p>
                </div>

                {/* Security */}
                <div className="rounded-lg bg-gray-50 p-3">
                  <ShieldCheck
                    size={19}
                    className="text-[#6044f0]"
                  />

                  <p className="mt-2 text-xs font-semibold text-gray-800">
                    Secure Shopping
                  </p>

                  <p className="mt-1 text-[11px] text-gray-400">
                    Safe & trusted purchase
                  </p>
                </div>

                {/* Return */}
                <div className="rounded-lg bg-gray-50 p-3">
                  <RotateCcw
                    size={19}
                    className="text-[#6044f0]"
                  />

                  <p className="mt-2 text-xs font-semibold text-gray-800">
                    Easy Returns
                  </p>

                  <p className="mt-1 text-[11px] text-gray-400">
                    Simple return policy
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-gray-100 bg-white py-10 sm:py-12">

          <div className="mx-auto max-w-6xl px-4">

            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#6044f0]">
                You may also like
              </p>

              <h2 className="mt-1 text-2xl font-bold text-gray-900">
                Related Products
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">

              {relatedProducts.map((item) => (
                <Link
                  key={item.id}
                  href={`/products/${item.slug}`}
                  className="group overflow-hidden rounded-xl border border-gray-100 bg-white transition hover:-translate-y-1 hover:shadow-lg"
                >

                  <div className="relative aspect-square overflow-hidden bg-gray-50">

                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-3">

                    <h3 className="line-clamp-2 min-h-[40px] text-sm font-medium text-gray-800 group-hover:text-[#6044f0]">
                      {item.name}
                    </h3>

                    <div className="mt-2 flex items-center gap-2">

                      <span className="text-sm font-bold text-[#6044f0]">
                        ৳ {item.price}
                      </span>

                      {item.oldPrice && (
                        <span className="text-xs text-gray-400 line-through">
                          ৳ {item.oldPrice}
                        </span>
                      )}

                    </div>
                  </div>

                </Link>
              ))}

            </div>
          </div>
        </section>
      )}
    </main>
  );
}