"use client";

import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Truck,
  Headphones,
  CreditCard,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 bg-gray-950 text-gray-300">
      {/* Newsletter Section */}
      <div className="bg-purple-700">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Stay Updated With Rawaj Shop
            </h2>

            <p className="mt-2 max-w-xl text-sm text-purple-100 sm:text-base">
              Subscribe to our newsletter and get updates about new products,
              offers and exclusive deals.
            </p>
          </div>

          <div className="w-full max-w-md">
            <form className="flex overflow-hidden rounded-lg bg-white p-1.5">
              <input
                type="email"
                placeholder="Enter your email"
                className="min-w-0 flex-1 px-3 text-sm text-gray-800 outline-none"
              />

              <button
                type="submit"
                className="flex shrink-0 items-center gap-2 rounded-md bg-purple-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-800"
              >
                Subscribe
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block">
              <h2 className="text-2xl font-extrabold text-white">
                Rawaj<span className="text-purple-500">Shop</span>
              </h2>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-gray-400">
              Your trusted online shopping destination for quality products,
              affordable prices and a smooth shopping experience.
            </p>

            {/* Social Buttons */}
            <div className="mt-6 flex items-center gap-2">
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-700 text-sm font-bold text-gray-300 transition hover:border-purple-500 hover:bg-purple-600 hover:text-white"
              >
                f
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-700 text-sm font-bold text-gray-300 transition hover:border-purple-500 hover:bg-purple-600 hover:text-white"
              >
                ◎
              </a>

              <a
                href="#"
                aria-label="YouTube"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-700 text-sm font-bold text-gray-300 transition hover:border-purple-500 hover:bg-purple-600 hover:text-white"
              >
                ▶
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-bold text-white">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link
                  href="/"
                  className="transition hover:text-purple-400"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/collections/trending"
                  className="transition hover:text-purple-400"
                >
                  Trending
                </Link>
              </li>

              <li>
                <Link
                  href="/collections/electronics-and-gadgets"
                  className="transition hover:text-purple-400"
                >
                  Electronics & Gadgets
                </Link>
              </li>

              <li>
                <Link
                  href="/collections/kitchen-item"
                  className="transition hover:text-purple-400"
                >
                  Kitchen Items
                </Link>
              </li>

              <li>
                <Link
                  href="/collections/baby-item"
                  className="transition hover:text-purple-400"
                >
                  Baby Items
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-base font-bold text-white">
              Categories
            </h3>

            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link
                  href="/collections/wholesale"
                  className="transition hover:text-purple-400"
                >
                  Wholesale
                </Link>
              </li>

              <li>
                <Link
                  href="/collections/kitchen-item"
                  className="transition hover:text-purple-400"
                >
                  Kitchen Item
                </Link>
              </li>

              <li>
                <Link
                  href="/collections/shaving-item"
                  className="transition hover:text-purple-400"
                >
                  Shaving Item
                </Link>
              </li>

              <li>
                <Link
                  href="/collections/perfume"
                  className="transition hover:text-purple-400"
                >
                  Perfume
                </Link>
              </li>

              <li>
                <Link
                  href="/collections/electronics-and-gadgets"
                  className="transition hover:text-purple-400"
                >
                  Electronics & Gadgets
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-base font-bold text-white">
              Contact Us
            </h3>

            <div className="mt-5 space-y-4">
              <div className="flex items-start gap-3">
                <Phone
                  size={18}
                  className="mt-0.5 shrink-0 text-purple-500"
                />

                <div>
                  <p className="text-xs text-gray-500">
                    Call Us
                  </p>

                  <p className="mt-1 text-sm text-gray-300">
                    +880 1XXX-XXXXXX
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail
                  size={18}
                  className="mt-0.5 shrink-0 text-purple-500"
                />

                <div>
                  <p className="text-xs text-gray-500">
                    Email
                  </p>

                  <p className="mt-1 text-sm text-gray-300">
                    support@rawajshop.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0 text-purple-500"
                />

                <div>
                  <p className="text-xs text-gray-500">
                    Address
                  </p>

                  <p className="mt-1 text-sm leading-5 text-gray-300">
                    Dhaka, Bangladesh
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-12 grid grid-cols-1 gap-4 border-t border-gray-800 pt-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center gap-3 rounded-lg border border-gray-800 p-4">
            <Truck className="shrink-0 text-purple-500" size={24} />

            <div>
              <h4 className="text-sm font-semibold text-white">
                Fast Delivery
              </h4>

              <p className="mt-1 text-xs text-gray-500">
                Quick & reliable delivery
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-lg border border-gray-800 p-4">
            <ShieldCheck
              className="shrink-0 text-purple-500"
              size={24}
            />

            <div>
              <h4 className="text-sm font-semibold text-white">
                Secure Shopping
              </h4>

              <p className="mt-1 text-xs text-gray-500">
                Safe & trusted shopping
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-lg border border-gray-800 p-4">
            <Headphones
              className="shrink-0 text-purple-500"
              size={24}
            />

            <div>
              <h4 className="text-sm font-semibold text-white">
                24/7 Support
              </h4>

              <p className="mt-1 text-xs text-gray-500">
                We're here to help
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-lg border border-gray-800 p-4">
            <CreditCard
              className="shrink-0 text-purple-500"
              size={24}
            />

            <div>
              <h4 className="text-sm font-semibold text-white">
                Easy Payment
              </h4>

              <p className="mt-1 text-xs text-gray-500">
                Convenient payment options
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-center text-xs text-gray-500 sm:px-6 md:flex-row md:items-center md:justify-between md:text-left lg:px-8">
          <p>
            © {new Date().getFullYear()} Rawaj Shop. All rights reserved.
          </p>

          <div className="flex items-center justify-center gap-5">
            <Link
              href="#"
              className="transition hover:text-purple-400"
            >
              Privacy Policy
            </Link>

            <Link
              href="#"
              className="transition hover:text-purple-400"
            >
              Terms & Conditions
            </Link>

            <Link
              href="#"
              className="transition hover:text-purple-400"
            >
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

