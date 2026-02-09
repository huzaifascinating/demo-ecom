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

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="relative w-full overflow-hidden transition-all duration-300 ease-in-out">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-50 via-rose-400 to-pink-500 animate-gradient-x"></div>

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

            <div className={`relative max-w-7xl mx-auto px-4 ${isScrolled ? 'py-2' : 'py-3'} flex items-center justify-center transition-all duration-300`}>
                {!isScrolled ? (
                    // Simple Banner State (Top of Page)
                    <div className="text-center animate-fade-in">
                        <span className="text-white font-semibold uppercase tracking-wide text-sm md:text-md drop-shadow-sm">
                            Valentine's Sale - Ends Soon
                        </span>
                    </div>
                ) : (
                    // Timer State (Scrolled)
                    <div className="flex flex-row items-center justify-center gap-4 md:gap-6 animate-fade-in">
                        <div className="md:flex flex flex-col items-center gap-1 pr-2">
                            <span className="text-white uppercase tracking-wider text-[16px] shadow-sm">
                                Valentine's Day Sale
                            </span>
                            <span className="text-white uppercase tracking-wider text-[14px] shadow-sm">
                                UP TO 70% OFF
                            </span>
                        </div>

                        {/* White Pill Timer Container */}
                        <div className="bg-white rounded-[15px] px-4 py-2 flex items-center gap-1 md:gap-2 shadow-md">
                            <TimeUnit value={timeLeft.hours + (timeLeft.days * 24)} label="HRS" />
                            <span className="text-black text-sm self-start mt-1">:</span>
                            <TimeUnit value={timeLeft.minutes} label="MIN" />
                            <span className="text-black text-sm self-start mt-1">:</span>
                            <TimeUnit value={timeLeft.seconds} label="SEC" />
                        </div>
                    </div>
                )}
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
        @keyframes fade-in {
            from { opacity: 0; transform: translateY(-5px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
        </div>
    );
};

const TimeUnit = ({ value, label }: any) => (
    <div className="flex flex-col items-center">
        {/* Number - Dark Blue/Black like the image */}
        <span className="text-[#003366] font-sans text-xl md:text-xl tracking-tighter leading-none">
            {value.toString().padStart(2, '0')}
        </span>
        {/* Label - Smaller and directly underneath */}
        <span className="text-black font-medium text-[10px] md:text-[11px] mt-0.5 tracking-wider">
            {label}
        </span>
    </div>
);

export default ValentineTimer;
