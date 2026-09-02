
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
} from "lucide-react";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const normalizedEmail =
      email.trim().toLowerCase();

    if (!normalizedEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (newPassword.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const savedUsers =
        localStorage.getItem(
          "rawaj-shop-users"
        );

      const users: Array<{
        id: string;
        name: string;
        email: string;
        phone?: string;
        password: string;
      }> = savedUsers
        ? JSON.parse(savedUsers)
        : [];

      const userIndex = users.findIndex(
        (user) =>
          user.email.toLowerCase() ===
          normalizedEmail
      );

      if (userIndex === -1) {
        setError(
          "No account found with this email address."
        );
        return;
      }

      users[userIndex] = {
        ...users[userIndex],
        password: newPassword,
      };

      localStorage.setItem(
        "rawaj-shop-users",
        JSON.stringify(users)
      );

      setSuccess(
        "Your password has been updated successfully."
      );

      setEmail("");
      setNewPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (error) {
      console.error(
        "Password reset failed:",
        error
      );

      setError(
        "Something went wrong. Please try again."
      );
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-md">
        <Link
          href="/login"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#6044f0]"
        >
          <ArrowLeft size={17} />
          Back to Login
        </Link>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-7 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f1efff]">
              <LockKeyhole
                size={26}
                className="text-[#6044f0]"
              />
            </div>

            <h1 className="mt-5 text-2xl font-bold text-gray-900">
              Reset Password
            </h1>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Enter your registered email and choose
              a new password.
            </p>
          </div>

          {error && (
            <div className="mb-5 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-5 flex items-start gap-3 rounded-lg border border-green-100 bg-green-50 px-4 py-3 text-sm text-green-700">
              <CheckCircle2
                size={18}
                className="mt-0.5 shrink-0"
              />
              <span>{success}</span>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
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
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="Enter your email"
                  required
                  className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#6044f0] focus:ring-2 focus:ring-[#6044f0]/10"
                />
              </div>
            </div>

            {/* New Password */}
            <div>
              <label
                htmlFor="newPassword"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                New Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="newPassword"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={newPassword}
                  onChange={(e) =>
                    setNewPassword(
                      e.target.value
                    )
                  }
                  placeholder="Enter new password"
                  required
                  minLength={6}
                  className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-11 text-sm outline-none transition focus:border-[#6044f0] focus:ring-2 focus:ring-[#6044f0]/10"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-700"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              <p className="mt-2 text-xs text-gray-400">
                Password must contain at least 6
                characters.
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Confirm New Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="confirmPassword"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                  placeholder="Confirm new password"
                  required
                  minLength={6}
                  className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-11 text-sm outline-none transition focus:border-[#6044f0] focus:ring-2 focus:ring-[#6044f0]/10"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-700"
                  aria-label={
                    showConfirmPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-[#6044f0] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#5035d8] active:scale-[0.99]"
            >
              Reset Password
            </button>
          </form>

          <div className="mt-6 border-t border-gray-100 pt-5 text-center">
            <p className="text-sm text-gray-500">
              Remember your password?{" "}
              <Link
                href="/login"
                className="font-semibold text-[#6044f0] hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

