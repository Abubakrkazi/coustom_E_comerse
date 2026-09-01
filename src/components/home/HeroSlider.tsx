"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { banners } from "@/data/banners";

export default function HeroSlider() {
  const slides = [...banners, banners[0]];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const nextSlide = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const previousSlide = () => {
    if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(banners.length - 1);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      });

      return;
    }

    setCurrentIndex((prev) => prev - 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentIndex === banners.length) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsTransitioning(true);
          });
        });
      }, 700);

      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  return (
    <section className="w-full overflow-hidden bg-white">
      <div className="relative mx-auto w-full max-w-[1440px]">
        <div className="relative aspect-[16/7] min-h-[220px] w-full overflow-hidden sm:min-h-[280px] md:aspect-[16/6.5] md:min-h-[320px] lg:min-h-[400px]">

          {/* Slides */}
          <div
            className={`flex h-full ${
              isTransitioning
                ? "transition-transform duration-700 ease-in-out"
                : ""
            }`}
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {slides.map((banner, index) => (
              <Link
                key={`${banner.id}-${index}`}
                href={banner.href}
                className="group relative h-full min-w-full shrink-0"
              >
                <Image
                  src={banner.image}
                  alt={banner.title}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.01]"
                />

                <div className="absolute inset-0 bg-black/10" />

                <div className="absolute inset-0 flex items-center">
                  <div className="px-6 sm:px-10 md:px-14 lg:px-20">
                    <div className="max-w-[520px]">
                      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[2px] text-white sm:text-[13px]">
                        HT Bazar
                      </p>

                      <h1 className="text-2xl font-bold leading-tight text-white drop-shadow-md sm:text-3xl md:text-4xl lg:text-5xl">
                        {banner.title}
                      </h1>

                      <p className="mt-3 hidden max-w-[430px] text-sm leading-6 text-white/90 sm:block md:text-base">
                        {banner.subtitle}
                      </p>

                      <span className="mt-5 inline-flex rounded-[4px] bg-[#6044f0] px-5 py-2.5 text-[13px] font-semibold text-white sm:px-6 sm:py-3">
                        {banner.buttonText}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Previous */}
          <button
            type="button"
            onClick={previousSlide}
            aria-label="Previous banner"
            className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-md transition hover:bg-white hover:text-[#6044f0] sm:left-5 sm:h-10 sm:w-10"
          >
            <ChevronLeft size={21} />
          </button>

          {/* Next */}
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next banner"
            className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-md transition hover:bg-white hover:text-[#6044f0] sm:right-5 sm:h-10 sm:w-10"
          >
            <ChevronRight size={21} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {banners.map((banner, index) => (
              <button
                key={banner.id}
                type="button"
                onClick={() => {
                  setIsTransitioning(true);
                  setCurrentIndex(index);
                }}
                aria-label={`Go to banner ${index + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex % banners.length
                    ? "w-7 bg-white"
                    : "w-2 bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}