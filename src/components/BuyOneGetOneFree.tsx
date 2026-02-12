import { FaTag, FaStar } from 'react-icons/fa';

const BuyOneGetOneFree = () => {
    return (
        <div className="bg-white border-b border-gray-300 py-1.5 relative overflow-hidden z-40">
            {/* Animated Shimmer Effect */}
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] animate-shimmer pointer-events-none" />

            {/* Content Content */}
            <div className="max-w-7xl mx-auto px-4 flex justify-center items-center gap-1 sm:gap-4 text-xs md:text-sm font-bold tracking-wide relative z-10">

                {/* Badge */}
                <span className="hidden sm:flex items-center gap-1 bg-pink-600 text-white px-2 py-0.5 rounded-[4px] text-[10px] animate-pulse shadow-[0_0_10px_rgba(236,72,153,0.5)]">
                    <FaStar className="text-yellow-300" /> Special
                </span>

                {/* Main Text */}
                <div className="flex items-center gap-2 sm:gap-3 group cursor-default">

                    <div className="flex items-center gap-2 px-3 py-1 border-stone-700/50">
                        <span className="text-black text-xs md:text-sm">
                            Buy 2 Get 1 FREE Today
                        </span>
                    </div>
                </div>
                <FaTag className="sm:hidden text-pink-500 text-xs ml-1" />
            </div>

            <style>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%) skewX(-12deg); }
                    20% { transform: translateX(200%) skewX(-12deg); }
                    100% { transform: translateX(200%) skewX(-12deg); }
                }
                .animate-shimmer {
                    animation: shimmer 4s infinite cubic-bezier(0.4, 0, 0.2, 1);
                }
                @keyframes gradient-text {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .animate-gradient-text {
                    animation: gradient-text 3s linear infinite;
                }
            `}</style>
        </div>
    );
}

export default BuyOneGetOneFree;