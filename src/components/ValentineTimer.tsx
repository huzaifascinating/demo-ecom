import { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';

const ValentineTimer = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const targetDate = new Date('2026-02-14T00:00:00');

        const calculateTimeLeft = () => {
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative w-full overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-50 via-rose-400 to-pink-500 animate-gradient-x opacity-90"></div>

            {/* Sparkle/Heart Overlay */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(6)].map((_, i) => (
                    <FaHeart
                        key={i}
                        className={`absolute text-white/20 animate-float-heart`}
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            fontSize: `${Math.random() * 20 + 10}px`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${Math.random() * 10 + 5}s`
                        }}
                    />
                ))}
            </div>

            <div className="relative max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
                <div className="flex items-center gap-2">
                    <FaHeart className="text-white animate-pulse" />
                    <span className="text-white font-black uppercase tracking-tighter text-sm md:text-base italic">
                        Valentine's Sale <span className="text-pink-100 underline decoration-white/40">Ends Soon</span>
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                        <TimeUnit value={timeLeft.days} label="DAYS" />
                        <span className="text-white font-bold animate-pulse">:</span>
                        <TimeUnit value={timeLeft.hours} label="HRS" />
                        <span className="text-white font-bold animate-pulse">:</span>
                        <TimeUnit value={timeLeft.minutes} label="MIN" />
                        <span className="text-white font-bold animate-pulse">:</span>
                        <TimeUnit value={timeLeft.seconds} label="SEC" />
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 5s ease infinite;
        }
        @keyframes float-heart {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          50% { opacity: 0.3; }
          100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
        }
        .animate-float-heart {
          animation: float-heart linear infinite;
        }
      `}</style>
        </div>
    );
};

const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
        <div className="bg-white w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center shadow-inner">
            <span className="text-pink-600 font-black text-lg md:text-xl tabular-nums">
                {value.toString().padStart(2, '0')}
            </span>
        </div>
        <span className="text-[8px] md:text-[9px] font-bold text-white mt-1 tracking-widest leading-none bg-pink-600/30 px-1 rounded uppercase">
            {label}
        </span>
    </div>
);

export default ValentineTimer;
