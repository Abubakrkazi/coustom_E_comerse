"use client";

import { useEffect, useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";

import { Product } from "@/types/product";

interface ProductFiltersProps {
  products: Product[];
  onFilter: (products: Product[]) => void;
}

type SortOption =
  | "featured"
  | "price-low"
  | "price-high"
  | "rating-high"
  | "name-az";

export default function ProductFilters({
  products,
  onFilter,
}: ProductFiltersProps) {
  const [category, setCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState("all");
  const [sort, setSort] = useState<SortOption>("featured");
  const [showFilters, setShowFilters] = useState(false);

  // Get unique categories
  const categories = useMemo(() => {
    return Array.from(
      new Set(products.map((product) => product.category))
    );
  }, [products]);

  // Filter + Sort products
  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesCategory =
        category === "all" ||
        product.category === category;

      const matchesPrice =
        maxPrice === "all" ||
        product.price <= Number(maxPrice);

      return matchesCategory && matchesPrice;
    });

    result = [...result];

    switch (sort) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;

      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;

      case "rating-high":
        result.sort((a, b) => b.rating - a.rating);
        break;

      case "name-az":
        result.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        break;

      case "featured":
      default:
        break;
    }

    return result;
  }, [products, category, maxPrice, sort]);

  // Send filtered products to parent
  useEffect(() => {
    onFilter(filteredProducts);
  }, [filteredProducts, onFilter]);

  // Clear filters
  const clearFilters = () => {
    setCategory("all");
    setMaxPrice("all");
    setSort("featured");
  };

  const hasActiveFilters =
    category !== "all" ||
    maxPrice !== "all" ||
    sort !== "featured";

  return (
    <>
      {/* =========================
          Mobile Filter Button
      ========================= */}
      <div className="mb-5 flex items-center justify-between md:hidden">
        <button
          type="button"
          onClick={() => setShowFilters(true)}
          className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm"
        >
          <SlidersHorizontal size={17} />
          Filters
        </button>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="text-sm font-medium text-red-500"
          >
            Clear All
          </button>
        )}
      </div>

      {/* =========================
          Desktop Filters
      ========================= */}
      <div className="mb-6 hidden rounded-xl border border-gray-100 bg-white p-4 shadow-sm md:block">
        <div className="flex flex-wrap items-center gap-4">
          {/* Category */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500">
              Category
            </label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="min-w-[170px] rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-gray-400"
            >
              <option value="all">All Categories</option>

              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500">
              Price
            </label>

            <select
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="min-w-[150px] rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-gray-400"
            >
              <option value="all">Any Price</option>
              <option value="500">Under ৳500</option>
              <option value="1000">Under ৳1,000</option>
              <option value="2000">Under ৳2,000</option>
              <option value="5000">Under ৳5,000</option>
            </select>
          </div>

          {/* Sort */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500">
              Sort By
            </label>

            <select
              value={sort}
              onChange={(e) =>
                setSort(e.target.value as SortOption)
              }
              className="min-w-[190px] rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-gray-400"
            >
              <option value="featured">Featured</option>

              <option value="price-low">
                Price: Low to High
              </option>

              <option value="price-high">
                Price: High to Low
              </option>

              <option value="rating-high">
                Highest Rated
              </option>

              <option value="name-az">
                Name: A-Z
              </option>
            </select>
          </div>

          {/* Clear */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 text-sm font-medium text-red-500 hover:text-red-600"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* =========================
          Mobile Filter Drawer
      ========================= */}
      {showFilters && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Overlay */}
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setShowFilters(false)}
            className="absolute inset-0 bg-black/40"
          />

          {/* Drawer */}
          <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm overflow-y-auto bg-white p-5 shadow-xl">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Filters
              </h2>

              <button
                type="button"
                onClick={() => setShowFilters(false)}
                className="rounded-full p-2 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5">
              {/* Category */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Category
                </label>

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm outline-none"
                >
                  <option value="all">
                    All Categories
                  </option>

                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Price
                </label>

                <select
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm outline-none"
                >
                  <option value="all">Any Price</option>
                  <option value="500">Under ৳500</option>
                  <option value="1000">Under ৳1,000</option>
                  <option value="2000">Under ৳2,000</option>
                  <option value="5000">Under ৳5,000</option>
                </select>
              </div>

              {/* Sort */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Sort By
                </label>

                <select
                  value={sort}
                  onChange={(e) =>
                    setSort(e.target.value as SortOption)
                  }
                  className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm outline-none"
                >
                  <option value="featured">
                    Featured
                  </option>

                  <option value="price-low">
                    Price: Low to High
                  </option>

                  <option value="price-high">
                    Price: High to Low
                  </option>

                  <option value="rating-high">
                    Highest Rated
                  </option>

                  <option value="name-az">
                    Name: A-Z
                  </option>
                </select>
              </div>
            </div>

            {/* Bottom Buttons */}
            <div className="mt-8 flex gap-3">
              <button
                type="button"
                onClick={clearFilters}
                className="flex-1 rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700"
              >
                Clear
              </button>

              <button
                type="button"
                onClick={() => setShowFilters(false)}
                className="flex-1 rounded-lg bg-black px-4 py-3 text-sm font-medium text-white"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}