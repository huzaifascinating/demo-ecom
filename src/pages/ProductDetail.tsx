import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaStar, FaCheck, FaShippingFast, FaShieldAlt, FaFire, FaArrowLeft, FaSpinner } from 'react-icons/fa';
import { fetchShopifyProductById, fetchShopifyProducts } from '../utils/shopify';
import { useCart } from '../context/CartContext';

const BUNDLES = [
  { id: 1, name: 'Essentials Pack', quantity: 1, price: 39.99, save: 0, label: 'Starter', desc: '1 x Stone Dish Mat' },
  { id: 2, name: 'Couple Pack', quantity: 2, price: 69.99, save: 15, label: 'Most Popular', desc: '2 x Stone Dish Mats' },
  { id: 3, name: 'Family Bundle', quantity: 6, price: 189.99, save: 25, label: 'Max Savings', desc: '6 x Stone Dish Mats' },
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addItem } = useCart();
  const [selectedBundle, setSelectedBundle] = useState(BUNDLES[0]);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'shipping'>('desc');
  const [mainImage, setMainImage] = useState<string>('');

  useEffect(() => {
    const loadProductData = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const [pData, allProducts] = await Promise.all([
          fetchShopifyProductById(id),
          fetchShopifyProducts()
        ]);
        
        if (pData) {
          setProduct(pData);
          setMainImage(pData.image);
          // Filter out current product from related
          setRelatedProducts(allProducts.filter((p: any) => p.id !== id).slice(0, 4));
          setError(null);
        } else {
          setError('Product not found.');
        }
      } catch (err) {
        setError('Failed to load product details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProductData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center space-y-4">
        <FaSpinner className="text-5xl text-pink-500 animate-spin" />
        <p className="text-gray-500 font-medium text-lg">Loading amazing details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-6 max-w-md">
          <div className="text-6xl text-gray-200 font-serif font-black italic">Oops!</div>
          <h2 className="text-2xl font-bold text-gray-900">{error || 'Something went wrong.'}</h2>
          <p className="text-gray-500">We couldn't find the product you're looking for. It might have moved or been retired.</p>
          <Link to="/shop" className="inline-block px-10 py-4 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-all shadow-xl">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  // Calculate dynamic bundle prices based on Shopify single product price
  const basePrice = product.price;
  const currentBundles = [
    { id: 1, name: 'Essentials Pack', quantity: 1, price: basePrice, save: 0, label: 'Starter', desc: '1 x ' + product.name },
    { id: 2, name: 'Couple Pack', quantity: 2, price: (basePrice * 2 * 0.85), save: 15, label: 'Most Popular', desc: '2 x ' + product.name },
    { id: 3, name: 'Family Bundle', quantity: 6, price: (basePrice * 6 * 0.75), save: 25, label: 'Max Savings', desc: '6 x ' + product.name },
  ];

  // Update bundle selection if base price changes
  const activeBundle = currentBundles.find(b => b.id === selectedBundle.id) || currentBundles[1];

  return (
    <div className="min-h-screen bg-white py-6">
      <div className="flex items-center space-x-2 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/shop" className="text-gray-600 hover:text-pink-500 transition-colors">
          <FaArrowLeft className="h-5 w-5" />
        </Link>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-20 lg:mb-24 items-start">

          {/* Gallery Section */}
          <div className="space-y-6 lg:space-y-8 self-start z-10 max-w-md mx-auto lg:mx-0">
            <div className="relative group">
              <div className="aspect-square bg-white rounded-3xl overflow-hidden relative max-w-sm mx-auto">
                <img
                  src={mainImage}
                  alt={product.name}
                  className="w-full h-full object-cover transform transition duration-700 hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-black text-white px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase shadow-md flex items-center gap-2">
                  <FaFire className="text-orange-500" /> Selling Fast
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images?.map((img: string, i: number) => (
                <div 
                  key={i} 
                  onClick={() => setMainImage(img)}
                  className={`aspect-square bg-gray-50 rounded-2xl overflow-hidden cursor-pointer border-2 transition-all opacity-80 hover:opacity-100 hover:shadow-lg ${mainImage === img ? 'border-pink-500 ring-2 ring-pink-500/20' : 'border-transparent'}`}
                >
                  <img src={img} alt={`${product.name} view ${i}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Info Section */}
          <div className="flex flex-col max-w-lg mx-auto lg:mx-0">
            <div className="inline-flex items-center space-x-2 mb-4 bg-pink-50 self-start px-3 py-1 rounded-full border border-pink-100">
              <div className="flex text-yellow-400 text-sm">
                {[...Array(5)].map((_, i) => <FaStar key={i} />)}
              </div>
              <span className="text-pink-900 text-xs font-bold uppercase tracking-wide">4.9/5 (2,400+ Reviews)</span>
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif font-semibold text-gray-900 mb-4 leading-tight">
              {product.name}
            </h1>
            <p className="text-sm md:text-base text-gray-600 mb-6 border-l-4 border-pink-500 pl-4 bg-gray-50 py-3 rounded-r-lg italic">
              Dry your dishes instantly with the power of nature and elevate the look of your space.
            </p>

            {/* Price Display */}
            <div className="mb-6 flex items-baseline gap-4">
              <span className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
                ${activeBundle.price.toFixed(2)}
              </span>
              {activeBundle.save > 0 && (
                <span className="text-lg text-pink-500 font-bold bg-pink-50 px-3 py-1 rounded-full uppercase tracking-wider text-xs">
                  Save {activeBundle.save}%
                </span>
              )}
            </div>

            {/* Bundle Selector - Catchy Cards */}
            <div className="space-y-4 mb-8">
              <p className="font-bold text-gray-900 text-sm uppercase tracking-wide flex items-center"><span className="w-2 h-2 bg-pink-500 rounded-full mr-2"></span> Select Quantity</p>
              <div className="grid grid-cols-1 gap-4">
                {currentBundles.map((bundle) => (
                  <div
                    key={bundle.id}
                    onClick={() => {
                      setSelectedBundle(bundle);
                    }}
                    className={`relative flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 transform ${selectedBundle.id === bundle.id ? 'border-pink-500 bg-pink-50/50 shadow-md scale-[1.02]' : 'border-gray-100 hover:border-pink-200 hover:shadow-sm'}`}
                  >
                    {/* Best Value Label */}
                    {bundle.save > 0 && <div className="absolute -top-3 right-4 bg-linear-to-r from-pink-500 to-purple-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-sm uppercase tracking-widest">
                      Save {bundle.save}%
                    </div>}

                    <div className="flex items-center space-x-4">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${selectedBundle.id === bundle.id ? 'border-pink-500' : 'border-gray-300'}`}>
                        {selectedBundle.id === bundle.id && <div className="w-3 h-3 bg-pink-500 rounded-full shadow-sm"></div>}
                      </div>
                      <div>
                        <span className={`font-bold block text-lg ${selectedBundle.id === bundle.id ? 'text-gray-900' : 'text-gray-600'}`}>{bundle.name}</span>
                        <span className="text-gray-400 text-sm font-medium truncate max-w-[200px]">{bundle.desc}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-black text-xl text-gray-900">${bundle.price.toFixed(2)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add To Cart - Catchy Button */}
            <div className="flex flex-col space-y-4 mb-8">

              <button className="relative w-full overflow-hidden bg-black text-white font-black py-5 rounded-xl hover:bg-gray-900 transition-all active:scale-[0.99] shadow-xl hover:shadow-2xl hover:shadow-pink-500/20 text-lg group cursor-pointer" onClick={() => addItem(product.id, activeBundle.quantity)}>
                <span className="relative z-10 flex items-center justify-center gap-2">
                  ADD TO CART <FaCheck className="group-hover:scale-125 transition-transform" />
                </span>
                <div className="absolute inset-0 h-full w-full scale-0 rounded-xl transition-all duration-300 group-hover:scale-100 group-hover:bg-linear-to-r group-hover:from-gray-800 group-hover:to-black opacity-10"></div>
              </button>
              <div className="flex items-center justify-around text-xs text-gray-500 font-bold uppercase tracking-widest px-4">
                <div className="flex items-center space-x-2"><FaShippingFast className="text-pink-500 w-4 h-4" /> <span>Free Shipping</span></div>
                <div className="flex items-center space-x-2"><FaShieldAlt className="text-pink-500 w-4 h-4" /> <span>Lifetime Warranty</span></div>
              </div>
            </div>

            {/* Value Props - Modern Cards */}
            <div className="grid grid-cols-2 gap-3 mb-10">
              {['Instant Absorption', 'Mold Prevention', 'Elegant Design', 'Easy To Clean'].map((prop, i) => (
                <div key={i} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <FaCheck className="text-green-500 shrink-0" />
                  <span className="text-sm font-bold text-gray-700">{prop}</span>
                </div>
              ))}
            </div>

            {/* Accordion Content */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex space-x-8 border-b border-gray-200 mb-6">
                {['desc', 'specs', 'shipping'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`pb-3 font-bold text-sm uppercase tracking-wider transition-all border-b-2 cursor-pointer ${activeTab === tab ? 'border-pink-500 text-pink-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                  >
                    {tab === 'desc' ? 'Description' : tab === 'specs' ? 'Specifications' : 'Shipping'}
                  </button>
                ))}
              </div>
              <div className="text-gray-600 text-sm leading-relaxed min-h-[100px] animate-fade-in-up">
                {activeTab === 'desc' && (
                  <div className="space-y-4">
                    <div dangerouslySetInnerHTML={{ __html: product.description }} />
                  </div>
                )}
                {activeTab === 'specs' && (
                  <ul className="grid grid-cols-2 gap-2">
                    <li className="bg-gray-50 p-2 rounded">Material: 100% Natural Stone</li>
                    <li className="bg-gray-50 p-2 rounded">Size: 60cm x 40cm</li>
                    <li className="bg-gray-50 p-2 rounded">Weight: 1.5kg</li>
                    <li className="bg-gray-50 p-2 rounded">Includes: Non-slip pad</li>
                  </ul>
                )}
                {activeTab === 'shipping' && (
                  <p className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-blue-800">
                    We offer free express shipping on all orders over $50. Orders are processed within 24 hours.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS SECTION */}
        <div className="border-t border-gray-100 pt-16">
          <h2 className="mb-16 text-center text-3xl md:text-5xl font-serif font-semibold text-gray-900">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <Link to={`/product/${item.id}`} key={item.id} className="group">
                <div className="aspect-square bg-gray-100 rounded-sm overflow-hidden mb-4 relative">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                  <button className="absolute bottom-4 right-4 bg-white text-black p-3 rounded-full shadow-lg translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-pink-500 hover:text-white">
                    <FaCheck />
                  </button>
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-pink-500 transition-colors">{item.name}</h3>
                <p className="text-gray-500">${item.price.toFixed(2)}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
