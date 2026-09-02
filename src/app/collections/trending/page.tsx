"use client";

import { useState } from "react";

import ProductGrid from "@/components/product/ProductGrid";
import ProductFilters from "@/components/product/ProductFilters";

import CollectionHeader from "@/components/collection/CollectionHeader";
import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";

import { products } from "@/data/products";

const trendingProducts = products.filter(
  (product) =>
    product.badge === "Popular" ||
    product.badge === "Best Seller" ||
    product.badge === "New"
);

export default function TrendingPage() {
  const [filteredProducts, setFilteredProducts] =
    useState(trendingProducts);

  return (
    <main className="min-h-screen bg-white">
      <CollectionHeader
        title="Trending Products"
        description="Discover the latest trending products that customers love."
      />

      <section className="py-8 sm:py-10">
        <Container>
          <div className="mb-6">
            <SectionTitle
              title="Trending Products"
              subtitle={`${filteredProducts.length} products`}
            />
          </div>

          <ProductFilters
            products={trendingProducts}
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