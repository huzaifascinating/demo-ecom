import { useEffect, useMemo } from 'react';
import { FaChevronDown, FaChevronUp, FaLock, FaTimes } from 'react-icons/fa';
import { PRODUCTS } from '../data/Mockdata';
import { useCart } from '../context/CartContext';

function formatPKR(amount: number) {
  return `Rs.${amount.toLocaleString('en-PK', { minimumFractionDigits: 2 })}.00`;
}

export default function CartDrawer() {
  const {
    isCartOpen,
    closeCart,
    activeTab,
    setActiveTab,
    items,
    cartCount,
    removeItem,
    setQuantity,
  } = useCart();

  useEffect(() => {
    if (!isCartOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isCartOpen, closeCart]);

  const cartLines = useMemo(() => {
    return items
      .map((it) => {
        const p = PRODUCTS.find((x) => x.id === it.productId);
        if (!p) return null;
        return { product: p, quantity: it.quantity };
      })
      .filter(Boolean) as Array<{ product: (typeof PRODUCTS)[number]; quantity: number }>;
  }, [items]);

  const subtotal = useMemo(() => {
    return cartLines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  }, [cartLines]);

  const freeShipThreshold = 5000; // Adjusted for PKR context
  const shipProgress = Math.min(100, Math.round((subtotal / freeShipThreshold) * 100));

  return (
    <>
      <div
        className={`fixed inset-0 z-60 bg-black/20 transition-opacity duration-300 ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={closeCart}
      />

      <aside
        className={`fixed right-0 top-0 z-70 h-full w-full max-w-[550px] bg-white transition-transform duration-500 ease-in-out rounded-l-[30px] shadow-2xl ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-8">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveTab('cart')}
              className={`text-3xl font-medium ${activeTab === 'cart' ? 'text-black' : 'text-gray-300'}`}
            >
              Cart <sup className="text-sm -top-4">{cartCount}</sup>
            </button>
          </div>
          <button onClick={closeCart} className="p-3 border rounded-full hover:bg-gray-50 cursor-pointer">
            <FaTimes className="text-gray-600" />
          </button>
        </div>

        <div className="h-[calc(100vh-100px)] overflow-y-auto px-8 pb-10 custom-scrollbar">
          {/* Shipping Bar */}
          <div className="mb-8">
            <div className="h-[6px] w-full bg-gray-100 rounded-full">
              <div className="h-full bg-linear-to-r from-pink-500 to-purple-500 rounded-full" style={{ width: '100%' }} />
            </div>
          </div>

          {/* Cart Items */}
          <div className="space-y-8">
            {cartLines.map(({ product, quantity }) => (
              <div key={product.id} className="flex gap-4">
                <div className="w-24 h-32 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h3 className="font-medium text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-500">Medium</p>
                    <p className="text-sm text-gray-500">White</p>
                    <p className="mt-1 font-medium">{formatPKR(product.price)}</p>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between py-1">
                  <div className="flex items-center border border-gray-100 rounded bg-gray-50/50 px-3 py-2 gap-4">
                    <span className="text-sm font-medium">{quantity}</span>
                    <div className="flex flex-col text-[10px] text-gray-400">
                      <button className="cursor-pointer" onClick={() => setQuantity(product.id, quantity + 1)}><FaChevronUp /></button>
                      <button className="cursor-pointer" onClick={() => setQuantity(product.id, Math.max(1, quantity - 1))}><FaChevronDown /></button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(product.id)}
                    className="text-xs text-gray-500 underline underline-offset-4 cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Actions */}
          <div className="mt-12 border-t pt-2">

            <div className="py-6 flex justify-between items-start">
              <p className="text-xs text-gray-500 max-w-[200px]">
                Taxes included and shipping calculated at checkout.
              </p>
              <div className="text-right">
                <p className="text-sm text-gray-500 mb-1">Subtotal</p>
                <p className="text-2xl font-bold">{formatPKR(subtotal)} PKR</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {/* <button className="w-full bg-black text-white py-5 rounded-full font-bold flex items-center justify-center gap-3 hover:bg-zinc-800 cursor-pointer bg-linear-to-r from-pink-500 to-purple-500">
                <FaLock className="text-xs" /> Check out
              </button> */}
              <button className="w-full text-white py-5 rounded-full font-bold flex items-center justify-center gap-3 cursor-pointer 
              bg-linear-to-r from-pink-500 to-purple-600 
              hover:from-pink-600 hover:to-purple-700 
              hover:shadow-[0_10px_20px_-10px_rgba(236,72,153,0.5)] 
              hover:scale-[1.01] 
              transition-all duration-300 ease-in-out active:scale-95">
                <FaLock className="text-xs" /> Check out
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}