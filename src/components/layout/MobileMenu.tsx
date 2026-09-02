"use client";

import Link from "next/link";
import {
  X,
  ChevronRight,
  ShoppingBag,
  Heart,
  ShoppingCart,
  UserRound,
  LogOut,
  User,
} from "lucide-react";
import { usePathname } from "next/navigation";

import { navigationItems } from "@/data/navigation";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({
  isOpen,
  onClose,
}: MobileMenuProps) {
  const pathname = usePathname();

  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  const {
    user,
    isLoggedIn,
    isLoading,
    logout,
  } = useAuth();

  const handleLogout = () => {
    logout();
    onClose();
  };

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
          isOpen
            ? "translate-x-0"
            : "-translate-x-full"
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
              Rawaj
            </span>

            <span className="ml-1 text-[27px] font-extrabold tracking-[-1.2px] text-gray-800">
              Shop
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

        {/* Logged In User */}
        {!isLoading && isLoggedIn && (
          <div className="border-b border-gray-100 bg-[#f8f6ff] px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#6044f0] text-white">
                <UserRound
                  size={21}
                  strokeWidth={1.8}
                />
              </div>

              <div className="min-w-0">
                <p className="text-[11px] text-gray-400">
                  Welcome back
                </p>

                <p className="truncate text-[14px] font-bold text-gray-800">
                  {user?.name}
                </p>

                <p className="truncate text-[11px] text-gray-500">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>
        )}

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

            {/* My Account */}
            {!isLoading && isLoggedIn && (
              <li>
                <Link
                  href="/account"
                  onClick={onClose}
                  className={`flex min-h-[50px] items-center justify-between border-b border-gray-50 px-5 text-[14px] transition ${
                    pathname.startsWith("/account")
                      ? "bg-[#f4f1ff] font-semibold text-[#6044f0]"
                      : "text-gray-700 hover:bg-gray-50 hover:text-[#6044f0]"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <User
                      size={18}
                      strokeWidth={1.8}
                    />
                    My Account
                  </span>

                  <ChevronRight
                    size={17}
                    className="text-gray-400"
                  />
                </Link>
              </li>
            )}

            {/* Wishlist */}
            <li>
              <Link
                href="/wishlist"
                onClick={onClose}
                className={`flex min-h-[50px] items-center justify-between border-b border-gray-50 px-5 text-[14px] transition ${
                  pathname.startsWith("/wishlist")
                    ? "bg-[#f4f1ff] font-semibold text-[#6044f0]"
                    : "text-gray-700 hover:bg-gray-50 hover:text-[#6044f0]"
                }`}
              >
                <span className="flex items-center gap-3">
                  <Heart
                    size={18}
                    strokeWidth={1.8}
                  />
                  Wishlist
                </span>

                <span className="flex items-center gap-2">
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#6044f0] px-1 text-[10px] font-bold text-white">
                    {wishlistCount}
                  </span>

                  <ChevronRight
                    size={17}
                    className="text-gray-400"
                  />
                </span>
              </Link>
            </li>

            {/* Cart */}
            <li>
              <Link
                href="/cart"
                onClick={onClose}
                className={`flex min-h-[50px] items-center justify-between border-b border-gray-50 px-5 text-[14px] transition ${
                  pathname.startsWith("/cart")
                    ? "bg-[#f4f1ff] font-semibold text-[#6044f0]"
                    : "text-gray-700 hover:bg-gray-50 hover:text-[#6044f0]"
                }`}
              >
                <span className="flex items-center gap-3">
                  <ShoppingCart
                    size={18}
                    strokeWidth={1.8}
                  />
                  Cart
                </span>

                <span className="flex items-center gap-2">
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#6044f0] px-1 text-[10px] font-bold text-white">
                    {cartCount}
                  </span>

                  <ChevronRight
                    size={17}
                    className="text-gray-400"
                  />
                </span>
              </Link>
            </li>

            {/* Orders */}
            <li>
              <Link
                href="/orders"
                onClick={onClose}
                className={`flex min-h-[50px] items-center justify-between border-b border-gray-50 px-5 text-[14px] transition ${
                  pathname.startsWith("/orders")
                    ? "bg-[#f4f1ff] font-semibold text-[#6044f0]"
                    : "text-gray-700 hover:bg-gray-50 hover:text-[#6044f0]"
                }`}
              >
                <span className="flex items-center gap-3">
                  <ShoppingBag
                    size={18}
                    strokeWidth={1.8}
                  />
                  My Orders
                </span>

                <ChevronRight
                  size={17}
                  className="text-gray-400"
                />
              </Link>
            </li>

            {/* Login / Logout */}
            {!isLoading && (
              <>
                {!isLoggedIn ? (
                  <li>
                    <Link
                      href="/login"
                      onClick={onClose}
                      className={`flex min-h-[50px] items-center justify-between border-b border-gray-50 px-5 text-[14px] transition ${
                        pathname.startsWith("/login")
                          ? "bg-[#f4f1ff] font-semibold text-[#6044f0]"
                          : "text-gray-700 hover:bg-gray-50 hover:text-[#6044f0]"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <UserRound
                          size={18}
                          strokeWidth={1.8}
                        />
                        Login / Register
                      </span>

                      <ChevronRight
                        size={17}
                        className="text-gray-400"
                      />
                    </Link>
                  </li>
                ) : (
                  <li>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex min-h-[50px] w-full items-center justify-between border-b border-gray-50 px-5 text-[14px] text-red-500 transition hover:bg-red-50"
                    >
                      <span className="flex items-center gap-3">
                        <LogOut
                          size={18}
                          strokeWidth={1.8}
                        />
                        Logout
                      </span>

                      <ChevronRight
                        size={17}
                        className="text-red-300"
                      />
                    </button>
                  </li>
                )}
              </>
            )}
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