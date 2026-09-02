"use client";

import Link from "next/link";
import { useState } from "react";

import ProductGrid from "@/components/product/ProductGrid";
import ProductFilters from "@/components/product/ProductFilters";

import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";

import { products } from "@/data/products";

const babyProducts = products.filter(
  (product) => product.category === "baby-item"
);

export default function BabyItemPage() {

  const [filteredProducts, setFilteredProducts] =
    useState(babyProducts);

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
          <div className="mb-6">
            <SectionTitle
              title="Baby Items"
              subtitle={`${filteredProducts.length} products`}
            />
          </div>

          <ProductFilters
            products={babyProducts}
            onFilter={setFilteredProducts}
          />

          {filteredProducts.length > 0 ? (
            <ProductGrid products={filteredProducts} />
          ) : (
            <div className="py-20 text-center">
              <h2 className="text-lg font-semibold text-gray-800">
                No products found
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Try changing your filters.
              </p>
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}