
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { Product } from "@/types/product";
import { WishlistItem } from "@/types/wishlist";
import { useAuth } from "@/context/AuthContext";

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  wishlistCount: number;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: number) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<
  WishlistContextType | undefined
>(undefined);

interface WishlistProviderProps {
  children: ReactNode;
}

const WISHLIST_STORAGE_PREFIX =
  "rawaj-shop-wishlist";

export function WishlistProvider({
  children,
}: WishlistProviderProps) {
  const {
    user,
    isLoading: authLoading,
  } = useAuth();

  const [wishlistItems, setWishlistItems] =
    useState<WishlistItem[]>([]);

  const [isLoaded, setIsLoaded] =
    useState(false);

  // User-specific storage key
  const wishlistStorageKey = user
    ? `${WISHLIST_STORAGE_PREFIX}-${user.id}`
    : null;

  // Load wishlist whenever logged-in user changes
  useEffect(() => {
    if (authLoading) return;

    setIsLoaded(false);

    if (!wishlistStorageKey) {
      setWishlistItems([]);
      setIsLoaded(true);
      return;
    }

    try {
      const savedWishlist =
        localStorage.getItem(
          wishlistStorageKey
        );

      if (savedWishlist) {
        const parsedWishlist: WishlistItem[] =
          JSON.parse(savedWishlist);

        setWishlistItems(parsedWishlist);
      } else {
        setWishlistItems([]);
      }
    } catch (error) {
      console.error(
        "Failed to load wishlist:",
        error
      );
      setWishlistItems([]);
    } finally {
      setIsLoaded(true);
    }
  }, [authLoading, wishlistStorageKey]);

  // Save wishlist to user's own localStorage
  useEffect(() => {
    if (!isLoaded || !wishlistStorageKey) return;

    try {
      localStorage.setItem(
        wishlistStorageKey,
        JSON.stringify(wishlistItems)
      );
    } catch (error) {
      console.error(
        "Failed to save wishlist:",
        error
      );
    }
  }, [
    wishlistItems,
    isLoaded,
    wishlistStorageKey,
  ]);

  // Add product to wishlist
  const addToWishlist = (product: Product) => {
    if (!user) return;

    setWishlistItems((currentItems) => {
      const alreadyExists =
        currentItems.some(
          (item) => item.id === product.id
        );

      if (alreadyExists) {
        return currentItems;
      }

      return [
        ...currentItems,
        product,
      ];
    });
  };

  // Remove product from wishlist
  const removeFromWishlist = (
    productId: number
  ) => {
    setWishlistItems((currentItems) =>
      currentItems.filter(
        (item) => item.id !== productId
      )
    );
  };

  // Toggle wishlist
  const toggleWishlist = (
    product: Product
  ) => {
    if (!user) return;

    setWishlistItems((currentItems) => {
      const alreadyExists =
        currentItems.some(
          (item) => item.id === product.id
        );

      if (alreadyExists) {
        return currentItems.filter(
          (item) => item.id !== product.id
        );
      }

      return [
        ...currentItems,
        product,
      ];
    });
  };

  // Check if product is in wishlist
  const isInWishlist = (
    productId: number
  ) => {
    return wishlistItems.some(
      (item) => item.id === productId
    );
  };

  // Clear wishlist
  const clearWishlist = () => {
    setWishlistItems([]);
  };

  const wishlistCount =
    wishlistItems.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistCount,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context =
    useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist must be used inside WishlistProvider"
    );
  }

  return context;
}

