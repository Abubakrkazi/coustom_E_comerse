export type ProductCategory =
  | "wholesale"
  | "kitchen"
  | "gadgets"
  | "just-for-you"
  | "baby-item"
  | "electronics"
  | "trending"
  | "shaving"
  | "perfume";

export interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: ProductCategory;
  rating: number;
  reviews: number;
  stock: number;
  badge?: string;
  description?: string;
}