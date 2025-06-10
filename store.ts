import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/sanity.types";

export interface BasketItem {
  product: Product;
  quantity: number;
}

interface BasketState {
  items: BasketItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearBasket: () => void;
  getTotalPrice: () => number;
  getItemCount: (productId: string) => number;
  getGroupedItems: () => BasketItem[];
}

export const useBasketStore = create<BasketState>()(
  persist(
    (set, get) => ({
      items: [],
      // add item
      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product._id === product._id
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product._id === product._id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              )
            };
          }

          return { items: [...state.items, { product, quantity: 1 }] };
        }),
      // remove item
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.reduce((acc, item) => {
            if (item.product._id === productId) {
              if (item.quantity === 1) {
                return acc;
              }
              return [...acc, { ...item, quantity: item.quantity - 1 }];
            }
            return [...acc, item];
          }, [] as BasketItem[])
        })),
      // clear basket
      clearBasket: () => set({ items: [] }),
      // getTotalPrice,
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + (item.product.price ?? 0) * item.quantity,
          0
        );
      },
      // getItemCount,
      getItemCount: (productId) => {
        const item = get().items.find((item) => item.product._id === productId);
        return item ? item.quantity : 0;
      },
      // getGroupedItems
      getGroupedItems: () => get().items
    }),
    {
      name: "basket-storage"
    }
  )
);
