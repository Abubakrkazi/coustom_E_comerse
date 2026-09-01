import ProductSection from "@/components/home/ProductSection";
import { babyProducts } from "@/data/products";

export default function BabySection() {
  return (
    <ProductSection
      title="Baby Items"
      description="Safe and useful products for your little ones."
      products={babyProducts}
      viewAllHref="/category/baby-item"
    />
  );
}