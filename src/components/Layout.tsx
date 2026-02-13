import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ValentineTimer from './ValentineTimer';
import CartDrawer from './CartDrawer';
import DiscountModal from './DiscountModal';
import BuyOneGetOneFree from './BuyOneGetOneFree';
import WhatsAppButton from './WhatsAppButton';

const Layout = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 z-50 w-full transition-all duration-300">
        <ValentineTimer />

        {/* Buy 2 Get 1 Free - Collapses on scroll */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${isScrolled ? 'max-h-0 opacity-0' : 'max-h-[50px] opacity-100'
            }`}
        >
          <BuyOneGetOneFree />
        </div>

        <Navbar />
      </div>

      <main className="grow">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <DiscountModal />
      <WhatsAppButton />
    </div>
  );
};

export default Layout;
