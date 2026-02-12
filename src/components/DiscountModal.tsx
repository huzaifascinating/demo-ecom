import { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { FaTimes, FaPercentage, FaCheck } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

export default function DiscountModal() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is on home page and has not seen offer
    const hasSeenOffer = sessionStorage.getItem('hasSeenOffer');
    if (location.pathname === '/' && !hasSeenOffer) {
      // Small delay for better UX
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('hasSeenOffer', 'true');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  const handleClaimNow = () => {
    setIsOpen(false);
    navigate('/shop');
  };

  return (
    <>
      {/* Floating Button - Only show on home page */}
      {location.pathname === '/' && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed z-50 bottom-6 
               /* Mobile: Center position */
               left-1/2 -translate-x-1/2 
               /* Desktop: Reset left and move to right */
               lg:left-auto lg:translate-x-0 lg:right-20 
               flex items-center gap-2 bg-pink-500 text-white px-6 py-3 rounded-full font-bold shadow-2xl hover:bg-pink-600 transition-all hover:scale-105 active:scale-95 group cursor-pointer whitespace-nowrap"
        >
          <div className="bg-white/20 p-2 rounded-full">
            <FaPercentage className="text-sm" />
          </div>
          <span>Get 70% Off</span>

          {/* Pulse effect */}
          <span className="absolute inset-0 rounded-full bg-pink-500 animate-ping opacity-20 pointer-events-none"></span>
        </button>
      )}

      {/* Modal */}
      <Modal
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        closeIcon={false}
        footer={null}
        centered
        width={390}
        rootClassName="discount-modal-root"
        styles={{
          mask: { backdropFilter: 'blur(4px)' },
          content: { padding: 0, backgroundColor: 'transparent', boxShadow: 'none' },
          body: { padding: 0 }
        } as any}

      >
        <div className="relative w-full overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-b from-pink-200 via-pink-100 to-pink-300">

          {/* Close Button */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute right-4 top-4 z-20 text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
          >
            <FaTimes className="h-5 w-5" />
          </button>

          <div className="flex flex-col items-center pt-12 pb-10 px-6 text-center">

            {/* Brand Header */}
            <div className="mb-10">
              <h1 className="font-serif text-3xl font-medium tracking-wide text-[#3E2723]">LORENA</h1>
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#5D4037] mt-1 font-semibold">Skincare</p>
            </div>

            {/* Benefit Bullets */}
            <div className="w-full px-6 mb-8 space-y-3">
              {['De-puff & smooth', 'Brighten & refresh', 'Hydrate & firm'].map((text, i) => (
                <div key={i} className="bg-white/40 backdrop-blur-md border border-white/60 rounded-xl p-3 flex items-center gap-4 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 group/item">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-[#8D6E63] to-[#4E342E] shadow-md shrink-0 group-hover/item:scale-110 transition-transform">
                    <FaCheck className="text-pink-50 text-sm" />
                  </div>
                  <span className="text-lg font-bold text-[#3E2723] tracking-wide group-hover/item:text-pink-900 transition-colors">{text}</span>
                </div>
              ))}
            </div>

            {/* Offer Text */}
            <div className="mb-8">
              <p className="text-xl text-gray-800 mb-1 font-medium">You've got</p>
              <h2 className="text-6xl font-black text-black leading-none tracking-tight">
                70% OFF
              </h2>
            </div>

            {/* Claim Button - Ribbon Style Attempt */}
            <button
              onClick={handleClaimNow}
              className="relative bg-[#FF69B4] text-white text-xl font-bold py-3 px-12 shadow-lg hover:shadow-xl hover:bg-[#ff5cae] transition-all transform hover:-translate-y-0.5"
              style={{
                clipPath: 'polygon(0% 0%, 100% 0%, 95% 50%, 100% 100%, 0% 100%, 5% 50%)'
              }}
            >
              Claim now
            </button>

          </div>
        </div>
      </Modal>
    </>
  );
}
