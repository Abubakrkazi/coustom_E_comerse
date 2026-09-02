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
  ShieldCheck,
  ShoppingBag,
  UserRound,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setIsSubmitting(true);

    const success = login({
      email: email.trim(),
      password,
    });

    if (!success) {
      setError("Invalid email or password. Please try again.");
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
          <div className="relative hidden overflow-hidden bg-[#6044f0] p-10 lg:flex lg:min-h-[650px] lg:flex-col lg:justify-between">

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
                  <ShoppingBag
                    size={28}
                    className="text-white"
                    strokeWidth={1.8}
                  />
                </div>

                <h1 className="text-4xl font-bold leading-tight text-white">
                  Welcome back to
                  <span className="block">
                    Rawaj Shop
                  </span>
                </h1>

                <p className="mt-5 text-[15px] leading-7 text-white/75">
                  Sign in to manage your orders, save your
                  favorite products, and enjoy a faster
                  shopping experience.
                </p>
              </div>
            </div>

            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-3 text-sm text-white/85">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                  <ShieldCheck size={18} />
                </div>

                <span>
                  Secure and trusted shopping experience
                </span>
              </div>

              <div className="flex items-center gap-3 text-sm text-white/85">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                  <ShoppingBag size={18} />
                </div>

                <span>
                  Track and manage your orders easily
                </span>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex min-h-[650px] items-center justify-center px-5 py-10 sm:px-10">
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
                  ACCOUNT LOGIN
                </p>

                <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                  Welcome back
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Enter your details below to access your account.
                </p>
              </div>

              {/* Login Form */}
              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-5"
              >

                {/* Error */}
                {error && (
                  <div className="rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                  </div>
                )}

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

                {/* Password */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      Password
                    </label>

                    <Link
                      href="/forgot-password"
                      className="text-xs font-semibold text-[#6044f0] transition hover:text-[#5035d8]"
                    >
                      Forgot Password?
                    </Link>
                  </div>

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
                      autoComplete="current-password"
                      placeholder="Enter your password"
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

                {/* Remember Me */}
                <div className="flex items-center justify-between">
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(event) =>
                        setRememberMe(
                          event.target.checked
                        )
                      }
                      className="h-4 w-4 rounded border-gray-300 accent-[#6044f0]"
                    />

                    <span className="text-xs text-gray-600">
                      Remember me
                    </span>
                  </label>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#6044f0] text-sm font-semibold text-white shadow-sm transition hover:bg-[#5035d8] hover:shadow-md active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? (
                    "Signing In..."
                  ) : (
                    <>
                      Sign In

                      <ArrowRight
                        size={18}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>
              </form>

              {/* Register Divider */}
              <div className="my-7 flex items-center gap-4">
                <div className="h-px flex-1 bg-gray-200" />

                <span className="text-xs text-gray-400">
                  New to Rawaj Shop?
                </span>

                <div className="h-px flex-1 bg-gray-200" />
              </div>

              {/* Register */}
              <Link
                href="/register"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-gray-200 text-sm font-semibold text-gray-700 transition hover:border-[#6044f0] hover:bg-[#f8f6ff] hover:text-[#6044f0]"
              >
                <UserRound
                  size={18}
                  strokeWidth={1.8}
                />

                Create New Account
              </Link>

              {/* Back */}
              <div className="mt-6 text-center">
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