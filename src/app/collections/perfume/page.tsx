import ProductGrid from "@/components/product/ProductGrid";
import CollectionHeader from "@/components/collection/CollectionHeader";
import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";
import { products } from "@/data/products";

export default function PerfumePage() {
  const perfumeProducts = products.filter(
    (product) => product.category === "perfume"
  );

  return (
    <main className="min-h-screen bg-white">
      <CollectionHeader
        title="Perfume"
        description="Discover quality perfumes and fragrances at affordable prices."
      />

      <section className="py-8 sm:py-10">
        <Container>
          <div className="mb-6 flex items-center justify-between">
            <SectionTitle
              title="Perfume"
              subtitle={`${perfumeProducts.length} products`}
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

          {perfumeProducts.length > 0 ? (
            <ProductGrid products={perfumeProducts} />
          ) : (
            <div className="py-20 text-center">
              <h2 className="text-lg font-semibold text-gray-800">
                No products found
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Perfume products will appear here.
              </p>
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}
