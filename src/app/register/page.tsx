"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Phone,
  ShieldCheck,
  ShoppingBag,
  UserRound,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    if (password.length < 6) {
      setError(
        "Password must be at least 6 characters long."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    const success = register({
      name: name.trim(),
      email: email.trim(),
      password,
      phone: phone.trim() || undefined,
    });

    if (!success) {
      setError(
        "An account with this email already exists."
      );
      setIsSubmitting(false);
      return;
    }

    router.push("/");
  };

  return (
    <main className="min-h-screen bg-[#f7f7fb]">
      <div className="mx-auto flex min-h-screen w-full max-w-[1440px] items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid w-full max-w-[1100px] overflow-hidden rounded-2xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] lg:grid-cols-2">

          {/* Left Side */}
          <div className="relative hidden overflow-hidden bg-[#6044f0] p-10 lg:flex lg:min-h-[720px] lg:flex-col lg:justify-between">

            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10" />

            <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-white/10" />

            <div className="relative z-10">
              <Link
                href="/"
                className="inline-flex items-center"
              >
                <span className="text-[30px] font-extrabold tracking-[-1.5px] text-white">
                  Rawaj
                </span>

                <span className="ml-1 text-[30px] font-extrabold tracking-[-1.5px] text-white/90">
                  Shop
                </span>
              </Link>

              <div className="mt-20 max-w-md">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                  <UserRound
                    size={28}
                    className="text-white"
                    strokeWidth={1.8}
                  />
                </div>

                <h1 className="text-4xl font-bold leading-tight text-white">
                  Create your
                  <span className="block">
                    Rawaj account
                  </span>
                </h1>

                <p className="mt-5 text-[15px] leading-7 text-white/75">
                  Join Rawaj Shop and enjoy a simple,
                  convenient shopping experience with easy
                  order management and saved favorites.
                </p>
              </div>
            </div>

            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-3 text-sm text-white/85">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                  <ShieldCheck size={18} />
                </div>

                <span>
                  Simple and secure account experience
                </span>
              </div>

              <div className="flex items-center gap-3 text-sm text-white/85">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                  <ShoppingBag size={18} />
                </div>

                <span>
                  Manage your orders from one place
                </span>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex min-h-[720px] items-center justify-center px-5 py-10 sm:px-10">
            <div className="w-full max-w-[430px]">

              {/* Mobile Logo */}
              <div className="mb-8 lg:hidden">
                <Link
                  href="/"
                  className="inline-flex items-center"
                >
                  <span className="text-[28px] font-extrabold tracking-[-1.3px] text-[#6044f0]">
                    Rawaj
                  </span>

                  <span className="ml-1 text-[28px] font-extrabold tracking-[-1.3px] text-gray-800">
                    Shop
                  </span>
                </Link>
              </div>

              {/* Heading */}
              <div>
                <p className="mb-2 text-sm font-semibold text-[#6044f0]">
                  CREATE ACCOUNT
                </p>

                <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                  Get started
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Create your account to start shopping with
                  Rawaj Shop.
                </p>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="mt-7 space-y-4"
              >

                {/* Error */}
                {error && (
                  <div className="rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                  </div>
                )}

                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Full Name
                  </label>

                  <div className="relative">
                    <UserRound
                      size={19}
                      strokeWidth={1.8}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(event) => {
                        setName(event.target.value);
                        setError("");
                      }}
                      required
                      className="h-12 w-full rounded-lg border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#6044f0] focus:ring-4 focus:ring-[#6044f0]/10"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Email Address
                  </label>

                  <div className="relative">
                    <Mail
                      size={19}
                      strokeWidth={1.8}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value);
                        setError("");
                      }}
                      required
                      className="h-12 w-full rounded-lg border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#6044f0] focus:ring-4 focus:ring-[#6044f0]/10"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Phone Number
                    <span className="ml-1 font-normal text-gray-400">
                      (Optional)
                    </span>
                  </label>

                  <div className="relative">
                    <Phone
                      size={19}
                      strokeWidth={1.8}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="Enter your phone number"
                      value={phone}
                      onChange={(event) => {
                        setPhone(event.target.value);
                        setError("");
                      }}
                      className="h-12 w-full rounded-lg border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#6044f0] focus:ring-4 focus:ring-[#6044f0]/10"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <LockKeyhole
                      size={19}
                      strokeWidth={1.8}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="password"
                      name="password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      autoComplete="new-password"
                      placeholder="Create a password"
                      value={password}
                      onChange={(event) => {
                        setPassword(event.target.value);
                        setError("");
                      }}
                      required
                      className="h-12 w-full rounded-lg border border-gray-200 bg-white pl-11 pr-12 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#6044f0] focus:ring-4 focus:ring-[#6044f0]/10"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          (current) => !current
                        )
                      }
                      className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Confirm Password
                  </label>

                  <div className="relative">
                    <LockKeyhole
                      size={19}
                      strokeWidth={1.8}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      autoComplete="new-password"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(event) => {
                        setConfirmPassword(
                          event.target.value
                        );
                        setError("");
                      }}
                      required
                      className="h-12 w-full rounded-lg border border-gray-200 bg-white pl-11 pr-12 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#6044f0] focus:ring-4 focus:ring-[#6044f0]/10"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          (current) => !current
                        )
                      }
                      className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                      aria-label={
                        showConfirmPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Terms */}
                <p className="text-[11px] leading-5 text-gray-400">
                  By creating an account, you agree to our
                  terms and conditions.
                </p>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#6044f0] text-sm font-semibold text-white shadow-sm transition hover:bg-[#5035d8] hover:shadow-md active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? (
                    "Creating Account..."
                  ) : (
                    <>
                      Create Account

                      <ArrowRight
                        size={18}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>
              </form>

              {/* Login Divider */}
              <div className="my-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-gray-200" />

                <span className="text-xs text-gray-400">
                  Already have an account?
                </span>

                <div className="h-px flex-1 bg-gray-200" />
              </div>

              {/* Login */}
              <Link
                href="/login"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-gray-200 text-sm font-semibold text-gray-700 transition hover:border-[#6044f0] hover:bg-[#f8f6ff] hover:text-[#6044f0]"
              >
                <UserRound
                  size={18}
                  strokeWidth={1.8}
                />

                Sign In Instead
              </Link>

              {/* Back */}
              <div className="mt-5 text-center">
                <Link
                  href="/"
                  className="text-xs font-medium text-gray-400 transition hover:text-[#6044f0]"
                >
                  ← Back to shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}