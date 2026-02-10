import { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { FaTimes, FaPercentage } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import girlImage from '../assets/girlImage.png';

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
      {/* Floating Button */}

      {/* <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-20 z-50 flex items-center gap-2 bg-pink-500 text-white px-6 py-3 rounded-full font-bold shadow-2xl hover:bg-pink-600 transition-all hover:scale-105 active:scale-95 group cursor-pointer"
      >
        <div className="bg-white/20 p-2 rounded-full">
          <FaPercentage className="text-sm" />
        </div>
        <span>Get 70% Off</span>
        <span className="absolute inset-0 rounded-full bg-pink-500 animate-ping opacity-20 pointer-events-none"></span>
      </button> */}
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

      {/* Modal */}
      <Modal
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        closeIcon={false}
        footer={false}
        centered
        width={390}
        styles={{ body: { padding: 0 } }}
      >
        <div className="relative w-full max-w-[390px] h-[500px] rounded-2xl bg-white shadow-2xl overflow-hidden group">
          {/* Full Background Image */}
          <div className="absolute inset-0">
            <img
              src={girlImage}
              alt="Beauty Routine"
              className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110"
            />
          </div>

          {/* Gradients */}
          <div className="absolute inset-0 bg-linear-to-br from-transparent via-pink-500/20 to-pink-900/90 mix-blend-multiply" />
          <div className="absolute inset-0 bg-linear-to-t from-pink-950/90 via-pink-900/40 to-transparent" />

          {/* Close Button */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute right-5 top-5 z-20 p-2.5 rounded-full bg-white/20 text-white hover:bg-white hover:text-pink-600 backdrop-blur-md transition-all border border-white/20 cursor-pointer"
          >
            <FaTimes className="h-4 w-4" />
          </button>

          {/* Content Area */}
          <div className="absolute bottom-0 inset-x-0 p-8 flex flex-col justify-end h-full z-10 text-white">
            {/* Top Badge */}
            <div className="self-start mb-auto ">
              <span className="inline-block px-3 py-1 rounded-full bg-pink-500/80 backdrop-blur-md text-[10px] font-semibold shadow-lg border border-pink-400/50">
                Secret Sale Unlocked
              </span>
            </div>

            {/* Big Offer Text */}
            <div className="mb-3 space-y-0.5">
              <p className="text-pink-200 text-xs tracking-wide">Congratulations! You've earned</p>
              <h2 className="text-6xl md:text-7xl font-black tracking-tighter leading-[0.9] drop-shadow-lg">
                70% <span className="text-pink-300 font-serif italic font-light">OFF</span>
              </h2>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-1 text-center hover:bg-white/20 transition-colors cursor-default">
                <p className="text-[10px] font-semibold italic uppercase tracking-wide leading-tight">Instant Lift</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-1 text-center hover:bg-white/20 transition-colors cursor-default">
                <p className="text-[10px] font-semibold italic uppercase tracking-wide leading-tight">Deep Hydration</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-1 text-center hover:bg-white/20 transition-colors cursor-default">
                <p className="text-[10px] font-semibold italic uppercase tracking-wide leading-tight">Fast Results</p>
              </div>
            </div>

            <button
              onClick={handleClaimNow}
              className="mt-6 w-full py-4 bg-white text-pink-600 rounded-full font-black uppercase tracking-widest hover:bg-pink-50 transition-colors shadow-xl"
            >
              Claim Now
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
