import { notFound } from "next/navigation";

import ProductCard from "@/components/product/ProductCard";
import { products } from "@/data/products";
import { ProductCategory } from "@/types/product";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

const categoryInfo: Record<
  ProductCategory,
  {
    title: string;
    description: string;
  }
> = {
  wholesale: {
    title: "Wholesale Products",
    description: "Quality products at wholesale prices",
  },

  kitchen: {
    title: "Kitchen Products",
    description: "Useful products for your kitchen",
  },

  gadgets: {
    title: "Gadgets",
    description: "Smart and useful gadgets for everyday life",
  },

  "just-for-you": {
    title: "Just For You",
    description: "Products selected especially for you",
  },

  "baby-item": {
    title: "Baby Items",
    description: "Quality products for your little ones",
  },

  electronics: {
    title: "Electronics",
    description: "Useful electronic products",
  },

  trending: {
    title: "Trending Products",
    description: "Popular products everyone is loving",
  },

  shaving: {
    title: "Shaving & Grooming",
    description: "Everything you need for your daily grooming",
  },

  perfume: {
    title: "Perfume Collection",
    description: "Find your favorite fragrance",
  },
};

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const { category } = await params;

  if (!(category in categoryInfo)) {
    notFound();
  }

  const categoryKey = category as ProductCategory;

  const categoryProducts = products.filter(
    (product) => product.category === categoryKey
  );

  const info = categoryInfo[categoryKey];

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            {info.title}
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {info.description}
          </p>

          <p className="mt-2 text-sm text-gray-400">
            {categoryProducts.length} products
          </p>
        </div>

        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {categoryProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-lg bg-white py-16 text-center">
            <h2 className="text-lg font-semibold text-gray-800">
              No products found
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              There are currently no products in this category.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}