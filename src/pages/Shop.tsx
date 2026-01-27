import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { FaFilter, FaThLarge, FaList } from 'react-icons/fa';
import stoneMatImage from '../assets/image.png';

// Mock Data - Updated with requested products
const PRODUCTS = [
  { 
    id: '1', 
    name: 'Diatomaceous Stone Dish Mat', 
    price: 39.99, 
    originalPrice: 79.99, 
    category: 'home', 
    image: stoneMatImage, // Using local asset
    rating: 4.9,
    reviews: 2400
  },
  { 
    id: '2', 
    name: 'Lift PDRN Collagen Eye Patches', 
    price: 34.99, 
    originalPrice: 69.99, 
    category: 'skincare', 
    image: 'https://picsum.photos/seed/collagen_patches/600/600', 
    rating: 4.8,
    reviews: 850
  },
  { 
    id: '3', 
    name: 'Microneedle Eye Patches', 
    price: 29.99, 
    originalPrice: 59.99, 
    category: 'skincare', 
    image: 'https://picsum.photos/seed/microneedle/600/600', 
    rating: 4.7,
    reviews: 1200
  },
  { 
    id: '4', 
    name: 'Hydrating Eye Serum', 
    price: 24.99, 
    category: 'skincare', 
    image: 'https://picsum.photos/seed/serum_glow/600/600', 
    rating: 4.6,
    reviews: 320
  },
  { 
    id: '5', 
    name: 'Advanced Night Cream', 
    price: 44.99, 
    category: 'skincare', 
    image: 'https://picsum.photos/seed/night_cream/600/600', 
    rating: 4.8,
    reviews: 500
  },
  { 
    id: '6', 
    name: 'Stone Coaster Set (4-Pack)', 
    price: 19.99, 
    category: 'home', 
    image: 'https://picsum.photos/seed/coasters/600/600', 
    rating: 4.9,
    reviews: 150
  },
];

const Shop = () => {
  const [filter, setFilter] = useState('all');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const filteredProducts = filter === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === filter);

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Shop All Products</h1>
          
          <div className="flex items-center space-x-6">
            {/* Filter */}
            <div className="flex items-center space-x-2">
              <FaFilter className="text-gray-400" />
              <select 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)}
                className="bg-transparent border-none text-gray-700 font-medium focus:ring-0 p-0 cursor-pointer"
              >
                <option value="all">All Products</option>
                <option value="home">Home & Kitchen</option>
                <option value="skincare">Skincare</option>
              </select>
            </div>

            {/* View Toggle */}
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              <button 
                onClick={() => setView('grid')}
                className={`p-2 rounded-md transition-colors ${view === 'grid' ? 'bg-white shadow-sm text-pink-500' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <FaThLarge />
              </button>
              <button 
                onClick={() => setView('list')}
                className={`p-2 rounded-md transition-colors ${view === 'list' ? 'bg-white shadow-sm text-pink-500' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <FaList />
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className={`grid gap-8 ${view === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {filteredProducts.map(product => (
            view === 'grid' ? (
              <ProductCard key={product.id} {...product} />
            ) : (
              // List View Item
              <div key={product.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-6 hover:shadow-md transition-shadow">
                 <div className="w-32 h-32 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                 </div>
                 <div className="flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-gray-500 mb-4 text-sm max-w-lg">Experience premium quality and instant results.</p>
                    <div className="flex items-center space-x-3">
                       <span className="text-pink-600 font-bold text-lg text-primary">${product.price}</span>
                       {product.originalPrice && <span className="text-gray-400 line-through text-sm">${product.originalPrice}</span>}
                    </div>
                 </div>
                 <button className="bg-black text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors">
                    Add to Cart
                 </button>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
