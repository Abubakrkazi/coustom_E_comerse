"use client";

import { useState } from "react";

import ProductGrid from "@/components/product/ProductGrid";
import ProductFilters from "@/components/product/ProductFilters";

import CollectionHeader from "@/components/collection/CollectionHeader";
import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";

import { products } from "@/data/products";

const electronicsProducts = products.filter(
  (product) =>
    product.category === "electronics" ||
    product.category === "gadgets"
);

export default function ElectronicsAndGadgetsPage() {
  const [filteredProducts, setFilteredProducts] =
    useState(electronicsProducts);

  return (
    <main className="min-h-screen bg-white">
      <CollectionHeader
        title="Electronics & Gadgets"
        description="Discover useful electronics and smart gadgets at affordable prices."
      />

      <section className="py-8 sm:py-10">
        <Container>
          <div className="mb-6">
            <SectionTitle
              title="Electronics & Gadgets"
              subtitle={`${filteredProducts.length} products`}
            />
          </div>

          <ProductFilters
            products={electronicsProducts}
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