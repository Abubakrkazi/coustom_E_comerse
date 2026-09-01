import Link from "next/link";
import { ArrowRight } from "lucide-react";

import ProductCard from "@/components/product/ProductCard";
import { Product } from "@/types/product";

interface ProductSectionProps {
  title: string;
  description?: string;
  products: Product[];
  viewAllHref: string;
}

export default function ProductSection({
  title,
  description,
  products,
  viewAllHref,
}: ProductSectionProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-10 sm:py-12">
      <div className="mx-auto max-w-6xl px-4">
        {/* Section Header */}
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
              {title}
            </h2>

            {description && (
              <p className="mt-1 text-sm text-gray-500">
                {description}
              </p>
            )}
          </div>

          <Link
            href={viewAllHref}
            className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[#6044f0] transition hover:text-[#5035d8]"
          >
            View All
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {products.slice(0, 8).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </section>
  );
}