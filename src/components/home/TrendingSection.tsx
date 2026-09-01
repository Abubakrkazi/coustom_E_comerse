import ProductSection from "@/components/home/ProductSection";
import { trendingProducts } from "@/data/products";

export default function TrendingSection() {
  return (
    <ProductSection
      title="Trending Products"
      description="Discover products that are popular right now."
      products={trendingProducts}
      viewAllHref="/category/trending"
    />
  );
}