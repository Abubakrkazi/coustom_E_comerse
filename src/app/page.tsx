
import HeroSlider from "@/components/home/HeroSlider";
import WholesaleSection from "@/components/home/WholesaleSection";
import BabySection from "@/components/home/BabySection";
import ElectronicsSection from "@/components/home/ElectronicsSection";
import TrendingSection from "@/components/home/TrendingSection";
import KitchenSection from "@/components/home/KitchenSection";
import ShavingSection from "@/components/home/ShavingSection";
import PerfumeSection from "@/components/home/PerfumeSection";
import ReviewsSection from "@/components/home/ReviewsSection";

export default function Home() {
  return (
    <main>
      <HeroSlider />

      <WholesaleSection />

      <BabySection />

      <ElectronicsSection />

      <TrendingSection />

      <KitchenSection />

      <ShavingSection />

      <PerfumeSection />

      <ReviewsSection />
    </main>
  );
}

