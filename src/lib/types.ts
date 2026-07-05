export type Category =
  | "Kemeja"
  | "Selendang"
  | "Kain Lembaran"
  | "Aksesori"
  | "Outer";

export const CATEGORIES: Category[] = [
  "Kemeja",
  "Selendang",
  "Kain Lembaran",
  "Aksesori",
  "Outer",
];

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number | null; // rupiah; null = "Hubungi"
  imageUrl: string;
  category: Category;
  isFeatured: boolean;
  createdAt: string; // ISO
}

export type ProductInput = Omit<Product, "id" | "createdAt">;
