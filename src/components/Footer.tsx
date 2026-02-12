import { FaInstagram, FaFacebook, FaTiktok } from 'react-icons/fa';
import Logo from '../assets/Logo.png';

const Footer = () => {
  return (
    <footer className="relative bg-gray-50 border-t border-gray-200 pt-16 pb-8 overflow-hidden">
      {/* Background logo */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-5">
        <img
          src={Logo}
          alt="Lorena logo background"
          className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg object-contain"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-serif font-semibold text-gray-900"><span className='text-4xl'>L</span>ORENA</h3>
            <p className="text-gray-500 text-sm">
              The #1 Natural Solution for Wrinkles & Fine Lines. Clinically proven results at home.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com/lorena.care1" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition-colors"><FaInstagram className="h-5 w-5" /></a>
              <a href="https://facebook.com/lorena.care1" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition-colors"><FaFacebook className="h-5 w-5" /></a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition-colors"><FaTiktok className="h-5 w-5" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Links</h4>
            <p className="text-gray-500 text-sm mb-4 leading-relaxed">
              Connect with us on our social platforms.
            </p>
            <ul className="space-y-3 text-gray-500 text-sm">
              <li>
                <a href="/" className="hover:text-pink-500 transition-colors flex items-center gap-2 group">
                  <img src={Logo} alt="" className="h-4 w-4 object-contain grayscale group-hover:grayscale-0 transition-all" />
                  Lorena
                </a>
              </li>
              <li>
                <a href="https://facebook.com/lorena.care1" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors flex items-center gap-2">
                  <FaFacebook className="h-4 w-4" />
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://instagram.com/lorena.care1" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors flex items-center gap-2">
                  <FaInstagram className="h-4 w-4" />
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Support</h4>
            <div className="space-y-3 text-gray-500 text-sm">
              <p className="leading-relaxed">
                <span className="font-semibold text-gray-900">Address:</span> 5900 Balcones Drive Austin Texas, United States.
              </p>
              <p>
                <span className="font-semibold text-gray-900">Phone:</span> +14698951476
              </p>
              <p>
                <span className="font-semibold text-gray-900">Email:</span> <a href="mailto:support@lorena.com" className="hover:text-pink-500 transition-colors">support@lorena.com</a>
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Stay in the loop</h4>
            <p className="text-gray-500 text-sm mb-4">Sign up for exclusive offers and skincare tips.</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 min-w-0 px-4 py-2 border border-gray-300 rounded-l-md focus:ring-pink-500 focus:border-pink-500 text-sm"
              />
              <button
                type="submit"
                className="bg-pink-500 text-white px-4 py-2 rounded-r-md hover:bg-pink-600 transition-colors text-sm font-medium"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col items-center space-y-6">
          <p className="text-gray-900 font-bold text-lg tracking-wider">© LORENA 2025</p>

          <div className="flex flex-wrap justify-center gap-4">
            {/* Apple Pay */}
            <div className="bg-white border border-gray-200 rounded-md px-3 py-1 flex items-center shadow-sm h-10">
              <span className="text-gray-900 font-bold flex items-center gap-1">
                <span className="text-xl"></span> Pay
              </span>
            </div>
            {/* Amex */}
            <div className="bg-[#007BC1] rounded-md px-3 py-1 flex flex-col items-center justify-center shadow-sm h-10 w-16">
              <span className="text-white font-bold text-[10px] leading-none uppercase italic">Am</span>
              <span className="text-white font-bold text-[10px] leading-none uppercase italic">Ex</span>
            </div>
            {/* Discover */}
            <div className="bg-white border border-gray-200 rounded-md px-2 py-1 flex flex-col items-center justify-center shadow-sm h-10 w-16">
              <span className="text-[#E55C20] font-black text-[9px] uppercase tracking-tighter">Discover</span>
              <div className="w-full h-[2px] bg-[#E55C20] mt-0.5"></div>
            </div>
            {/* Mastercard */}
            <div className="bg-white border border-gray-200 rounded-md px-3 py-1 flex items-center shadow-sm h-10">
              <div className="flex -space-x-2">
                <div className="w-5 h-5 rounded-full bg-[#EB001B] opacity-90"></div>
                <div className="w-5 h-5 rounded-full bg-[#F79E1B] opacity-90"></div>
              </div>
            </div>
            {/* Visa */}
            <div className="bg-white border border-gray-200 rounded-md px-3 py-1 flex items-center shadow-sm h-10">
              <span className="text-[#1A1F71] font-black italic text-xl tracking-tighter">VISA</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
