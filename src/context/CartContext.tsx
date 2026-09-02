
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { Product } from "@/types/product";
import { CartItem } from "@/types/cart";
import { useAuth } from "@/context/AuthContext";

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(
  undefined
);

interface CartProviderProps {
  children: ReactNode;
}

const CART_STORAGE_PREFIX = "rawaj-shop-cart";

export function CartProvider({
  children,
}: CartProviderProps) {
  const { user, isLoading: authLoading } = useAuth();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // User-specific storage key
  const cartStorageKey = user
    ? `${CART_STORAGE_PREFIX}-${user.id}`
    : null;

  // Load cart whenever logged-in user changes
  useEffect(() => {
    if (authLoading) return;

    setIsLoaded(false);

    if (!cartStorageKey) {
      setCartItems([]);
      setIsLoaded(true);
      return;
    }

    try {
      const savedCart =
        localStorage.getItem(cartStorageKey);

      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error(
        "Failed to load cart:",
        error
      );
      setCartItems([]);
    } finally {
      setIsLoaded(true);
    }
  }, [authLoading, cartStorageKey]);

  // Save cart to user's own localStorage
  useEffect(() => {
    if (!isLoaded || !cartStorageKey) return;

    try {
      localStorage.setItem(
        cartStorageKey,
        JSON.stringify(cartItems)
      );
    } catch (error) {
      console.error(
        "Failed to save cart:",
        error
      );
    }
  }, [cartItems, isLoaded, cartStorageKey]);

  // Add product to cart
  const addToCart = (product: Product) => {
    if (!user) return;

    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...currentItems,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  // Remove product
  const removeFromCart = (productId: number) => {
    setCartItems((currentItems) =>
      currentItems.filter(
        (item) => item.id !== productId
      )
    );
  };

  // Update quantity
  const updateQuantity = (
    productId: number,
    quantity: number
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity,
            }
          : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Total number of products
  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Total price
  const cartTotal = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}

