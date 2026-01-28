import { Link } from 'react-router-dom';
import { FaShoppingCart, FaBars } from 'react-icons/fa';
import { useState } from 'react';
import Logo from '../assets/Logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-pink-50 backdrop-blur-sm shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/">
              <img src={Logo} alt="Lorena Logo" width={100}/>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-pink-500 font-medium transition-colors">Home</Link>
            <Link to="/shop" className="text-gray-700 hover:text-pink-500 font-medium transition-colors">Shop Now</Link>
            <Link to="/reviews" className="text-gray-700 hover:text-pink-500 font-medium transition-colors">Reviews</Link>
          </nav>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-6">
            {/* <button className="text-gray-600 hover:text-pink-500 transition-colors">
              <FaSearch className="h-5 w-5" />
            </button> */}
            <Link to="/cart" className="relative text-gray-600 hover:text-pink-500 transition-colors">
              <FaShoppingCart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">0</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 hover:text-pink-500 p-2">
              <FaBars className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-pink-500 hover:bg-gray-50">Home</Link>
            <Link to="/shop" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-pink-500 hover:bg-gray-50">Shop Now</Link>
            <Link to="/cart" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-pink-500 hover:bg-gray-50">Cart</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
