
"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { cartItems, cartCount, cartTotal, clearCart } = useCart();

  const [orderPlaced, setOrderPlaced] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.address) {
      alert("Please fill in all required fields.");
      return;
    }

    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-12">
        <div className="mx-auto max-w-xl rounded-lg bg-white p-8 text-center shadow-sm">
          <CheckCircle
            size={64}
            className="mx-auto text-green-500"
          />

          <h1 className="mt-5 text-2xl font-bold text-gray-800">
            Order Placed Successfully!
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Thank you for your order. We will contact you shortly.
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex rounded-md bg-[#6044f0] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#5035d8]"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-12">
        <div className="mx-auto max-w-xl rounded-lg bg-white p-8 text-center shadow-sm">
          <div className="text-5xl">🛒</div>

          <h1 className="mt-4 text-2xl font-bold text-gray-800">
            Your cart is empty
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Add some products to your cart before checkout.
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex rounded-md bg-[#6044f0] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#5035d8]"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/cart"
            className="mb-4 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-[#6044f0]"
          >
            <ArrowLeft size={16} />
            Back to Cart
          </Link>

          <h1 className="text-2xl font-bold text-gray-800">
            Checkout
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Complete your information to place your order.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Customer Information */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="rounded-lg bg-white p-5 shadow-sm"
            >
              <h2 className="text-lg font-bold text-gray-800">
                Delivery Information
              </h2>

              <div className="mt-5 space-y-4">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Full Name *
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#6044f0]"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Phone Number *
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="01XXXXXXXXX"
                    className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#6044f0]"
                    required
                  />
                </div>

                {/* Address */}
                <div>
                  <label
                    htmlFor="address"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Delivery Address *
                  </label>

                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your complete delivery address"
                    rows={4}
                    className="w-full resize-none rounded-md border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#6044f0]"
                    required
                  />
                </div>

                {/* City */}
                <div>
                  <label
                    htmlFor="city"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    City
                  </label>

                  <input
                    id="city"
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Dhaka"
                    className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#6044f0]"
                  />
                </div>

                {/* Payment */}
                <div>
                  <h3 className="mb-2 text-sm font-semibold text-gray-800">
                    Payment Method
                  </h3>

                  <div className="rounded-md border border-[#6044f0] bg-[#f8f6ff] p-4">
                    <label className="flex cursor-pointer items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        defaultChecked
                      />

                      <div>
                        <p className="text-sm font-semibold text-gray-800">
                          Cash on Delivery
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          Pay when your order arrives.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Place Order */}
                <button
                  type="submit"
                  className="w-full rounded-md bg-[#6044f0] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#5035d8]"
                >
                  Place Order
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="h-fit rounded-lg bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800">
              Order Summary
            </h2>

            <div className="mt-4 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 border-b border-gray-100 pb-4"
                >
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-sm font-medium text-gray-800">
                      {item.name}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Qty: {item.quantity}
                    </p>

                    <p className="mt-1 text-sm font-semibold text-[#6044f0]">
                      ৳ {item.price * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 flex justify-between border-b border-gray-100 pb-4 text-sm">
              <span className="text-gray-500">
                Subtotal ({cartCount} items)
              </span>

              <span className="font-semibold text-gray-800">
                ৳ {cartTotal}
              </span>
            </div>

            <div className="mt-4 flex justify-between">
              <span className="font-semibold text-gray-800">
                Total
              </span>

              <span className="text-xl font-bold text-[#6044f0]">
                ৳ {cartTotal}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

