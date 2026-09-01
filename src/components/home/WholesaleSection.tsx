import Link from "next/link";

import ProductGrid from "@/components/product/ProductGrid";
import { wholesaleProducts } from "@/data/products";

export default function WholesaleSection() {
  return (
    <section className="bg-white py-10 sm:py-12 md:py-14">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
              Wholesale
            </h2>

            <div className="mt-2 h-[3px] w-10 rounded-full bg-[#6044f0]" />
          </div>

          <Link
            href="/products"
            className="text-sm font-medium text-gray-600 transition hover:text-[#6044f0]"
          >
            View All
          </Link>
        </div>

        {/* Products */}
        <ProductGrid products={wholesaleProducts} />

      </div>
    </section>
  );
}