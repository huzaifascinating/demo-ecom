import { Link, useLocation } from 'react-router-dom';
import { FaShoppingBag, FaBars } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import Logo from '../assets/lor.png';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { openCart, cartCount } = useCart();
  const location = useLocation();

  // Close mobile menu automatically on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header className="relative bg-linear-to-r from-pink-200 to-pink-50 backdrop-blur-sm shadow-sm border-b border-gray-100 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between">
          {/* Mobile menu button (left) */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 hover:text-pink-500 p-2 rounded-full hover:bg-white/60 transition-colors"
            aria-label="Open menu"
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
          >
            <FaBars className="h-6 w-6" />
          </button>

          {/* Logo (centered on mobile, left on desktop) */}
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="absolute left-1/2 -translate-x-1/2 flex items-center md:static md:left-auto md:translate-x-0"
          >
            <img src={Logo} alt="Lorena Logo" width={100} />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-pink-500 font-medium transition-colors">Home</Link>
            <Link to="/shop" className="text-gray-700 hover:text-pink-500 font-medium transition-colors">Shop Now</Link>
            <Link to="/reviews" className="text-gray-700 hover:text-pink-500 font-medium transition-colors">Reviews</Link>
          </nav>

          {/* Right: Cart (mobile + desktop) */}
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => openCart({ activeTab: 'cart' })}
              className="relative text-gray-700 hover:text-pink-500 transition-colors cursor-pointer p-2 rounded-full hover:bg-white/60"
              aria-label="Open cart"
            >
              <FaShoppingBag className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-linear-to-tr from-pink-400 to-purple-500 text-white text-[10px] font-black rounded-full h-4 w-4 flex items-center justify-center shadow-sm">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          id="mobile-nav"
          className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 absolute w-full shadow-lg"
        >
          <div className="px-4 pt-2 pb-4 space-y-1">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 rounded-xl text-base font-semibold text-gray-800 hover:text-pink-600 hover:bg-pink-50 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/shop"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 rounded-xl text-base font-semibold text-gray-800 hover:text-pink-600 hover:bg-pink-50 transition-colors"
            >
              Shop Now
            </Link>
            <Link
              to="/reviews"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 rounded-xl text-base font-semibold text-gray-800 hover:text-pink-600 hover:bg-pink-50 transition-colors"
            >
              Reviews
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
