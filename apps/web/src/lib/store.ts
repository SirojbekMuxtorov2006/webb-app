import { create } from 'zustand';

export interface CartItemState {
  productId: string;
  variantId?: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  sellerName?: string;
}

interface MarketplaceStore {
  language: 'uz' | 'ru' | 'en';
  setLanguage: (lang: 'uz' | 'ru' | 'en') => void;
  cart: CartItemState[];
  addToCart: (item: Omit<CartItemState, 'quantity'> & { quantity?: number }) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isAiOpen: boolean;
  setAiOpen: (open: boolean) => void;
  appliedCoupon: string | null;
  setAppliedCoupon: (code: string | null) => void;
}

export const useMarketplaceStore = create<MarketplaceStore>((set) => ({
  language: 'uz',
  setLanguage: (language) => set({ language }),
  cart: [
    {
      productId: 'prod-lenovo-1',
      title: 'Lenovo IdeaPad 3 15IAU7 Core i3 / 8GB / 256GB SSD',
      price: 4499000,
      image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800',
      quantity: 1,
      sellerName: 'Texnomart Premium',
    },
  ],
  addToCart: (item) =>
    set((state) => {
      const existing = state.cart.find((i) => i.productId === item.productId);
      if (existing) {
        return {
          cart: state.cart.map((i) =>
            i.productId === item.productId
              ? { ...i, quantity: i.quantity + (item.quantity || 1) }
              : i
          ),
        };
      }
      return {
        cart: [...state.cart, { ...item, quantity: item.quantity || 1 }],
      };
    }),
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((i) => i.productId !== productId),
    })),
  updateQuantity: (productId, quantity) =>
    set((state) => ({
      cart: quantity > 0
        ? state.cart.map((i) => (i.productId === productId ? { ...i, quantity } : i))
        : state.cart.filter((i) => i.productId !== productId),
    })),
  clearCart: () => set({ cart: [] }),
  isAiOpen: false,
  setAiOpen: (isAiOpen) => set({ isAiOpen }),
  appliedCoupon: null,
  setAppliedCoupon: (appliedCoupon) => set({ appliedCoupon }),
}));
