import ProductSection from "@/components/home/ProductSection";
import { gadgetProducts } from "@/data/products";

export default function ElectronicsSection() {
  return (
    <ProductSection
      title="Electronics & Gadgets"
      description="Smart gadgets and useful electronic products."
      products={gadgetProducts}
      viewAllHref="/category/gadgets"
    />
  );
}