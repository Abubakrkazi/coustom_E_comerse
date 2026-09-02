"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Package,
  ShoppingBag,
} from "lucide-react";

import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/context/AuthContext";
import { Product } from "@/types/product";

type OrderItem = Product & {
  quantity: number;
};

type Order = {
  id: string;
  date: string;
  status: string;
  payment: string;
  total: number;

  userId?: string;

  customer?: {
    name: string;
    phone: string;
    address: string;
    city: string;
  };

  items: OrderItem[];
};

function getStatusStyle(status: string) {
  if (status === "Delivered") {
    return {
      icon: <CheckCircle2 size={15} />,
      className: "bg-green-50 text-green-700",
    };
  }

  if (status === "Processing") {
    return {
      icon: <Clock3 size={15} />,
      className: "bg-orange-50 text-orange-700",
    };
  }

  return {
    icon: <Package size={15} />,
    className: "bg-gray-100 text-gray-700",
  };
}

export default function OrdersPage() {
  const router = useRouter();

  const {
    isLoggedIn,
    isLoading: authLoading,
    user,
  } = useAuth();

  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { addToCart } = useCart();

  /*
   * Protect Orders page
   */
  useEffect(() => {
    if (!authLoading && !isLoggedIn) {
      router.replace("/login");
    }
  }, [authLoading, isLoggedIn, router]);

  /*
   * Load only current user's orders
   */
  useEffect(() => {
    if (authLoading || !isLoggedIn || !user) {
      return;
    }

    try {
      const savedOrders =
        localStorage.getItem("rawaj-shop-orders");

      if (!savedOrders) {
        setOrders([]);
        setIsLoading(false);
        return;
      }

      const parsedOrders: Order[] =
        JSON.parse(savedOrders);

      const userOrders = parsedOrders.filter(
        (order) => order.userId === user.id
      );

      setOrders(userOrders);
    } catch (error) {
      console.error(
        "Failed to load orders:",
        error
      );

      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  }, [authLoading, isLoggedIn, user]);

  const handleBuyAgain = (items: OrderItem[]) => {
    items.forEach((item) => {
      addToCart(item);
    });

    alert("Products added to cart!");
  };

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

  return (
    <main className="min-h-screen bg-gray-50 py-8 sm:py-10">
      <div className="mx-auto max-w-6xl px-4">

        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#6044f0]"
          >
            <ArrowLeft size={17} />
            Continue Shopping
          </Link>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                My Orders
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                View and manage your recent orders.
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <ShoppingBag size={18} />

              <span>
                {orders.length}{" "}
                {orders.length === 1
                  ? "Order"
                  : "Orders"}
              </span>
            </div>
          </div>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-[#6044f0]" />

            <p className="text-sm text-gray-500">
              Loading orders...
            </p>
          </div>
        )}

        {/* Orders */}
        {!isLoading && orders.length > 0 && (
          <div className="space-y-5">
            {orders.map((order) => {
              const statusStyle =
                getStatusStyle(order.status);

              return (
                <article
                  key={order.id}
                  className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
                >
                  {/* Order Header */}
                  <div className="flex flex-col gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="grid grid-cols-2 gap-x-8 gap-y-3 sm:flex sm:items-center sm:gap-10">

                      {/* Order ID */}
                      <div>
                        <p className="text-xs text-gray-400">
                          Order ID
                        </p>

                        <p className="mt-1 text-sm font-bold text-gray-800">
                          {order.id}
                        </p>
                      </div>

                      {/* Date */}
                      <div>
                        <p className="text-xs text-gray-400">
                          Order Date
                        </p>

                        <p className="mt-1 text-sm font-medium text-gray-700">
                          {order.date}
                        </p>
                      </div>

                      {/* Payment */}
                      <div>
                        <p className="text-xs text-gray-400">
                          Payment
                        </p>

                        <p className="mt-1 text-sm font-medium text-gray-700">
                          {order.payment}
                        </p>
                      </div>
                    </div>

                    {/* Status */}
                    <div
                      className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyle.className}`}
                    >
                      {statusStyle.icon}

                      {order.status}
                    </div>
                  </div>

                  {/* Products */}
                  <div className="divide-y divide-gray-100">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-4 p-5"
                      >
                        {/* Product Image */}
                        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-24 sm:w-24">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="96px"
                            className="object-cover"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="min-w-0 flex-1">
                          <h2 className="line-clamp-2 text-sm font-semibold text-gray-800 sm:text-base">
                            {item.name}
                          </h2>

                          <p className="mt-2 text-xs text-gray-500">
                            Quantity: {item.quantity}
                          </p>

                          <p className="mt-2 text-sm font-bold text-[#6044f0]">
                            ৳ {item.price.toLocaleString()}
                          </p>
                        </div>

                        {/* Item Total */}
                        <div className="hidden text-right sm:block">
                          <p className="text-xs text-gray-400">
                            Item Total
                          </p>

                          <p className="mt-1 text-sm font-bold text-gray-800">
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

                  {/* Footer */}
                  <div className="flex flex-col gap-4 border-t border-gray-100 bg-gray-50/70 p-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs text-gray-500">
                        Total Amount
                      </p>

                      <p className="mt-1 text-xl font-bold text-gray-900">
                        ৳ {order.total.toLocaleString()}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 sm:flex-row">

                      {/* Buy Again */}
                      <button
                        type="button"
                        onClick={() =>
                          handleBuyAgain(order.items)
                        }
                        className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-[#6044f0] hover:text-[#6044f0]"
                      >
                        Buy Again
                      </button>

                      {/* View Details */}
                      <Link
                        href={`/orders/${order.id}`}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#6044f0] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#5035d8]"
                      >
                        View Details

                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && orders.length === 0 && (
          <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f1efff]">
              <ShoppingBag
                size={28}
                className="text-[#6044f0]"
              />
            </div>

            <h2 className="mt-5 text-xl font-bold text-gray-800">
              No orders yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
              You haven't placed any orders yet. Start shopping and
              your orders will appear here.
            </p>

            <Link
              href="/"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#6044f0] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#5035d8]"
            >
              Start Shopping

              <ArrowRight size={17} />
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}