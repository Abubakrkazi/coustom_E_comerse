import ProductSection from "@/components/home/ProductSection";
import { shavingProducts } from "@/data/products";

export default function ShavingSection() {
  return (
    <ProductSection
      title="Shaving & Grooming"
      description="Quality grooming products for everyday care."
      products={shavingProducts}
      viewAllHref="/category/shaving"
    />
  );
}