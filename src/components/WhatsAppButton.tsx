import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
    const phoneNumber = '+14698951476'; // Replace with your actual WhatsApp number including country code
    const message = 'Hello! I am interested in your products.';

    const handleClick = () => {
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <div className="fixed bottom-6 left-6 z-50 flex items-center gap-2 group">
            {/* Tooltip text (appears on hover) */}
            <span className="hidden md:block absolute left-16 bg-white text-gray-800 px-3 py-1 rounded-lg shadow-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                Chat with us
            </span>

            {/* Button with pulsing effect */}
            <button
                onClick={handleClick}
                className="relative bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#20b858] transition-all duration-300 hover:scale-110 flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(37,211,102,0.6)] cursor-pointer"
                aria-label="Chat on WhatsApp"
            >
                {/* Ping animation effect */}
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75 animate-ping duration-1000"></span>

                <FaWhatsapp className="relative text-3xl z-10" />
            </button>
        </div>
    );
};

export default WhatsAppButton;
