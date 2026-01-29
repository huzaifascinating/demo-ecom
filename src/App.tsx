import './App.css'
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Reviews from './pages/Reviews';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="reviews" element={<Reviews />} />
          {/* Placeholder for Cart if needed */}
          <Route path="cart" element={<div className="p-20 text-center text-2xl font-bold">Cart Coming Soon</div>} />
          <Route path="*" element={<div className="p-20 text-center text-2xl font-bold">404 - Page Not Found</div>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
