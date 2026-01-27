import { FaInstagram, FaFacebook, FaTiktok } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900">NOVALIFT.</h3>
            <p className="text-gray-500 text-sm">
              The #1 Natural Solution for Wrinkles & Fine Lines. Clinically proven results at home.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-pink-500"><FaInstagram className="h-5 w-5" /></a>
              <a href="#" className="text-gray-400 hover:text-pink-500"><FaFacebook className="h-5 w-5" /></a>
              <a href="#" className="text-gray-400 hover:text-pink-500"><FaTiktok className="h-5 w-5" /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Shop</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-500 hover:text-pink-500 text-sm">Best Sellers</a></li>
              <li><a href="#" className="text-gray-500 hover:text-pink-500 text-sm">New Arrivals</a></li>
              <li><a href="#" className="text-gray-500 hover:text-pink-500 text-sm">Bundles</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Support</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-500 hover:text-pink-500 text-sm">FAQ</a></li>
              <li><a href="#" className="text-gray-500 hover:text-pink-500 text-sm">Shipping & Returns</a></li>
              <li><a href="#" className="text-gray-500 hover:text-pink-500 text-sm">Contact Us</a></li>
            </ul>
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
                className="bg-black text-white px-4 py-2 rounded-r-md hover:bg-gray-800 transition-colors text-sm font-medium"
              >
                Join
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-8 text-center">
          <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} NovaLift. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
