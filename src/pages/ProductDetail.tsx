import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaStar, FaCheck, FaArrowLeft, FaMagic, FaClock, FaLeaf, FaFlask, FaShoppingBag, FaCcVisa, FaCcMastercard, FaCcAmex, FaRegCircle, FaDotCircle } from 'react-icons/fa';
import { fetchShopifyProductById, fetchShopifyProducts } from '../utils/shopify';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/price';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]); ``
  const [loading, setLoading] = useState(true);
  const [_error, setError] = useState<string | null>(null);
  const { addItem } = useCart();
  const [selectedBundle, setSelectedBundle] = useState({ id: 2 }); // Default to Most Popular
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'shipping'>('desc');
  const [mainImage, setMainImage] = useState<string>('');
  console.log('product', product, 'relatedProducts', relatedProducts, 'setMainImage', mainImage)

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
          setRelatedProducts(allProducts.filter((p: any) => p.id !== id).slice(0, 4));
          setError(null);
        } else {
          setError('Product not found.');
        }
      } catch (err) {
        setError('Failed to load product details.');
      } finally {
        setLoading(false);
      }
    };
    loadProductData();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-[#FCFAF8] flex flex-col items-center justify-center space-y-6">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-pink-100 border-t-pink-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-white rounded-full shadow-sm"></div>
        </div>
      </div>
      <p className="text-stone-400 font-serif italic text-lg tracking-wide">Refining your experience...</p>
    </div>
  );

  const basePrice = product.price;
  const currentBundles = [
    { id: 1, name: 'Essentials Pack', quantity: 1, price: basePrice, save: 0, label: 'Starter', desc: 'Single Treatment' },
    { id: 2, name: 'Radiance Bundle', quantity: 2, price: (basePrice * 2 * 0.85), save: 15, label: 'Best Seller', desc: 'Double the Glow' },
    { id: 3, name: 'The Ultimate Ritual', quantity: 6, price: (basePrice * 6 * 0.75), save: 25, label: 'Best Value', desc: '6 Month Transformation' },
  ];

  const activeBundle = currentBundles.find(b => b.id === selectedBundle.id) || currentBundles[1];

  return (
    <div className="min-h-screen bg-[#FCFAF8] text-stone-800 selection:bg-pink-100">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-6 py-8">
        <Link to="/shop" className="group inline-flex items-center text-stone-400 hover:text-pink-500 transition-colors gap-2">
          <div className="p-2 rounded-full bg-white shadow-sm border border-stone-100 group-hover:shadow-md transition-all">
            <FaArrowLeft className="h-3 w-3 text-pink-500" />
          </div>
          <span className="text-sm tracking-wide font-semibold">Return to Shop</span>
        </Link>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

          {/* LEFT: Gallery (Sticky) */}
          <div className="lg:col-span-7 space-y-8 lg:top-8 self-start">
            <div className="relative h-[300px] lg:h-[500px] w-full rounded-lg bg-white overflow-hidden shadow-sm border border-stone-100">
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
              />
              <div className="absolute top-6 left-6 bg-white/80 backdrop-blur-md px-5 py-2 rounded-full text-[10px] font-black tracking-widest uppercase border border-white/20 shadow-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-pulse" />
                Trending Now
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 px-2 ">
              {product.images?.map((img: string, i: number) => (
                <button
                  key={i}
                  onClick={() => setMainImage(img)}
                  className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-300 cursor-pointer ${mainImage === img ? 'border-pink-300 scale-95' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <img src={img} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Content */}
          <div className="lg:col-span-5 flex flex-col pt-4">
            {/* Tag */}
            <div className="mb-4">
              <span className="inline-block px-3 py-1 rounded-full border border-pink-200 text-pink-500 text-[10px] font-bold tracking-widest uppercase bg-pink-50">
                KR Formulated in Korea
              </span>
            </div>

            {/* Reviews */}
            <div className="flex items-center gap-2 mb-2">
              <div className="flex text-pink-500 text-2xl gap-0.5">
                {[...Array(5)].map((_, i) => <FaStar key={i} />)}
              </div>
              <span className="text-sm font-light text-stone-600">
                Rated <span className="font-bold text-stone-900">{product.rating}</span> ({product.reviews})
              </span>
              <span className="bg-pink-100 text-pink-600 text-[10px] font-black px-2.5 py-1 rounded ml-2 uppercase tracking-wider border border-pink-200">Top Seller</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-2 leading-[1.1] tracking-tight">
              {product.name}
            </h1>



            {/* Description & Features */}
            <div className="mb-8 mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-2 text-sm font-bold text-stone-800">
                <div className="flex items-center gap-3">
                  <div className="bg-pink-500 text-white p-1.5 rounded-full"><FaMagic className="w-3 h-3" /></div> Instantly Visible Lift
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-pink-500 text-white p-1.5 rounded-full"><FaClock className="w-3 h-3" /></div> Long-Lasting Results
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-pink-500 text-white p-1.5 rounded-full"><FaLeaf className="w-3 h-3" /></div> Gentle on Sensitive Skin
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-pink-500 text-white p-1.5 rounded-full"><FaFlask className="w-3 h-3" /></div> Clinically Proven
                </div>
              </div>
            </div>

            {/* Bundle Selector (Radio Style) */}
            <div className="space-y-2 mb-8">
              {currentBundles.map((bundle, index) => {
                // Map logical bundles to visual "Buy X Get Y" style
                let title = "Buy 1 Box";
                let subTitle = "Contains 8 Pairs";
                let badge = null;

                if (index === 1) { // Radiance (Buy 2 Get 1)
                  title = "Buy 2 Get 1 FREE";
                  subTitle = "Contains 24 Pairs";
                  badge = "Most Popular";
                } else if (index === 2) { // Ultimate (Buy 3 Get 2)
                  title = "Buy 3 Get 2 FREE";
                  subTitle = "Contains 40 Pairs";
                }

                const isSelected = selectedBundle.id === bundle.id;

                return (
                  <div
                    key={bundle.id}
                    onClick={() => setSelectedBundle(bundle)}
                    className={`group relative flex items-center justify-between p-5 rounded-2xl border-2 transition-all cursor-pointer ${isSelected ? 'border-stone-900 bg-white shadow-xl scale-[1.02]' : 'border-stone-200 bg-white hover:border-pink-300 opacity-80 hover:opacity-100'}`}
                  >
                    <div className="flex items-center gap-4">
                      {isSelected ? <FaDotCircle className="text-2xl text-stone-900" /> : <FaRegCircle className="text-2xl text-stone-300" />}

                      <div>
                        <div className="flex items-center gap-3">
                          <h4 className="font-bold text-lg text-stone-900 tracking-tight">{title}</h4>
                          <span className="bg-pink-100/50 text-pink-800 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide">{subTitle}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-2xl font-black text-stone-900 leading-none">${formatPrice(bundle.price)}</p>
                      {bundle.save > 0 && (
                        <div className="mt-1">
                          <span className="text-[10px] font-black text-pink-500 bg-pink-50 px-2 py-0.5 rounded-full uppercase">Save {bundle.save}%</span>
                        </div>
                      )}
                    </div>

                    {badge && (
                      <div className="absolute -top-3 right-10 bg-pink-300 text-white text-[10px] font-black px-3 py-1 rounded-full tracking-widest shadow-md uppercase transform rotate-2">
                        ✨ {badge} ✨
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* CTA */}
            <div className="space-y-6">
              <button
                onClick={() => addItem(product, activeBundle.quantity)}
                className="w-full bg-pink-500 text-white cursor-pointer py-5 rounded-full font-semibold text-lg uppercase tracking-wide shadow-xl hover:bg-pink-600 hover:shadow-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-3"
              >
                <FaShoppingBag /> Add To Cart
              </button>

              <div className="flex justify-center gap-4 text-stone-300 text-2xl grayscale hover:grayscale-0 transition-all">
                <FaCcVisa /> <FaCcMastercard /> <FaCcAmex />
              </div>

              {/* <div className="flex items-center justify-center gap-3 border border-stone-200 rounded-lg p-3 bg-stone-50">
                <div className="bg-stone-900 text-white rounded-full p-1"><FaShieldAlt className="w-3 h-3" /></div>
                <p className="text-xs font-medium text-stone-600">Less than 1% of customers claim our 30-Day Money Back Guarantee</p>
              </div> */}
            </div>

            {/* Info Tabs */}
            <div className="mt-16 border-t border-stone-100 pt-10">
              <div className="flex gap-10 mb-8 overflow-x-auto no-scrollbar">
                {['desc', 'shipping'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`text-[18px] tracking-wider whitespace-nowrap pb-2 border-b-2 transition-all cursor-pointer ${activeTab === tab ? 'border-pink-400 text-stone-900' : 'border-transparent text-stone-300 hover:text-stone-500'}`}
                  >
                    {tab === 'desc' ? 'Ritual' : 'Delivery'}
                  </button>
                ))}
              </div>
              <div className="text-stone-500 leading-relaxed text-sm">
                {activeTab === 'desc' && <div dangerouslySetInnerHTML={{ __html: product.description }} className="prose prose-sm opacity-80" />}
                {activeTab === 'shipping' && <p>Express delivery in 3-5 business days. International shipping calculated at checkout.</p>}
              </div>
            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        <div className="mt-32 pt-24 border-t border-stone-100">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif text-stone-900 mb-4">Complete the Ritual</h2>
            <p className="text-stone-400 uppercase tracking-widest text-xs font-bold">Recommended for you</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {relatedProducts.map((item) => (
              <Link to={`/product/${item.id}`} key={item.id} className="group block mb-10">
                <div className="aspect-square bg-white rounded-sm overflow-hidden mb-6 relative border border-stone-50 shadow-sm group-hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
                  <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Quick Add Button Overlay */}
                  <div className="absolute bottom-4 right-4 translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    <div className="bg-white text-stone-900 p-3 rounded-full shadow-lg hover:bg-pink-500 hover:text-white transition-colors">
                      <FaCheck className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                <div className="text-left">
                  <div className="flex items-center justify-start gap-1 mb-2">
                    <div className="flex text-yellow-400 text-xs">
                      {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                    </div>
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">({item.reviews || 84} Reviews)</span>
                  </div>

                  <h3 className="font-serif text-lg text-stone-900 group-hover:text-pink-500 transition-colors leading-tight mb-2">{item.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-900 font-black text-base">${formatPrice(item.price)}</span>
                    <span className="text-[10px] font-bold text-pink-500 uppercase tracking-widest border-b border-pink-200 pb-0.5">Shop Now</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;