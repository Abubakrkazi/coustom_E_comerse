"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

import { navigationItems } from "@/data/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="hidden w-full bg-[#44f08c] lg:block">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[48px] items-center justify-center">
          <ul className="flex h-full items-center">
            {navigationItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <li key={item.href} className="h-full">
                  <Link
                    href={item.href}
                    className={`relative flex h-[48px] items-center gap-1 px-4 text-[14px] font-medium transition-all duration-200 xl:px-5 ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-white/95 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {item.label}

                    {item.label === "Electronics & Gadgets" && (
                      <ChevronDown
                        size={15}
                        strokeWidth={2}
                        className="mt-[1px]"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}