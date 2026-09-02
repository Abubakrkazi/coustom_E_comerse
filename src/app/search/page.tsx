
"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

import { products } from "@/data/products";
import ProductGrid from "@/components/product/ProductGrid";
import Container from "@/components/common/Container";

type SortOption =
  | "featured"
  | "price-low"
  | "price-high"
  | "rating-high"
  | "name-az";

export default function SearchPage() {
  const searchParams = useSearchParams();

  const query =
    searchParams.get("q")?.trim() || "";

  const [category, setCategory] =
    useState("all");

  const [sort, setSort] =
    useState<SortOption>("featured");

  const [maxPrice, setMaxPrice] =
    useState("all");

  const [showFilters, setShowFilters] =
    useState(false);

  const categories = useMemo(() => {
    return Array.from(
      new Set(products.map((product) => product.category))
    );
  }, []);

  const maxProductPrice = useMemo(() => {
    return Math.max(
      ...products.map((product) => product.price)
    );
  }, []);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const searchText = query.toLowerCase();

      const matchesSearch =
        !searchText ||
        product.name
          .toLowerCase()
          .includes(searchText) ||
        product.category
          .toLowerCase()
          .includes(searchText) ||
        product.description
          ?.toLowerCase()
          .includes(searchText);

      const matchesCategory =
        category === "all" ||
        product.category === category;

      const matchesPrice =
        maxPrice === "all" ||
        product.price <= Number(maxPrice);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPrice
      );
    });

    result = [...result];

    switch (sort) {
      case "price-low":
        result.sort(
          (a, b) => a.price - b.price
        );
        break;

      case "price-high":
        result.sort(
          (a, b) => b.price - a.price
        );
        break;

      case "rating-high":
        result.sort(
          (a, b) => b.rating - a.rating
        );
        break;

      case "name-az":
        result.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        break;

      default:
        break;
    }

    return result;
  }, [query, category, maxPrice, sort]);

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
    <main className="min-h-screen bg-gray-50 py-8 sm:py-10">
      <Container>
        {/* Header */}
        <div className="mb-7">
          <Link
            href="/"
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#6044f0]"
          >
            <ArrowLeft size={17} />
            Back to Shopping
          </Link>

          <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-7">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f1efff]">
                <Search
                  size={22}
                  className="text-[#6044f0]"
                />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Search Results
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  {query
                    ? `Showing results for "${query}"`
                    : "Browse all products"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Filter Button */}
        <button
          type="button"
          onClick={() =>
            setShowFilters(!showFilters)
          }
          className="mb-4 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 lg:hidden"
        >
          <SlidersHorizontal size={17} />
          {showFilters
            ? "Hide Filters"
            : "Show Filters"}
        </button>

        <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
          {/* Sidebar */}
          <aside
            className={`${
              showFilters
                ? "block"
                : "hidden lg:block"
            } h-fit rounded-2xl bg-white p-5 shadow-sm`}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-gray-900">
                Filters
              </h2>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-xs font-semibold text-[#6044f0] hover:underline"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Category */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-800">
                Category
              </h3>

              <div className="mt-3 space-y-2">
                <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-600">
                  <input
                    type="radio"
                    name="category"
                    checked={category === "all"}
                    onChange={() =>
                      setCategory("all")
                    }
                    className="accent-[#6044f0]"
                  />
                  All Categories
                </label>

                {categories.map(
                  (item) => (
                    <label
                      key={item}
                      className="flex cursor-pointer items-center gap-3 text-sm capitalize text-gray-600"
                    >
                      <input
                        type="radio"
                        name="category"
                        checked={
                          category === item
                        }
                        onChange={() =>
                          setCategory(item)
                        }
                        className="accent-[#6044f0]"
                      />

                      {item.replace(
                        /-/g,
                        " "
                      )}
                    </label>
                  )
                )}
              </div>
            </div>

            {/* Price */}
            <div className="mt-7 border-t border-gray-100 pt-6">
              <h3 className="text-sm font-semibold text-gray-800">
                Maximum Price
              </h3>

              <div className="mt-3 space-y-2">
                {[
                  {
                    label: "Any Price",
                    value: "all",
                  },
                  {
                    label: "Under ৳500",
                    value: "500",
                  },
                  {
                    label: "Under ৳1,000",
                    value: "1000",
                  },
                  {
                    label: "Under ৳2,000",
                    value: "2000",
                  },
                  {
                    label: "Under ৳5,000",
                    value: "5000",
                  },
                ].map((item) => (
                  <label
                    key={item.value}
                    className="flex cursor-pointer items-center gap-3 text-sm text-gray-600"
                  >
                    <input
                      type="radio"
                      name="price"
                      checked={
                        maxPrice ===
                        item.value
                      }
                      onChange={() =>
                        setMaxPrice(
                          item.value
                        )
                      }
                      className="accent-[#6044f0]"
                    />

                    {item.label}
                  </label>
                ))}

                {maxProductPrice > 5000 && (
                  <p className="mt-2 text-xs text-gray-400">
                    Maximum product price: ৳{" "}
                    {maxProductPrice.toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          </aside>

          {/* Products */}
          <section>
            <div className="mb-5 flex flex-col gap-3 rounded-xl bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {filteredProducts.length}{" "}
                  {filteredProducts.length ===
                  1
                    ? "Product"
                    : "Products"}{" "}
                  Found
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">
                  Sort by
                </span>

                <select
                  value={sort}
                  onChange={(e) =>
                    setSort(
                      e.target
                        .value as SortOption
                    )
                  }
                  className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-[#6044f0]"
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

            {filteredProducts.length > 0 ? (
              <ProductGrid
                products={filteredProducts}
              />
            ) : (
              <div className="rounded-2xl bg-white px-6 py-20 text-center shadow-sm">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                  <Search
                    size={28}
                    className="text-gray-400"
                  />
                </div>

                <h2 className="mt-5 text-xl font-bold text-gray-800">
                  No Products Found
                </h2>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                  We couldn't find any products
                  matching your search and
                  filters.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#6044f0] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#5035d8]"
                >
                  <X size={16} />
                  Clear Filters
                </button>
              </div>
            )}
          </section>
        </div>
      </Container>
    </main>
  );
}

