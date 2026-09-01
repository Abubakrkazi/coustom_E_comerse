import Link from "next/link";

import ProductGrid from "@/components/product/ProductGrid";
import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";

import { products } from "@/data/products";

export default function BabyItemPage() {
  const babyProducts = products.filter(
    (product) => product.category === "baby-item"
  );

  return (
    <main className="min-h-screen bg-white">
      {/* Collection Header */}
      <section className="border-b border-gray-100 bg-gray-50">
        <Container>
          <div className="py-8 sm:py-10">
            {/* Breadcrumb */}
            <div className="mb-4 flex items-center gap-2 text-sm text-gray-500">
              <Link
                href="/"
                className="transition hover:text-[#6044f0]"
              >
                Home
              </Link>

              <span>/</span>

              <span className="text-gray-800">
                Baby Item
              </span>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Baby Item
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
              Discover quality baby products at affordable prices.
            </p>
          </div>
        </Container>
      </section>

      {/* Products */}
      <section className="py-8 sm:py-10">
        <Container>
          <div className="mb-6 flex items-center justify-between gap-4">
            <SectionTitle
              title="Baby Items"
              subtitle={`${babyProducts.length} products`}
            />

            <select
              className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-[#6044f0]"
              defaultValue="featured"
            >
              <option value="featured">
                Featured
              </option>

              <option value="low">
                Price: Low to High
              </option>

              <option value="high">
                Price: High to Low
              </option>
            </select>
          </div>

          {babyProducts.length > 0 ? (
            <ProductGrid products={babyProducts} />
          ) : (
            <div className="py-20 text-center">
              <h2 className="text-lg font-semibold text-gray-800">
                No products found
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Baby products will appear here.
              </p>
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}