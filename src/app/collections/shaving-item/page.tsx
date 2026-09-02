"use client";

import { useState } from "react";

import ProductGrid from "@/components/product/ProductGrid";
import ProductFilters from "@/components/product/ProductFilters";

import CollectionHeader from "@/components/collection/CollectionHeader";
import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";

import { products } from "@/data/products";

const shavingProducts = products.filter(
  (product) => product.category === "shaving"
);

export default function ShavingItemPage() {

  const [filteredProducts, setFilteredProducts] =
    useState(shavingProducts);

  return (
    <main className="min-h-screen bg-white">
      <CollectionHeader
        title="Shaving Items"
        description="Discover quality shaving and grooming products at affordable prices."
      />

      <section className="py-8 sm:py-10">
        <Container>
          <div className="mb-6">
            <SectionTitle
              title="Shaving Items"
              subtitle={`${filteredProducts.length} products`}
            />
          </div>

          <ProductFilters
            products={shavingProducts}
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