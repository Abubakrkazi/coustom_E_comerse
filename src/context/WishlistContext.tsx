
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

const WISHLIST_STORAGE_KEY = "rawaj-shop-wishlist";

export function WishlistProvider({
  children,
}: WishlistProviderProps) {
  const [wishlistItems, setWishlistItems] = useState<
    WishlistItem[]
  >([]);

  const [isLoaded, setIsLoaded] = useState(false);

  // Load wishlist from localStorage
  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem(
        WISHLIST_STORAGE_KEY
      );

      if (savedWishlist) {
        setWishlistItems(JSON.parse(savedWishlist));
      }
    } catch (error) {
      console.error("Failed to load wishlist:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save wishlist to localStorage
  useEffect(() => {
    if (!isLoaded) return;

    try {
      localStorage.setItem(
        WISHLIST_STORAGE_KEY,
        JSON.stringify(wishlistItems)
      );
    } catch (error) {
      console.error("Failed to save wishlist:", error);
    }
  }, [wishlistItems, isLoaded]);

  // Add product
  const addToWishlist = (product: Product) => {
    setWishlistItems((currentItems) => {
      const alreadyExists = currentItems.some(
        (item) => item.id === product.id
      );

      if (alreadyExists) {
        return currentItems;
      }

      return [...currentItems, product];
    });
  };

  // Remove product
  const removeFromWishlist = (productId: number) => {
    setWishlistItems((currentItems) =>
      currentItems.filter(
        (item) => item.id !== productId
      )
    );
  };

  // Toggle wishlist
  const toggleWishlist = (product: Product) => {
    setWishlistItems((currentItems) => {
      const alreadyExists = currentItems.some(
        (item) => item.id === product.id
      );

      if (alreadyExists) {
        return currentItems.filter(
          (item) => item.id !== product.id
        );
      }

      return [...currentItems, product];
    });
  };

  // Check wishlist
  const isInWishlist = (productId: number) => {
    return wishlistItems.some(
      (item) => item.id === productId
    );
  };

  // Clear wishlist
  const clearWishlist = () => {
    setWishlistItems([]);
  };

  const wishlistCount = wishlistItems.length;

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
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist must be used inside WishlistProvider"
    );
  }

  return context;
}

