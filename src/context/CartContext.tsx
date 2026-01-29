import React, { createContext, useContext, useMemo, useState } from 'react';
import { PRODUCTS } from '../data/Mockdata';

export type CartItem = {
  productId: string;
  quantity: number;
};

type CartContextValue = {
  isCartOpen: boolean;
  openCart: (opts?: { activeTab?: 'cart' | 'recent' }) => void;
  closeCart: () => void;
  toggleCart: () => void;

  activeTab: 'cart' | 'recent';
  setActiveTab: (tab: 'cart' | 'recent') => void;

  items: CartItem[];
  cartCount: number;
  addItem: (productId: string, qty?: number) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, qty: number) => void;
  clearCart: () => void;

  recentlyViewed: string[];
  trackRecentlyViewed: (productId: string) => void;
  lastTouchedProductId?: string;
};

const CartContext = createContext<CartContextValue | null>(null);

const MAX_RECENT = 8;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'cart' | 'recent'>('cart');
  const [items, setItems] = useState<CartItem[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [lastTouchedProductId, setLastTouchedProductId] = useState<string | undefined>(undefined);

  const cartCount = useMemo(
    () => items.reduce((sum, it) => sum + it.quantity, 0),
    [items]
  );

  const openCart = (opts?: { activeTab?: 'cart' | 'recent' }) => {
    if (opts?.activeTab) setActiveTab(opts.activeTab);
    setIsCartOpen(true);
  };
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((v) => !v);

  const addItem = (productId: string, qty = 1) => {
    setLastTouchedProductId(productId);
    setItems((prev) => {
      const existing = prev.find((p) => p.productId === productId);
      if (existing) {
        return prev.map((p) =>
          p.productId === productId ? { ...p, quantity: p.quantity + qty } : p
        );
      }
      return [...prev, { productId, quantity: qty }];
    });
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((p) => p.productId !== productId));
  };

  const setQuantity = (productId: string, qty: number) => {
    const safeQty = Math.max(1, Math.min(99, Math.floor(qty)));
    setItems((prev) =>
      prev.map((p) => (p.productId === productId ? { ...p, quantity: safeQty } : p))
    );
  };

  const clearCart = () => setItems([]);

  const trackRecentlyViewed = (productId: string) => {
    setLastTouchedProductId(productId);
    setRecentlyViewed((prev) => {
      const next = [productId, ...prev.filter((id) => id !== productId)];
      return next.slice(0, MAX_RECENT);
    });
  };

  // tiny guard: if mockdata changes, avoid invalid ids lingering
  const knownIds = useMemo(() => new Set(PRODUCTS.map((p) => p.id)), []);
  const value: CartContextValue = useMemo(
    () => ({
      isCartOpen,
      openCart,
      closeCart,
      toggleCart,
      activeTab,
      setActiveTab,
      items: items.filter((it) => knownIds.has(it.productId)),
      cartCount,
      addItem,
      removeItem,
      setQuantity,
      clearCart,
      recentlyViewed: recentlyViewed.filter((id) => knownIds.has(id)),
      trackRecentlyViewed,
      lastTouchedProductId,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isCartOpen, activeTab, items, cartCount, recentlyViewed, lastTouchedProductId]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}


