"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Lock,
  ShieldCheck,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

type PaymentMethod =
  | "cod"
  | "bkash"
  | "nagad"
  | "card"
  | "internet-banking";

export default function CheckoutPage() {
  const router = useRouter();

  const { user, isLoggedIn, isLoading } = useAuth();

  const {
    cartItems,
    cartCount,
    cartTotal,
    clearCart,
  } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("cod");

  const [isSubmitting, setIsSubmitting] = useState(false);

  /*
   * Protect checkout page
   * Guest user -> Login page
   */
  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.replace("/login");
    }
  }, [isLoading, isLoggedIn, router]);

  /*
   * Auto-fill logged-in user's information
   */
  useEffect(() => {
    if (!isLoading && isLoggedIn && user) {
      setName(user.name || "");
      setPhone(user.phone || "");
    }
  }, [isLoading, isLoggedIn, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoggedIn || !user) {
      router.replace("/login");
      return;
    }

    if (cartItems.length === 0) {
      return;
    }

    setIsSubmitting(true);

    const order = {
      id: `ORD-${Date.now()}`,

      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),

      status: "Processing",

      payment:
        paymentMethod === "cod"
          ? "Cash on Delivery"
          : "Online Payment",

      total: cartTotal,

      customer: {
        name,
        phone,
        address,
        city,
      },

      /*
       * Store logged-in user ID
       * This will be useful when backend is added later.
       */
      userId: user.id,

      items: cartItems,
    };

    try {
      const savedOrders =
        localStorage.getItem("rawaj-shop-orders");

      const existingOrders = savedOrders
        ? JSON.parse(savedOrders)
        : [];

      localStorage.setItem(
        "rawaj-shop-orders",
        JSON.stringify([
          order,
          ...existingOrders,
        ])
      );

      clearCart();

      /*
       * Send order ID to success page
       */
      router.push(
        `/order-success?orderId=${order.id}`
      );
    } catch (error) {
      console.error(
        "Failed to place order:",
        error
      );

      alert(
        "Something went wrong. Please try again."
      );

      setIsSubmitting(false);
    }
  };

  /*
   * While checking authentication
   */
  if (isLoading) {
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
   * Redirect is already happening.
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
   * Cart empty
   */
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="mx-auto max-w-3xl px-4">
          <div className="rounded-xl bg-white p-10 text-center shadow-sm">
            <div className="mb-4 text-5xl">
              🛒
            </div>

            <h1 className="text-2xl font-bold text-gray-800">
              Your cart is empty
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Please add some products before checkout.
            </p>

            <Link
              href="/"
              className="mt-6 inline-flex rounded-lg bg-[#6044f0] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#5035d8]"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const onlinePayment =
    paymentMethod !== "cod";

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-6xl px-4">

        {/* Back */}
        <Link
          href="/cart"
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#6044f0]"
        >
          <ArrowLeft size={16} />
          Back to Cart
        </Link>

        {/* Header */}
        <div className="mb-7">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Checkout
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Complete your information and choose your preferred payment method.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">

          {/* LEFT */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* Delivery Information */}
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="mb-5">
                  <h2 className="text-lg font-bold text-gray-900">
                    Delivery Information
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Enter the information where you want your order delivered.
                  </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2">

                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-semibold text-gray-700"
                    >
                      Full Name
                    </label>

                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) =>
                        setName(e.target.value)
                      }
                      placeholder="Enter your full name"
                      required
                      className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#6044f0] focus:ring-2 focus:ring-[#6044f0]/10"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm font-semibold text-gray-700"
                    >
                      Phone Number
                    </label>

                    <input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) =>
                        setPhone(e.target.value)
                      }
                      placeholder="01XXXXXXXXX"
                      required
                      className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#6044f0] focus:ring-2 focus:ring-[#6044f0]/10"
                    />
                  </div>

                  {/* Address */}
                  <div className="md:col-span-2">
                    <label
                      htmlFor="address"
                      className="mb-2 block text-sm font-semibold text-gray-700"
                    >
                      Delivery Address
                    </label>

                    <textarea
                      id="address"
                      value={address}
                      onChange={(e) =>
                        setAddress(e.target.value)
                      }
                      placeholder="House, Road, Area, Landmark..."
                      rows={4}
                      required
                      className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#6044f0] focus:ring-2 focus:ring-[#6044f0]/10"
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label
                      htmlFor="city"
                      className="mb-2 block text-sm font-semibold text-gray-700"
                    >
                      City
                    </label>

                    <input
                      id="city"
                      type="text"
                      value={city}
                      onChange={(e) =>
                        setCity(e.target.value)
                      }
                      placeholder="Dhaka"
                      required
                      className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#6044f0] focus:ring-2 focus:ring-[#6044f0]/10"
                    />
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="mb-5">
                  <h2 className="text-lg font-bold text-gray-900">
                    Payment Method
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Choose how you want to pay for your order.
                  </p>
                </div>

                <div className="space-y-3">

                  {/* COD */}
                  <button
                    type="button"
                    onClick={() =>
                      setPaymentMethod("cod")
                    }
                    className={`w-full rounded-xl border p-4 text-left transition ${
                      paymentMethod === "cod"
                        ? "border-[#6044f0] bg-[#6044f0]/5 ring-1 ring-[#6044f0]"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-100 text-xl">
                        💵
                      </div>

                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">
                          Cash on Delivery
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          Pay when your order arrives.
                        </p>
                      </div>

                      {paymentMethod === "cod" && (
                        <CheckCircle2
                          size={21}
                          className="text-[#6044f0]"
                        />
                      )}
                    </div>
                  </button>

                  {/* Online Payment */}
                  <button
                    type="button"
                    onClick={() =>
                      setPaymentMethod("bkash")
                    }
                    className={`w-full rounded-xl border p-4 text-left transition ${
                      onlinePayment
                        ? "border-[#6044f0] bg-[#6044f0]/5 ring-1 ring-[#6044f0]"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-pink-50 text-sm font-bold text-pink-600">
                        ৳
                      </div>

                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">
                          Online Payment
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          Pay securely using your preferred payment method.
                        </p>
                      </div>

                      {onlinePayment && (
                        <CheckCircle2
                          size={21}
                          className="text-[#6044f0]"
                        />
                      )}
                    </div>
                  </button>
                </div>

                {/* Online Methods */}
                {onlinePayment && (
                  <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <p className="mb-3 text-sm font-semibold text-gray-800">
                      Select Payment Method
                    </p>

                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">

                      {/* bKash */}
                      <button
                        type="button"
                        onClick={() =>
                          setPaymentMethod("bkash")
                        }
                        className={`rounded-lg border bg-white p-4 transition ${
                          paymentMethod === "bkash"
                            ? "border-pink-500 ring-2 ring-pink-100"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <div className="flex h-10 items-center justify-center text-lg font-extrabold text-pink-600">
                            bKash
                          </div>

                          <span className="text-xs text-gray-500">
                            bKash
                          </span>
                        </div>
                      </button>

                      {/* Nagad */}
                      <button
                        type="button"
                        onClick={() =>
                          setPaymentMethod("nagad")
                        }
                        className={`rounded-lg border bg-white p-4 transition ${
                          paymentMethod === "nagad"
                            ? "border-orange-500 ring-2 ring-orange-100"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <div className="flex h-10 items-center justify-center text-lg font-extrabold text-orange-500">
                            Nagad
                          </div>

                          <span className="text-xs text-gray-500">
                            Nagad
                          </span>
                        </div>
                      </button>

                      {/* Card */}
                      <button
                        type="button"
                        onClick={() =>
                          setPaymentMethod("card")
                        }
                        className={`rounded-lg border bg-white p-4 transition ${
                          paymentMethod === "card"
                            ? "border-blue-500 ring-2 ring-blue-100"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <div className="flex h-10 items-center justify-center text-lg font-extrabold text-blue-600">
                            CARD
                          </div>

                          <span className="text-xs text-gray-500">
                            Debit / Credit
                          </span>
                        </div>
                      </button>

                      {/* Banking */}
                      <button
                        type="button"
                        onClick={() =>
                          setPaymentMethod(
                            "internet-banking"
                          )
                        }
                        className={`rounded-lg border bg-white p-4 transition ${
                          paymentMethod ===
                          "internet-banking"
                            ? "border-indigo-500 ring-2 ring-indigo-100"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <div className="flex h-10 items-center justify-center text-sm font-extrabold text-indigo-600">
                            BANK
                          </div>

                          <span className="text-xs text-gray-500">
                            Internet Banking
                          </span>
                        </div>
                      </button>
                    </div>

                    {/* Secure Notice */}
                    <div className="mt-4 flex items-start gap-3 rounded-lg border border-green-100 bg-green-50 p-4">
                      <ShieldCheck
                        size={20}
                        className="mt-0.5 shrink-0 text-green-600"
                      />

                      <div>
                        <p className="text-sm font-semibold text-green-800">
                          Secure Online Payment
                        </p>

                        <p className="mt-1 text-xs leading-5 text-green-700">
                          Your payment will be processed securely through our
                          payment gateway. Your card or mobile banking
                          credentials are never stored on our website.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#6044f0] px-5 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-[#5035d8] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? (
                    "Processing..."
                  ) : paymentMethod === "cod" ? (
                    "Place Order"
                  ) : (
                    <>
                      <Lock size={17} />
                      Pay ৳ {cartTotal}
                    </>
                  )}
                </button>

                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
                  <Lock size={13} />
                  Secure checkout
                </div>
              </div>
            </form>
          </div>

          {/* RIGHT - ORDER SUMMARY */}
          <div className="h-fit rounded-xl bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900">
              Order Summary
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              {cartCount}{" "}
              {cartCount === 1
                ? "item"
                : "items"}
            </p>

            <div className="mt-5 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between gap-3 border-b border-gray-100 pb-4"
                >
                  <div className="min-w-0">
                    <p className="line-clamp-2 text-sm font-medium text-gray-700">
                      {item.name}
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <span className="shrink-0 text-sm font-semibold text-gray-800">
                    ৳ {item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 space-y-3 border-b border-gray-100 pb-5">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  Items
                </span>

                <span className="font-medium text-gray-800">
                  {cartCount}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  Subtotal
                </span>

                <span className="font-medium text-gray-800">
                  ৳ {cartTotal}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  Delivery
                </span>

                <span className="font-medium text-green-600">
                  Free
                </span>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <span className="font-semibold text-gray-900">
                Total
              </span>

              <span className="text-2xl font-bold text-[#6044f0]">
                ৳ {cartTotal}
              </span>
            </div>

            <div className="mt-5 rounded-lg bg-gray-50 p-3">
              <div className="flex items-center gap-2">
                <ShieldCheck
                  size={17}
                  className="text-green-600"
                />

                <span className="text-xs font-medium text-gray-600">
                  Safe & Secure Checkout
                </span>
              </div>
            </div>

            <Link
              href="/cart"
              className="mt-5 block text-center text-sm font-medium text-gray-500 transition hover:text-[#6044f0]"
            >
              ← Back to Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}