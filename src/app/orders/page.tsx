
"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Package,
  ShoppingBag,
} from "lucide-react";

const orders = [
  {
    id: "ORD-1001",
    date: "September 1, 2026",
    status: "Delivered",
    payment: "Cash on Delivery",
    total: 550,
    items: [
      {
        id: 1,
        name: "Premium Quality Kitchen Product",
        image: "/images/products/wholesale/product-1.jpg",
        price: 550,
        quantity: 1,
      },
    ],
  },
  {
    id: "ORD-1002",
    date: "August 28, 2026",
    status: "Processing",
    payment: "Online Payment",
    total: 1250,
    items: [
      {
        id: 2,
        name: "Smart Wireless Gadget",
        image: "/images/products/electronics/product-1.jpg",
        price: 850,
        quantity: 1,
      },
      {
        id: 3,
        name: "Premium Baby Care Product",
        image: "/images/products/baby-item/product-1.jpg",
        price: 400,
        quantity: 1,
      },
    ],
  },
];

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
              <span>{orders.length} Orders</span>
            </div>
          </div>
        </div>

        {/* Orders */}
        <div className="space-y-5">
          {orders.map((order) => {
            const statusStyle = getStatusStyle(order.status);

            return (
              <article
                key={order.id}
                className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
              >
                {/* Order Header */}
                <div className="flex flex-col gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="grid grid-cols-2 gap-x-8 gap-y-3 sm:flex sm:items-center sm:gap-10">
                    <div>
                      <p className="text-xs text-gray-400">Order ID</p>
                      <p className="mt-1 text-sm font-bold text-gray-800">
                        {order.id}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">Order Date</p>
                      <p className="mt-1 text-sm font-medium text-gray-700">
                        {order.date}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">Payment</p>
                      <p className="mt-1 text-sm font-medium text-gray-700">
                        {order.payment}
                      </p>
                    </div>
                  </div>

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
                          ৳ {item.price}
                        </p>
                      </div>

                      {/* Item Total */}
                      <div className="hidden text-right sm:block">
                        <p className="text-xs text-gray-400">
                          Item Total
                        </p>

                        <p className="mt-1 text-sm font-bold text-gray-800">
                          ৳ {item.price * item.quantity}
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
                      ৳ {order.total}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 sm:flex-row">
                    <button
                      type="button"
                      className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-[#6044f0] hover:text-[#6044f0]"
                    >
                      Buy Again
                    </button>

                    <button
                      type="button"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#6044f0] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#5035d8]"
                    >
                      View Details
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Empty State - ready for future backend */}
        {orders.length === 0 && (
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

