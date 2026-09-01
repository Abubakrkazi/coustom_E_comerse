import ProductSection from "@/components/home/ProductSection";
import { perfumeProducts } from "@/data/products";

export default function PerfumeSection() {
  return (
    <ProductSection
      title="Perfume Collection"
      description="Premium fragrances for every occasion."
      products={perfumeProducts}
      viewAllHref="/category/perfume"
    />
  );
}