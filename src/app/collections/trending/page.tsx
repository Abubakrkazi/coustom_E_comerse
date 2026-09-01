import ProductGrid from "@/components/product/ProductGrid";
import CollectionHeader from "@/components/collection/CollectionHeader";
import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";
import { products } from "@/data/products";

export default function TrendingPage() {
  const trendingProducts = products.filter(
    (product) => product.category === "trending"
  );

  return (
    <main className="min-h-screen bg-white">
      <CollectionHeader
        title="Trending Products"
        description="Discover the latest trending products that customers love."
      />

      <section className="py-8 sm:py-10">
        <Container>
          <div className="mb-6 flex items-center justify-between">
            <SectionTitle
              title="Trending Products"
              subtitle={`${trendingProducts.length} products`}
            />

            <select
              className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-[#6044f0]"
              defaultValue="featured"
            >
              <option value="featured">Featured</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>

          {trendingProducts.length > 0 ? (
            <ProductGrid products={trendingProducts} />
          ) : (
            <div className="py-20 text-center">
              <h2 className="text-lg font-semibold text-gray-800">
                No products found
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Trending products will appear here.
              </p>
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}