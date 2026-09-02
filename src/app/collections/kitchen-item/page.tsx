"use client";

import { useState } from "react";

import ProductGrid from "@/components/product/ProductGrid";
import ProductFilters from "@/components/product/ProductFilters";

import CollectionHeader from "@/components/collection/CollectionHeader";
import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";

import { products } from "@/data/products";

const kitchenProducts = products.filter(
  (product) => product.category === "kitchen"
);

export default function KitchenItemPage() {
  const [filteredProducts, setFilteredProducts] =
    useState(kitchenProducts);

  return (
    <main className="min-h-screen bg-white">
      <CollectionHeader
        title="Kitchen Items"
        description="Explore useful and quality kitchen products for your everyday needs."
      />

      <section className="py-8 sm:py-10">
        <Container>
          <div className="mb-6">
            <SectionTitle
              title="Kitchen Items"
              subtitle={`${filteredProducts.length} products`}
            />
          </div>

          <ProductFilters
            products={kitchenProducts}
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