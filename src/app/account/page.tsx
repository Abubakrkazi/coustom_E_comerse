"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  UserRound,
  Mail,
  Phone,
  ShoppingBag,
  Heart,
  LogOut,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";

export default function AccountPage() {
  const router = useRouter();

  const {
    user,
    isLoggedIn,
    isLoading,
    logout,
  } = useAuth();

  const { wishlistCount } = useWishlist();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.replace("/login");
    }
  }, [isLoading, isLoggedIn, router]);

  if (isLoading || !isLoggedIn || !user) {
    return (
      <main className="min-h-[70vh] bg-[#f7f7fb]">
        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="h-9 w-9 animate-spin rounded-full border-2 border-gray-200 border-t-[#6044f0]" />
        </div>
      </main>
    );
  }

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-[#f7f7fb] py-8 sm:py-10 lg:py-12">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-[#6044f0]">
            MY ACCOUNT
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Account Dashboard
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage your profile, orders and favorite products.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">

          {/* Profile Card */}
          <aside className="h-fit overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

            {/* Profile Top */}
            <div className="bg-[#6044f0] px-6 py-7">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-[#6044f0] shadow-md">
                  <UserRound
                    size={36}
                    strokeWidth={1.7}
                  />
                </div>

                <h2 className="mt-4 text-lg font-bold text-white">
                  {user.name}
                </h2>

                <p className="mt-1 max-w-full truncate text-xs text-white/70">
                  {user.email}
                </p>
              </div>
            </div>

            {/* Profile Navigation */}
            <div className="p-3">

              {/* Account */}
              <div className="flex items-center justify-between rounded-lg bg-[#f4f1ff] px-4 py-3 text-sm font-semibold text-[#6044f0]">
                <span className="flex items-center gap-3">
                  <UserRound size={18} />
                  My Account
                </span>
              </div>

              {/* Orders */}
              <Link
                href="/orders"
                className="mt-1 flex items-center justify-between rounded-lg px-4 py-3 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-[#6044f0]"
              >
                <span className="flex items-center gap-3">
                  <ShoppingBag size={18} />
                  My Orders
                </span>

                <ChevronRight size={17} className="text-gray-400" />
              </Link>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="mt-1 flex items-center justify-between rounded-lg px-4 py-3 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-[#6044f0]"
              >
                <span className="flex items-center gap-3">
                  <Heart size={18} />
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

              {/* Logout */}
              <button
                type="button"
                onClick={handleLogout}
                className="mt-1 flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-red-500 transition hover:bg-red-50"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </aside>

          {/* Right Content */}
          <div className="space-y-6">

            {/* Welcome Card */}
            <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-7">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-gray-900">
                      Hello, {user.name}
                    </h2>

                    <span className="rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-green-600">
                      Active
                    </span>
                  </div>

                  <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
                    Welcome to your Rawaj Shop account.
                    From here you can manage your personal
                    information and keep track of your shopping
                    activity.
                  </p>
                </div>

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#f3f0ff] text-[#6044f0]">
                  <ShieldCheck
                    size={28}
                    strokeWidth={1.7}
                  />
                </div>
              </div>
            </section>

            {/* Account Information */}
            <section className="rounded-2xl border border-gray-100 bg-white shadow-sm">

              <div className="border-b border-gray-100 px-6 py-5 sm:px-7">
                <h2 className="text-lg font-bold text-gray-900">
                  Personal Information
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  Your account information
                </p>
              </div>

              <div className="grid gap-5 p-6 sm:grid-cols-2 sm:p-7">

                {/* Name */}
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-[#6044f0]">
                      <UserRound size={19} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                        Full Name
                      </p>

                      <p className="mt-1 truncate text-sm font-semibold text-gray-800">
                        {user.name}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-[#6044f0]">
                      <Mail size={19} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                        Email Address
                      </p>

                      <p className="mt-1 truncate text-sm font-semibold text-gray-800">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-[#6044f0]">
                      <Phone size={19} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                        Phone Number
                      </p>

                      <p className="mt-1 truncate text-sm font-semibold text-gray-800">
                        {user.phone || "Not provided"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Account ID */}
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-[#6044f0]">
                      <ShieldCheck size={19} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                        Account ID
                      </p>

                      <p className="mt-1 truncate text-sm font-semibold text-gray-800">
                        {user.id}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Actions */}
            <section className="grid gap-4 sm:grid-cols-2">

              {/* Orders */}
              <Link
                href="/orders"
                className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#ddd7ff] hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f3f0ff] text-[#6044f0]">
                    <ShoppingBag size={21} />
                  </div>

                  <ChevronRight
                    size={19}
                    className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-[#6044f0]"
                  />
                </div>

                <h3 className="mt-4 text-sm font-bold text-gray-900">
                  My Orders
                </h3>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  View and track your previous orders.
                </p>
              </Link>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#ddd7ff] hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f3f0ff] text-[#6044f0]">
                    <Heart size={21} />
                  </div>

                  <ChevronRight
                    size={19}
                    className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-[#6044f0]"
                  />
                </div>

                <h3 className="mt-4 text-sm font-bold text-gray-900">
                  Wishlist
                </h3>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  You currently have{" "}
                  <span className="font-semibold text-[#6044f0]">
                    {wishlistCount}
                  </span>{" "}
                  saved products.
                </p>
              </Link>
            </section>

            {/* Back Shopping */}
            <div className="text-center">
              <Link
                href="/"
                className="text-sm font-medium text-gray-400 transition hover:text-[#6044f0]"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}