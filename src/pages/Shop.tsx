import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { FaThLarge, FaList, FaSpinner, FaStar, FaQuoteLeft, FaSmile } from 'react-icons/fa';
import { fetchShopifyProducts } from '../utils/shopify';
import { formatPrice } from '../utils/price';

const Shop = () => {
  const [shopifyProducts, setShopifyProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, _setSearchQuery] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchShopifyProducts();
        setShopifyProducts(data);
        setError(null);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const filteredProducts: any = shopifyProducts.filter((p: any) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white min-h-screen py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header & Controls */}
        <div className="mb-6 rounded-3xl bg-pink-50 backdrop-blur-sm border border-pink-100 shadow-[0_18px_45px_rgba(0,0,0,0.05)] overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-6 py-6 gap-3">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-pink-50 px-3  mb-1">
                <span className="h-1.5 w-1.5 rounded-full bg-pink-500" />
                <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-pink-600">
                  Curated best-sellers
                </span>
              </div>
              <h1 className="text-[26px] md:text-4xl font-serif font-semibold text-gray-900">
                Shop Lorena Favorites
              </h1>
              {/* <p className="mt-2 text-sm md:text-base text-gray-600 max-w-xl">
                Handpicked home and skincare upgrades designed to solve real everyday problems
              </p> */}
            </div>

            <div className="flex flex-col items-stretch md:items-end gap-4 w-full md:w-auto">
              {/* Search Bar */}
              {/* <div className="relative group w-full md:w-80">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaSearch className="h-4 w-4 text-gray-400 group-focus-within:text-pink-500 transition-colors" />
                </div>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-full text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all shadow-sm"
                />
              </div> */}

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
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <FaSpinner className="text-4xl text-pink-500 animate-spin" />
            <p className="text-gray-500 font-medium tracking-wide">Fetching latest collection...</p>
            <div className="mt-4 flex justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-stone-100 shadow-xs">
                <div className="w-2 h-2 rounded-full bg-pink-400 group-hover:scale-125 transition-transform" />
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                  Curated from our <span className="text-stone-900">WhatsApp</span> & <span className="text-stone-900">Email</span> community
                </p>
              </div>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500 font-medium">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500">No products found for this category.</p>
          </div>
        ) : (
          <div
            className={`grid gap-8 ${view === 'grid'
              ? 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-5'
              : 'grid-cols-1'
              }`}
          >
            {filteredProducts.map((product: any) =>
              view === 'grid' ? (
                <ProductCard key={product.id} {...product} />
              ) : (
                // List View Item
                <Link to={`/product/${product.id}`} key={product.id} className="group block">
                  <div className="group bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row sm:items-center gap-5 hover:shadow-xl hover:-translate-y-1 transition-all">
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
                        {product.description?.substring(0, 150)}...
                      </p>

                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        <div className="flex items-baseline gap-2">
                          <span className="text-pink-600 font-bold text-lg">
                            ${formatPrice(product.price)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-gray-400 line-through text-sm">
                              ${formatPrice(product.originalPrice)}
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-gray-400">
                          {product.rating}★ • {product.reviews.toLocaleString()} reviews
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            )}
          </div>
        )}

        {/* Reviews Section */}
        <div className="pt-10">
          <div className="text-center mb-12">
            <span className="text-pink-500 font-bold tracking-widest uppercase text-xs mb-3 block">Real Results</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-stone-900 mb-4">
              Community <span className="italic text-pink-500">Love</span>
            </h2>
            <div className="flex justify-center items-center gap-1.5 mb-2">
              <div className="flex text-yellow-400 text-lg gap-0.5">
                {[...Array(5)].map((_, i) => <FaStar key={i} />)}
              </div>
              <span className="font-bold text-stone-900">4.9 / 5</span>
              <span className="text-stone-400 text-sm">(2,400+ reviews)</span>
            </div>
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-stone-50 rounded-full border border-stone-100 shadow-sm animate-fade-in">
              <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
              <p className="text-[11px] font-medium text-stone-500 tracking-wide">
                Authentic feedback gathered via <span className="text-stone-800 font-bold">WhatsApp</span> & <span className="text-stone-800 font-bold">Email</span>
              </p>
            </div>
          </div>

          <div className="flex md:grid overflow-x-auto md:overflow-x-visible pt-8 pb-8 md:pb-0 snap-x snap-mandatory md:snap-none md:grid-cols-2 lg:grid-cols-3 gap-6 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar">
            {[
              {
                name: "Sarah J.",
                title: "Game Changer!",
                content: "I've tried so many eye creams, but these patches are on another level. My under-eyes look so much smoother and brighter after just one use!",
                product: "InstaLift Collagen Patches",
                initial: "S"
              },
              {
                name: "Emily R.",
                title: "Actually Works",
                content: "Prickly but painless! You can feel it working. Definitely targets the deep lines better than any topical cream.",
                product: "Precision Microneedle Patches",
                initial: "E"
              },
              {
                name: "Jessica M.",
                title: "Morning Essential",
                content: "Love how cooling these feel. They are absolutely perfect for my morning routine to wake up my tired eyes.",
                product: "InstaLift Collagen Patches",
                initial: "J"
              },
              {
                name: "Laura S.",
                title: "Crows Feet Fading",
                content: "I can feel it working. My crows feet are noticeably fading after just a few treatments. Impressive tech.",
                product: "Precision Microneedle Patches",
                initial: "L"
              },
              {
                name: "Amanda K.",
                title: "Makeup Ready",
                content: "My concealer goes on so much smoother now. Whatever texture I had before is completely gone. Highly recommend!",
                product: "InstaLift Collagen Patches",
                initial: "A"
              },
              {
                name: "Danielle C.",
                title: "Innovative",
                content: "Innovative technology that delivers real results. It feels like a professional treatment at home.",
                product: "Precision Microneedle Patches",
                initial: "D"
              }
            ].map((review, i) => (
              <div key={i} className="shrink-0 w-[280px] sm:w-[320px] md:w-auto snap-start relative h-full rounded-3xl bg-white border border-gray-100 p-6 pt-10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
                <FaQuoteLeft className="absolute -top-6 left-6 text-4xl text-pink-100 group-hover:text-pink-200 transition-colors" />
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-pink-600 mb-4">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-pink-50 text-pink-500">
                    <FaSmile className="text-[11px]" />
                  </span>
                  {review.product}
                </div>
                <h3 className="font-bold text-stone-900 mb-2 font-serif text-lg">{review.title}</h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-6 italic flex-grow">"{review.content}"</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{review.name}</p>
                    <div className="flex text-yellow-400 text-[10px] mt-0.5">
                      {[...Array(5)].map((_, starI) => (
                        <FaStar key={starI} />
                      ))}
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center text-pink-500 font-bold text-xs">
                    {review.initial}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;


