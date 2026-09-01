import ProductGrid from "@/components/product/ProductGrid";
import CollectionHeader from "@/components/collection/CollectionHeader";
import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";
import { products } from "@/data/products";

export default function ElectronicsAndGadgetsPage() {
  const electronicsProducts = products.filter(
    (product) =>
      product.category === "electronics" ||
      product.category === "gadgets"
  );

  return (
    <main className="min-h-screen bg-white">
      <CollectionHeader
        title="Electronics & Gadgets"
        description="Discover useful electronics and smart gadgets at affordable prices."
      />

      <section className="py-8 sm:py-10">
        <Container>
          <div className="mb-6 flex items-center justify-between">
            <SectionTitle
              title="Electronics & Gadgets"
              subtitle={`${electronicsProducts.length} products`}
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

          {electronicsProducts.length > 0 ? (
            <ProductGrid products={electronicsProducts} />
          ) : (
            <div className="py-20 text-center">
              <h2 className="text-lg font-semibold text-gray-800">
                No products found
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Electronics and gadgets will appear here.
              </p>
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}
