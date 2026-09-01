"use client";

import Link from "next/link";
import { X, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

import { navigationItems } from "@/data/navigation";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({
  isOpen,
  onClose,
}: MobileMenuProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 lg:hidden ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[300px] max-w-[85%] flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex h-[72px] items-center justify-between border-b border-gray-100 px-5">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center"
          >
            <span className="text-[27px] font-extrabold tracking-[-1.2px] text-[#6044f0]">
              HT
            </span>

            <span className="ml-1 text-[27px] font-extrabold tracking-[-1.2px] text-gray-800">
              Bazar
            </span>
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-3">
          <ul>
            {navigationItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`flex min-h-[50px] items-center justify-between border-b border-gray-50 px-5 text-[14px] transition ${
                      isActive
                        ? "bg-[#f4f1ff] font-semibold text-[#6044f0]"
                        : "text-gray-700 hover:bg-gray-50 hover:text-[#6044f0]"
                    }`}
                  >
                    <span>{item.label}</span>

                    <ChevronRight
                      size={17}
                      className={
                        isActive
                          ? "text-[#6044f0]"
                          : "text-gray-400"
                      }
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-100 p-5">
          <p className="text-[12px] text-gray-400">
            Need help?
          </p>

          <a
            href="tel:+8801700000000"
            className="mt-1 block text-[14px] font-semibold text-gray-800 hover:text-[#6044f0]"
          >
            +880 1700-000000
          </a>
        </div>
      </aside>
    </>
  );
}