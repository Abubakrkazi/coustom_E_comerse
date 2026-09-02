"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  Package,
  ShoppingBag,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";

type OrderItem = {
  id: number;
  name: string;
  slug: string;
  image: string;
  price: number;
  quantity: number;
};

type Order = {
  id: string;
  date: string;
  status: string;
  payment: string;
  total: number;

  /*
   * Added for user-specific orders
   */
  userId?: string;

  customer?: {
    name: string;
    phone: string;
    address: string;
    city: string;
  };

  items: OrderItem[];
};

type Props = {
  params: Promise<{
    id: string;
  }>;
};

function getStatusStyle(status: string) {
  if (status === "Delivered") {
    return {
      icon: <CheckCircle2 size={18} />,
      className: "bg-green-50 text-green-700",
    };
  }

  if (status === "Processing") {
    return {
      icon: <Clock3 size={18} />,
      className: "bg-orange-50 text-orange-700",
    };
  }

  return {
    icon: <Package size={18} />,
    className: "bg-gray-100 text-gray-700",
  };
}

export default function OrderDetailsPage({
  params,
}: Props) {
  const router = useRouter();

  const {
    isLoggedIn,
    isLoading: authLoading,
    user,
  } = useAuth();

  const [order, setOrder] =
    useState<Order | null>(null);

  const [isLoading, setIsLoading] =
    useState(true);

  /*
   * Protect order details page
   */
  useEffect(() => {
    if (!authLoading && !isLoggedIn) {
      router.replace("/login");
    }
  }, [authLoading, isLoggedIn, router]);

  /*
   * Load order
   */
  useEffect(() => {
    if (
      authLoading ||
      !isLoggedIn ||
      !user
    ) {
      return;
    }

    const loadOrder = async () => {
      try {
        const { id } = await params;

        const savedOrders =
          localStorage.getItem(
            "rawaj-shop-orders"
          );

        if (!savedOrders) {
          setOrder(null);
          setIsLoading(false);
          return;
        }

        const orders: Order[] =
          JSON.parse(savedOrders);

        /*
         * Find order by BOTH:
         * 1. Order ID
         * 2. Current logged-in user ID
         *
         * This prevents another user from
         * opening this order through URL.
         */
        const foundOrder = orders.find(
          (item) =>
            item.id === id &&
            item.userId === user.id
        );

        setOrder(foundOrder || null);
      } catch (error) {
        console.error(
          "Failed to load order:",
          error
        );

        setOrder(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadOrder();
  }, [
    params,
    authLoading,
    isLoggedIn,
    user,
  ]);

  /*
   * Authentication loading
   */
  if (authLoading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-9 w-9 animate-spin rounded-full border-2 border-gray-200 border-t-[#6044f0]" />

          <p className="text-sm text-gray-500">
            Checking your account...
          </p>
        </div>
      </main>
    );
  }

  /*
   * Guest user
   */
  if (!isLoggedIn) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-9 w-9 animate-spin rounded-full border-2 border-gray-200 border-t-[#6044f0]" />

          <p className="text-sm text-gray-500">
            Redirecting to login...
          </p>
        </div>
      </main>
    );
  }

  /*
   * Loading order
   */
  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-12">
        <div className="mx-auto max-w-4xl rounded-2xl bg-white p-10 text-center shadow-sm">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-[#6044f0]" />

          <p className="text-sm text-gray-500">
            Loading order details...
          </p>
        </div>
      </main>
    );
  }

  /*
   * Order not found OR
   * order belongs to another user
   */
  if (!order) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-12">
        <div className="mx-auto max-w-2xl rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <Package
              size={30}
              className="text-gray-400"
            />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-gray-900">
            Order Not Found
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            We couldn't find the order you're looking for.
          </p>

          <Link
            href="/orders"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#6044f0] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#5035d8]"
          >
            <ArrowLeft size={17} />
            Back to Orders
          </Link>
        </div>
      </main>
    );
  }

  const statusStyle =
    getStatusStyle(order.status);

  return (
    <main className="min-h-screen bg-gray-50 py-8 sm:py-10">
      <div className="mx-auto max-w-4xl px-4">

        {/* Back */}
        <Link
          href="/orders"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#6044f0]"
        >
          <ArrowLeft size={17} />
          Back to Orders
        </Link>

        {/* Main Card */}
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

          {/* Header */}
          <div className="border-b border-gray-100 p-5 sm:p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <p className="text-xs text-gray-400">
                  Order ID
                </p>

                <h1 className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl">
                  {order.id}
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                  Placed on {order.date}
                </p>
              </div>

              <div
                className={`inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${statusStyle.className}`}
              >
                {statusStyle.icon}
                {order.status}
              </div>
            </div>
          </div>

          {/* Customer Information */}
          {order.customer && (
            <div className="border-b border-gray-100 p-5 sm:p-6">
              <h2 className="text-base font-bold text-gray-900">
                Delivery Information
              </h2>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">

                {/* Customer Name */}
                <div>
                  <p className="text-xs text-gray-400">
                    Customer Name
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-800">
                    {order.customer.name}
                  </p>
                </div>

                {/* Phone */}
                <div>
                  <p className="text-xs text-gray-400">
                    Phone
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-800">
                    {order.customer.phone}
                  </p>
                </div>

                {/* City */}
                <div>
                  <p className="text-xs text-gray-400">
                    City
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-800">
                    {order.customer.city}
                  </p>
                </div>

                {/* Payment */}
                <div>
                  <p className="text-xs text-gray-400">
                    Payment
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-800">
                    {order.payment}
                  </p>
                </div>

                {/* Address */}
                <div className="sm:col-span-2">
                  <p className="text-xs text-gray-400">
                    Delivery Address
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-800">
                    {order.customer.address}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Products */}
          <div className="p-5 sm:p-6">
            <h2 className="text-base font-bold text-gray-900">
              Ordered Products
            </h2>

            <div className="mt-4 divide-y divide-gray-100">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 py-4 first:pt-0 last:pb-0"
                >
                  {/* Image */}
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-24 sm:w-24">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-gray-800 sm:text-base">
                      {item.name}
                    </h3>

                    <p className="mt-2 text-xs text-gray-500">
                      Quantity: {item.quantity}
                    </p>

                    <p className="mt-2 text-sm font-bold text-[#6044f0]">
                      ৳ {item.price.toLocaleString()}
                    </p>
                  </div>

                  {/* Total */}
                  <div className="text-right">
                    <p className="text-xs text-gray-400">
                      Total
                    </p>

                    <p className="mt-1 text-sm font-bold text-gray-900">
                      ৳{" "}
                      {(
                        item.price *
                        item.quantity
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="border-t border-gray-100 bg-gray-50/70 p-5 sm:p-6">
            <div className="ml-auto max-w-sm space-y-3">

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">
                  Payment Method
                </span>

                <span className="font-medium text-gray-800">
                  {order.payment}
                </span>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 pt-3">
                <span className="text-base font-semibold text-gray-800">
                  Total Amount
                </span>

                <span className="text-xl font-bold text-gray-900">
                  ৳ {order.total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex flex-col gap-3 border-t border-gray-100 p-5 sm:flex-row sm:justify-end sm:p-6">

            <Link
              href="/orders"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:border-[#6044f0] hover:text-[#6044f0]"
            >
              <Package size={17} />
              All Orders
            </Link>

            <Link
              href="/collections/trending"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#6044f0] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#5035d8]"
            >
              <ShoppingBag size={17} />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}