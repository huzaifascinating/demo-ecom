import { useEffect, useMemo } from 'react';
import { FaChevronDown, FaChevronUp, FaTimes, FaArrowRight } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/price';

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
    clearCart,
    checkoutUrl,
    loading
  } = useCart();

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  useEffect(() => {
    if (!isCartOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isCartOpen, closeCart]);

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]);

  return (
    <>
      <div
        className={`fixed inset-0 z-60 backdrop-blur-[2px] bg-black/20 transition-opacity duration-300 ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={closeCart}
      />

      <aside
        className={`fixed right-0 top-0 z-70 h-full w-full max-w-[450px] bg-white transition-transform duration-500 ease-in-out sm:rounded-l-[30px] shadow-2xl flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header - Fixed */}
        <div className="flex items-center justify-between px-8 pt-7 pb-3 shrink-0 border-b border-gray-50">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveTab('cart')}
              className={`text-3xl font-medium cursor-pointer ${activeTab === 'cart' ? 'text-black' : 'text-gray-300'}`}
            >
              Cart <span className="bg-black text-white px-2 pb-0.5 text-xl rounded-full">{cartCount}</span>
            </button>
          </div>
          <button onClick={closeCart} className="p-2 border rounded-full hover:bg-gray-50 cursor-pointer">
            <FaTimes className="text-gray-600" />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto custom-scrollbar relative">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-20 text-center">
              <h2 className="text-3xl font-medium text-gray-900 mb-6">Your cart is currently empty</h2>
              <button
                onClick={closeCart}
                className="group flex items-center justify-center gap-3 px-8 py-4 bg-white border text-black rounded-full font-medium 
                hover:bg-linear-to-r hover:from-pink-500 hover:to-purple-600
                hover:shadow-[0_10px_20px_-10px_rgba(236,72,153,0.5)] 
                hover:scale-[1.01] hover:text-white
                ease-in-out active:scale-95 cursor-pointer"
              >
                Continue shopping
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ) : (
            <div className="px-8 py-6">
              {loading && (
                <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center backdrop-blur-[1px]">
                  <div className="w-8 h-8 border-2 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}

              {/* Shipping Bar */}
              <div className="mb-6">
                <div className="h-[4px] w-full bg-gray-100 rounded-full">
                  <div className="h-full bg-linear-to-r from-pink-500 to-purple-500 rounded-full" style={{ width: '100%' }} />
                </div>
              </div>

              {/* Cart Items */}
              <div className="space-y-7">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-24 h-28 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <h3
                          className="text-[15px] tracking-normal font-medium text-gray-900 line-clamp-2 leading-tight cursor-default"
                          title={item.displayTitle || item.title}
                        >
                          {item.displayTitle || item.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-2">
                          <p className={`text-[18px] font-semibold tracking-wide ${item.originalPrice ? 'text-pink-600' : 'text-gray-500'}`}>
                            ${formatPrice(item.price)}
                          </p>
                          {item.originalPrice && item.originalPrice > item.price && (
                            <p className="text-[14px] text-gray-400 line-through">
                              ${formatPrice(item.originalPrice)}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end justify-between py-1">
                      <div className="flex items-center border border-gray-100 rounded-lg bg-gray-50 px-3 py-2 gap-4">
                        <span className="text-sm font-bold">{item.quantity}</span>
                        <div className="flex flex-col text-[10px] text-gray-400">
                          <button className="cursor-pointer hover:text-pink-500" onClick={() => setQuantity(item.id, item.quantity + 1)} disabled={loading}><FaChevronUp /></button>
                          <button className="cursor-pointer hover:text-pink-500" onClick={() => setQuantity(item.id, Math.max(1, item.quantity - 1))} disabled={loading}><FaChevronDown /></button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        disabled={loading}
                        className="text-xs text-gray-400 cursor-pointer hover:text-red-500 hover:underline disabled:opacity-50 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer - Fixed */}
        {items.length > 0 && (
          <div className="shrink-0 border-t border-gray-100 bg-white px-8 pt-1 pb-3 ">
            <div className="py-5 flex justify-between items-start">
              <p className="text-xs text-gray-400 max-w-[200px] leading-relaxed">
                Taxes included and shipping calculated at checkout.
              </p>
              <div className="text-right">
                <p className="text-xs text-gray-500 font-medium">Subtotal</p>
                <p className="text-2xl font-bold text-black">${formatPrice(subtotal)}</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href={checkoutUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  setTimeout(() => {
                    clearCart();
                  }, 1000);
                }}
                className={`w-full text-white py-2 rounded-full font-semibold flex items-center justify-center gap-3 cursor-pointer 
                bg-linear-to-r from-pink-500 to-purple-600 
                hover:from-pink-600 hover:to-purple-700 
                  hover:shadow-[0_10px_20px_-10px_rgba(236,72,153,0.5)] 
                  hover:scale-[1.01] text-lg
                transition-all duration-300 ease-in-out active:scale-95 ${!checkoutUrl ? 'pointer-events-none opacity-50' : ''}`}
              >
                Check out<FaArrowRight className="text-xl" />
              </a>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}