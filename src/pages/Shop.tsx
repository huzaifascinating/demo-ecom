import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { FaFilter, FaThLarge, FaList } from 'react-icons/fa';
import { PRODUCTS } from '../data/Mockdata';

const Shop = () => {
  const [filter, setFilter] = useState('all');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const filteredProducts: any =
    filter === 'all'
      ? PRODUCTS
      : PRODUCTS.filter((p: any) => p.category === filter);

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header & Controls */}
        <div className="mb-10 rounded-3xl bg-pink-50 backdrop-blur-sm border border-pink-100 shadow-[0_18px_45px_rgba(0,0,0,0.05)] overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-6 py-6 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-pink-50 px-3 py-1 mb-3">
                <span className="h-1.5 w-1.5 rounded-full bg-pink-500" />
                <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-pink-600">
                  Curated best-sellers
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-serif font-semibold text-gray-900">
                Shop Lorena Favorites
              </h1>
              <p className="mt-2 text-sm md:text-base text-gray-600 max-w-xl">
                Handpicked home and skincare upgrades designed to solve real everyday problems —
                all in one beautiful place.
              </p>
            </div>

            <div className="flex flex-col items-stretch md:items-end gap-4">
              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="flex items-center text-xs font-semibold uppercase tracking-[0.15em] text-gray-500">
                  <FaFilter className="mr-1 text-pink-400" /> Filter
                </span>
                {[
                  { value: 'all', label: 'All Products' },
                  { value: 'home', label: 'Home & Kitchen' },
                  { value: 'skincare', label: 'Skincare' },
                ].map((cat) => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => setFilter(cat.value)}
                    className={`cursor-pointer rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${filter === cat.value
                      ? 'border-pink-500 bg-pink-500 text-white shadow-sm'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-pink-300 hover:text-pink-500'
                      }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* View Toggle */}
              <div className="inline-flex items-center space-x-2 bg-gray-100 rounded-full p-1 max-w-sm sm:max-w-md lg:max-w-lg mx-auto lg:mx-0">
                <button
                  type="button"
                  onClick={() => setView('grid')}
                  className={`flex items-center gap-1 cursor-pointer rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${view === 'grid'
                    ? 'bg-white shadow-sm text-pink-500'
                    : 'text-gray-400 hover:text-gray-700'
                    }`}
                >
                  <FaThLarge className="text-sm" />
                  <span className="hidden sm:inline">Grid</span>
                </button>
                <button
                  type="button"
                  onClick={() => setView('list')}
                  className={`flex items-center gap-1 cursor-pointer rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${view === 'list'
                    ? 'bg-white shadow-sm text-pink-500'
                    : 'text-gray-400 hover:text-gray-700'
                    }`}
                >
                  <FaList className="text-sm" />
                  <span className="hidden sm:inline">List</span>
                </button>
              </div>
            </div>
          </div>

          {/* Small stats strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-gray-100 bg-gray-50/60 text-center text-xs text-gray-500">
            <div className="py-3 border-b sm:border-b-0 sm:border-r border-gray-100">
              4.8★ average rating across our collection
            </div>
            <div className="py-3 border-b sm:border-b-0 sm:border-r border-gray-100">
              Free shipping on orders over $50
            </div>
            <div className="py-3">
              30‑day money‑back guarantee
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div
          className={`grid gap-8 ${view === 'grid'
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-5'
            : 'grid-cols-1'
            }`}
        >
          {filteredProducts.map((product: any) =>
            view === 'grid' ? (
              <ProductCard key={product.id} {...product} />
            ) : (
              // List View Item
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row sm:items-center gap-5 hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="w-full sm:w-32 h-40 sm:h-32 shrink-0 bg-gray-100 rounded-xl overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    {product.category === 'skincare' && (
                      <span className="inline-flex items-center rounded-full bg-pink-50 px-2.5 py-0.5 text-[11px] font-semibold text-pink-600">
                        Skincare favorite
                      </span>
                    )}
                    {product.category === 'home' && (
                      <span className="inline-flex items-center rounded-full bg-purple-50 px-2.5 py-0.5 text-[11px] font-semibold text-purple-700">
                        Home upgrade
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 text-sm max-w-xl">
                    Experience premium quality and instant, visible results from day one.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-pink-600 font-bold text-lg">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-gray-400 line-through text-sm">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-400">
                      {product.rating}★ • {product.reviews.toLocaleString()} reviews
                    </div>
                  </div>
                </div>
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
