import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ValentineTimer from './ValentineTimer';
import CartDrawer from './CartDrawer';
import DiscountModal from './DiscountModal';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <ValentineTimer />
      <Navbar />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <DiscountModal />
    </div>
  );
};

export default Layout;
