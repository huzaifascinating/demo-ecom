import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import {
  createShopifyCart,
  getShopifyCart,
  addToShopifyCart,
  removeFromShopifyCart,
  updateShopifyCartQuantity,
  fetchShopifyProductById
} from '../utils/shopify';

export type CartItem = {
  id: string; // This will be the Shopify Line Item ID
  productId: string; // Original product ID
  variantId: string;
  quantity: number;
  title: string;
  price: number;
  image: string;
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
  addItem: (product: any, qty?: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  setQuantity: (lineId: string, qty: number) => Promise<void>;
  clearCart: () => void;
  checkoutUrl: string | null;

  recentlyViewed: string[];
  trackRecentlyViewed: (productId: string) => void;
  lastTouchedProductId?: string;
  loading: boolean;
};

const CartContext = createContext<CartContextValue | null>(null);

const MAX_RECENT = 8;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'cart' | 'recent'>('cart');
  const [cartId, setCartId] = useState<string | null>(localStorage.getItem('shopify_cart_id'));
  const [cartData, setCartData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [lastTouchedProductId, setLastTouchedProductId] = useState<string | undefined>(undefined);

  // Sync cart with Shopify on mount or when cartId changes
  useEffect(() => {
    const syncCart = async () => {
      if (cartId) {
        try {
          const cart = await getShopifyCart(cartId);
          if (cart) {
            setCartData(cart);
          } else {
            // Cart might have expired
            localStorage.removeItem('shopify_cart_id');
            setCartId(null);
          }
        } catch (error) {
          console.error('Error syncing cart:', error);
        }
      }
    };
    syncCart();
  }, [cartId]);

  const items = useMemo(() => {
    if (!cartData?.lines?.edges) return [];
    return cartData.lines.edges.map(({ node }: any) => ({
      id: node.id,
      productId: node.merchandise.product.id.split('/').pop(),
      variantId: node.merchandise.id,
      quantity: node.quantity,
      title: node.merchandise.product.title,
      price: parseFloat(node.merchandise.price.amount),
      image: node.merchandise.image?.url || '',
    }));
  }, [cartData]);

  const cartCount = useMemo(() => cartData?.totalQuantity || 0, [cartData]);
  const checkoutUrl = useMemo(() => cartData?.checkoutUrl || null, [cartData]);

  const openCart = (opts?: { activeTab?: 'cart' | 'recent' }) => {
    if (opts?.activeTab) setActiveTab(opts.activeTab);
    setIsCartOpen(true);
  };
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((v) => !v);

  const addItem = async (product: any, qty = 1) => {
    setLoading(true);
    setLastTouchedProductId(product.id);
    try {
      let updatedCart;
      // If product passed doesn't have variantId, try to fetch it
      const variantId = product.variantId || (await fetchShopifyProductById(product.id))?.variantId;

      if (!variantId) {
        console.error('No variant ID found for product:', product.id);
        return;
      }

      if (!cartId) {
        updatedCart = await createShopifyCart(variantId, qty);
        setCartId(updatedCart.id);
        localStorage.setItem('shopify_cart_id', updatedCart.id);
      } else {
        updatedCart = await addToShopifyCart(cartId, variantId, qty);
      }
      setCartData(updatedCart);
      openCart({ activeTab: 'cart' });
    } catch (error) {
      console.error('Error adding item:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (lineId: string) => {
    if (!cartId) return;
    setLoading(true);
    try {
      const updatedCart = await removeFromShopifyCart(cartId, [lineId]);
      setCartData(updatedCart);
    } catch (error) {
      console.error('Error removing item:', error);
    } finally {
      setLoading(false);
    }
  };

  const setQuantity = async (lineId: string, qty: number) => {
    if (!cartId) return;
    const safeQty = Math.max(1, Math.min(99, Math.floor(qty)));
    setLoading(true);
    try {
      const updatedCart = await updateShopifyCartQuantity(cartId, lineId, safeQty);
      setCartData(updatedCart);
    } catch (error) {
      console.error('Error updating quantity:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearCart = () => {
    setCartData(null);
    setCartId(null);
    localStorage.removeItem('shopify_cart_id');
  };

  const trackRecentlyViewed = (productId: string) => {
    setLastTouchedProductId(productId);
    setRecentlyViewed((prev) => {
      const next = [productId, ...prev.filter((id) => id !== productId)];
      return next.slice(0, MAX_RECENT);
    });
  };

  const value: CartContextValue = useMemo(
    () => ({
      isCartOpen,
      openCart,
      closeCart,
      toggleCart,
      activeTab,
      setActiveTab,
      items,
      cartCount,
      addItem,
      removeItem,
      setQuantity,
      clearCart,
      checkoutUrl,
      recentlyViewed,
      trackRecentlyViewed,
      lastTouchedProductId,
      loading
    }),
    [isCartOpen, activeTab, items, cartCount, recentlyViewed, lastTouchedProductId, checkoutUrl, loading]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}


