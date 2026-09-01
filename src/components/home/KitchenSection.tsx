import ProductSection from "@/components/home/ProductSection";
import { kitchenProducts } from "@/data/products";

export default function KitchenSection() {
  return (
    <ProductSection
      title="Kitchen Items"
      description="Useful and practical products for your kitchen."
      products={kitchenProducts}
      viewAllHref="/category/kitchen"
    />
  );
}