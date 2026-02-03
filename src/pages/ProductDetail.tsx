import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaStar, FaCheck, FaArrowLeft, FaMagic, FaClock, FaLeaf, FaFlask, FaShoppingBag, FaCcVisa, FaCcMastercard, FaCcAmex, FaRegCircle, FaDotCircle, FaChevronDown, FaTimes } from 'react-icons/fa';
import { fetchShopifyProductById, fetchShopifyProducts } from '../utils/shopify';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/price';
import productImg from '../assets/imageOne.png';
import GifOne from '../assets/gifOne.gif'
import GifTwo from '../assets/gifTwo.gif'
import GifThree from '../assets/gifThree.gif'
import LeftRightImage from '../assets/leftrightimages.jpeg'

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]); ``
  const [loading, setLoading] = useState(true);
  const [_error, setError] = useState<string | null>(null);
  const { addItem } = useCart();
  const [selectedBundle, setSelectedBundle] = useState({ id: 2 }); // Default to Most Popular
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState<string>('');
  const [showScrollTop, setShowScrollTop] = useState(false);

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

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  if (loading) return (
    <div className="min-h-screen bg-[#FCFAF8] flex flex-col items-center justify-center space-y-6">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-pink-100 border-t-pink-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-white rounded-full shadow-sm"></div>
        </div>
      </div>
      <p className="text-stone-400 font-serif italic text-lg tracking-wide">Loading...</p>
    </div>
  );

  const basePrice = product.price;
  const currentBundles = [
    { id: 1, name: 'Essentials Pack', quantity: 1, paidQty: 1, price: basePrice, originalPrice: basePrice, save: 0, label: 'Starter', desc: 'Single Treatment', title: "Buy 1 Box", subTitle: "Contains 8 Pairs" },
    { id: 2, name: 'Radiance Bundle', quantity: 3, paidQty: 2, price: (basePrice * 2), originalPrice: (basePrice * 3), save: 33, label: 'Best Seller', desc: 'Double the Glow', title: "Buy 2 Get 1 FREE", subTitle: "Contains 24 Pairs", badge: "Most Popular" },
    { id: 3, name: 'The Ultimate Ritual', quantity: 5, paidQty: 3, price: (basePrice * 3), originalPrice: (basePrice * 5), save: 40, label: 'Best Value', desc: '6 Month Transformation', title: "Buy 3 Get 2 FREE", subTitle: "Contains 40 Pairs" },
  ];

  const activeBundle = currentBundles.find(b => b.id === selectedBundle.id) || currentBundles[1];


  return (
    <>
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

        <main className="pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                </div>
                <span className="bg-pink-100 text-pink-600 text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider border border-pink-200 my-2 w-fit inline-block">Top Seller</span>

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
                <div className="space-y-3 mb-8">
                  {currentBundles.map((bundle) => {
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
                              <h4 className="font-bold text-lg text-stone-900 tracking-tight">{bundle.title}</h4>
                              <span className="bg-pink-100/50 text-pink-800 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide">{bundle.subTitle}</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="flex flex-col items-end">
                            {bundle.originalPrice > bundle.price && (
                              <span className="text-sm text-stone-400 line-through font-medium">
                                ${formatPrice(bundle.originalPrice)}
                              </span>
                            )}
                            <p className="text-2xl font-black text-stone-900 leading-none">${formatPrice(bundle.price)}</p>
                          </div>
                        </div>

                        {bundle.badge && (
                          <div className="absolute -top-3 right-10 bg-pink-300 text-white text-[10px] font-black px-3 py-1 rounded-full tracking-widest shadow-md uppercase transform rotate-2">
                            ✨ {bundle.badge} ✨
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>


                {/* CTA */}
                <div className="space-y-6">
                  <button
                    onClick={() => addItem(product, {
                      quantity: activeBundle.paidQty,
                      attributes: [
                        { key: '_bundle_title', value: activeBundle.title },
                        { key: '_bundle_paid_qty', value: activeBundle.paidQty.toString() },
                        { key: '_bundle_original_price', value: activeBundle.originalPrice.toString() }
                      ]
                    })}
                    className="w-full bg-pink-500 text-white cursor-pointer py-5 rounded-full font-semibold text-lg uppercase tracking-wide shadow-xl hover:bg-pink-600 hover:shadow-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-3"
                  >
                    <FaShoppingBag /> Add To Cart
                  </button>

                  <div className="flex justify-center gap-4 text-4xl transition-all">
                    <FaCcVisa className="text-[#1A1F71]" /> <FaCcMastercard className="text-[#EB001B]" /> <FaCcAmex className="text-[#007BC1]" />
                  </div>

                  {/* Collapsible Sections */}
                  <div className="mt-8 space-y-1 pt-6">
                    {[
                      {
                        id: 'how-it-works',
                        title: 'How it works',
                        content: (
                          <div className="space-y-4 text-stone-600 text-sm leading-relaxed pb-4">
                            <div>
                              <p className="font-bold text-stone-900 mb-1">Step 1: Apply and Relax</p>
                              <p>Start with clean, dry skin, then place the MicroGlow Patches on your face, ensuring it fits smoothly against your skin.</p>
                            </div>
                            <div>
                              <p className="font-bold text-stone-900 mb-1">Step 2: Let It Absorb</p>
                              <p>Wear the mask for 2 hours minimum for you skin to full absorb the ingredients for it to work, delivering the nutrients your skin craves.</p>
                            </div>
                            <div>
                              <p className="font-bold text-stone-900 mb-1">Step 3: Remove and Glow</p>
                              <p>Gently peel off the patches and massage any remaining serum into your skin for a quick hydration boost and a radiant finish.</p>
                            </div>
                            <div className="pt-2">
                              <p className="font-black text-pink-600 uppercase tracking-wider">FOR BEST RESULTS, USE IT AS OVERNIGHT.</p>
                              <p className="font-black text-pink-600 uppercase tracking-wider">USE 1-2 A WEEK!</p>
                            </div>
                          </div>
                        )
                      },
                      {
                        id: 'guarantee',
                        title: 'Our Guarantee',
                        content: (
                          <div className="text-stone-600 text-sm leading-relaxed pb-4 space-y-3">
                            <p>If you're not 100% satisfied within the first 60 days, just send it back to us and we'll give you a full refund.</p>
                            <p>No need to worry about the return shipping - we've got you covered!</p>
                          </div>
                        )
                      },
                      {
                        id: 'shipping',
                        title: 'Shipping Info',
                        content: (
                          <div className="text-stone-600 text-sm leading-relaxed pb-4 space-y-3">
                            <p>We offer fast and reliable shipping on all orders. You can expect to receive it within 7-14 business days based on your location.</p>
                            <p>Please contact our customer service team for assistance if you have any questions or concerns about your shipment.</p>
                          </div>
                        )
                      },
                      {
                        id: 'ingredients',
                        title: 'Ingredients',
                        content: (
                          <div className="text-stone-600 text-sm italic leading-relaxed pb-4">
                            <p><span className="font-bold not-italic">Ingredients:</span> retinol, hyaluronic acid, acetyl tripeptide -1, collagen, ascorbic acid (vitamin C), niacinamide</p>
                          </div>
                        )
                      }
                    ].map((section) => (
                      <div key={section.id} className="border-b border-black">
                        <button
                          onClick={() => setOpenSection(openSection === section.id ? null : section.id)}
                          className="w-full py-4 flex items-center justify-between text-left group cursor-pointer"
                        >
                          <span className="text-sm font-bold text-stone-900 group-hover:text-pink-500 transition-colors uppercase tracking-widest">{section.title}</span>
                          <div className={`transition-transform duration-300 ${openSection === section.id ? 'rotate-180' : ''}`}>
                            <FaChevronDown className={`text-xs ${openSection === section.id ? 'text-pink-500' : 'text-stone-400'}`} />
                          </div>
                        </button>
                        <div
                          className={`overflow-hidden transition-all duration-300 ease-in-out ${openSection === section.id ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                          {section.content}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* CATCHY FULL-WIDTH RITUAL SECTION */}
          <section className="mt-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Decorative background orbs */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-pink-100/40 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-stone-100 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2" />

              <div className="bg-white border border-stone-100 rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.03)] px-6 py-16 md:py-24 md:px-12 relative">
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-16 relative">
                    <span className="text-pink-500 font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">The NovaLift Experience</span>
                    <h2 className="text-4xl md:text-6xl font-serif font-bold text-stone-900 mb-6 italic">Product Description</h2>
                    <div className="flex justify-center items-center gap-4">
                      <div className="h-px w-12 bg-pink-200" />
                      <span className="text-2xl animate-bounce">✨</span>
                      <div className="h-px w-12 bg-pink-200" />
                    </div>
                  </div>

                  <div className="prose prose-lg prose-pink mx-auto">
                    <div
                      dangerouslySetInnerHTML={{ __html: product.description }}
                      className="text-stone-700 leading-relaxed text-lg md:text-xl text-center italic font-light font-serif px-4"
                    />
                  </div>

                  <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-stone-50 pt-16">
                    <div className="flex flex-col items-center text-center space-y-4 group">
                      <div className="w-16 h-16 rounded-2xl bg-pink-500 text-white flex items-center justify-center group-hover:bg-pink-500 group-hover:text-white transition-all duration-500 shadow-sm border border-pink-100">
                        <FaMagic className="text-xl" />
                      </div>
                      <h4 className="font-serif font-bold text-xl text-stone-900">Korean Tech</h4>
                      <p className="text-stone-400 text-sm leading-relaxed">Advanced PDRN collagen formulation for deep penetration.</p>
                    </div>

                    <div className="flex flex-col items-center text-center space-y-4 group">
                      <div className="w-16 h-16 rounded-2xl bg-pink-500 text-white flex items-center justify-center group-hover:bg-pink-500 group-hover:text-white transition-all duration-500 shadow-sm border border-pink-100">
                        <FaClock className="text-xl" />
                      </div>
                      <h4 className="font-serif font-bold text-xl text-stone-900">Instant Lift</h4>
                      <p className="text-stone-400 text-sm leading-relaxed">See noticeable results and a brighter glow in just 15 minutes.</p>
                    </div>

                    <div className="flex flex-col items-center text-center space-y-4 group">
                      <div className="w-16 h-16 rounded-2xl bg-pink-500 text-white flex items-center justify-center bg-pink-500 group-hover:text-white transition-all duration-500 shadow-sm border border-pink-100">
                        <FaLeaf className="text-xl" />
                      </div>
                      <h4 className="font-serif font-bold text-xl text-stone-900">Clean Beauty</h4>
                      <p className="text-stone-400 text-sm leading-relaxed">100% gentle, non-irritating, and perfect for the eye area.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* IMAGE + TEXT SECTION 1 - Before Clinical Results */}
          <section className="py-16 md:py-10 mt-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left: Image */}
                <div className="relative group">
                  <div className="absolute -inset-4 bg-pink-100 rounded-lg blur-2xl opacity-30 group-hover:opacity-50 transition-opacity" />
                  <img
                    src={GifOne}
                    alt="Eye Patch Application"
                    className="relative w-full h-auto rounded-lg shadow-xl"
                  />
                </div>

                {/* Right: Content */}
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-5xl font-serif font-semibold text-gray-900 leading-tight">
                    Your Secret to <span className="font-serif text-transparent bg-clip-text bg-linear-to-r from-pink-400 to-purple-400 italic">Younger Eyes</span>
                  </h2>
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                    Tired of looking in the mirror and seeing dark circles, eye bags, and wrinkles?
                  </p>
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                    Transform your rapidly aging eyes into your <span className="font-bold text-gray-900">most radiant feature.</span> Our patches deliver powerful ingredients directly where needed, you'll <span className="font-bold text-gray-900">enjoy brighter, smoother,</span> and younger-looking stunning eyes every day.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CLINICAL RESULTS SECTION */}
          <section className="mt-10 relative overflow-hidden">
            <div className="bg-pink-50 py-16 md:py-10 relative">
              {/* Before/After Image - Full Width */}
              <div className="mb-12 overflow-hidden">
                <img
                  src={LeftRightImage}
                  alt="Before and After Results"
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Statistics Grid - Contained */}
              <div className="px-6 md:px-12">
                <div className="max-w-5xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
                    <div className="text-center space-y-4">
                      <h3 className="text-6xl md:text-7xl font-serif font-light italic text-pink-500 mb-2">95%</h3>
                      <p className="text-sm md:text-base font-semibold text-gray-900 leading-relaxed px-2">
                        Saw significant improvement in eye appearance within 4 weeks
                      </p>
                    </div>

                    <div className="text-center space-y-4">
                      <h3 className="text-6xl md:text-7xl font-serif font-light italic text-pink-500 mb-2">92%</h3>
                      <p className="text-sm md:text-base font-semibold text-gray-900 leading-relaxed px-2">
                        Saw a noticeable reduction in under eye bags in 2 weeks
                      </p>
                    </div>

                    <div className="text-center space-y-4">
                      <h3 className="text-6xl md:text-7xl font-serif font-light italic text-pink-500 mb-2">97%</h3>
                      <p className="text-sm md:text-base font-semibold text-gray-900 leading-relaxed px-2">
                        Said it was better than any other eye cream they had tried before
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* IMAGE + TEXT SECTION 2 - After Clinical Results */}
          <section className="py-16 md:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left: Content */}
                <div className="space-y-6 order-2 lg:order-1">
                  <h2 className="text-3xl md:text-5xl font-serif font-semibold text-gray-900 leading-tight">
                    Experience the <span className="font-serif text-transparent bg-clip-text bg-linear-to-r from-pink-400 to-purple-400 italic">Transformation</span>
                  </h2>
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                    Say goodbye to tired, puffy eyes and hello to a refreshed, youthful appearance.
                  </p>
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                    Our advanced <span className="font-bold text-gray-900">PDRN collagen technology</span> works deep beneath the surface to deliver <span className="font-bold text-gray-900">instant hydration</span> and long-lasting results. Feel confident knowing you're using a product that truly works.
                  </p>
                </div>

                {/* Right: Image */}
                <div className="relative group order-1 lg:order-2">
                  <div className="absolute -inset-4 bg-pink-100 rounded-lg blur-2xl opacity-30 group-hover:opacity-50 transition-opacity" />
                  <img
                    src={GifTwo}
                    alt="Beautiful Eyes Result"
                    className="relative w-full h-auto rounded-lg shadow-xl"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* IMAGE + TEXT SECTION 3 - After Clinical Results */}
          <section className="py-16 md:py-20 bg-pink-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left: Image */}
                <div className="relative group">
                  <div className="absolute -inset-4 bg-pink-100 rounded-lg blur-2xl opacity-30 group-hover:opacity-50 transition-opacity" />
                  <img
                    src={GifThree}
                    alt="Daily Eye Care Routine"
                    className="relative w-full h-auto rounded-lg shadow-xl"
                  />
                </div>

                {/* Right: Content */}
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-5xl font-serif font-semibold text-gray-900 leading-tight">
                    Make It Part of Your <span className="font-serif text-transparent bg-clip-text bg-linear-to-r from-pink-400 to-purple-400 italic">Daily Ritual</span>
                  </h2>
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                    Just 15-20 minutes, 2-3 times per week is all it takes to see visible improvements.
                  </p>
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                    Unlike messy creams that sit on the surface, our <span className="font-bold text-gray-900">microneedle patches</span> penetrate deep into your skin for <span className="font-bold text-gray-900">maximum effectiveness.</span> Join thousands of satisfied customers who've made the switch to smarter skincare.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* WHY CHOOSE NOVALIFT SECTION */}
          <section className="py-14 overflow-hidden mt-5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

                {/* Left Side: The "Versus" Card */}
                <div className="lg:col-span-7 relative">
                  {/* Decorative Background Blur */}
                  <div className="absolute -top-10 -left-10 w-64 h-64 bg-pink-100 rounded-full blur-3xl opacity-70" />

                  <div className="relative bg-white border border-stone-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[1rem] overflow-hidden">
                    <div className="grid grid-cols-2">

                      {/* Brand Column */}
                      <div className="bg-gradient-to-b from-pink-50 to-pink-100 p-8 md:p-12 border-r border-stone-100">
                        <div className="text-center mb-10">
                          <h3 className="text-2xl md:text-3xl font-black text-pink-500 tracking-tighter font-serif text-transparent bg-clip-text bg-linear-to-b from-pink-400 to-purple-400 italic">
                            <span className='text-5xl font-bold'>L</span>orena
                          </h3>
                        </div>

                        <div className="relative group mb-12">
                          <div className="absolute inset-0 bg-pink-200 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
                          <img
                            src={productImg}
                            alt="Nova Lift Product"
                            className="relative w-full h-48 object-contain transform group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>

                        <div className="space-y-8">
                          {[
                            "Clean, safe and natural formula",
                            "Ingredients penetrate deep",
                            "Proven to solve the problem"
                          ].map((text, i) => (
                            <div key={i} className="flex flex-col items-center text-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-green-500 shadow-lg shadow-green-200 flex items-center justify-center text-white text-sm">
                                <FaCheck />
                              </div>
                              <p className="text-xs md:text-sm font-bold text-stone-800 leading-tight">{text}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Others Column */}
                      <div className="bg-stone-50/50 p-8 md:p-12">
                        <div className="text-center mb-10">
                          <h4 className="text-2xl md:text-3xl font-black text-black tracking-tighter font-serif italic mt-4">Others</h4>
                        </div>

                        <div className="mb-12 flex justify-center opacity-40 grayscale">
                          <div className="w-full h-48 flex items-center justify-center bg-stone-100 rounded-2xl border-2 border-dashed border-stone-300">
                            <span className="text-6xl text-stone-400">🧴</span>
                          </div>
                        </div>

                        <div className="space-y-8">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="flex flex-col items-center text-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center text-stone-400 text-sm">
                                <FaTimes />
                              </div>
                              <div className="h-4 w-16 bg-stone-200 rounded animate-pulse" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side: Copywriting */}
                <div className="lg:col-span-5 space-y-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50 text-pink-600 font-bold text-sm tracking-wide uppercase">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
                    </span>
                    The Smarter Choice
                  </div>

                  <h2 className="text-3xl md:text-5xl font-serif font-semibold text-gray-900 leading-tight">
                    Why The <span className="font-serif text-transparent bg-clip-text bg-linear-to-r from-pink-400 to-purple-400 italic">Lorena</span> MicroGlow?
                  </h2>

                  <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
                    Don't waste another penny on cheap, ineffective creams that only hide the problem.
                    Enjoy smooth, radiant eyes with our <span className="font-bold text-gray-900">superior MicroGlow</span> which solves the deep-rooted problem.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 30 DAY MONEY BACK GUARANTEE */}
          <section className="relative overflow-hidden">
            <div className="bg-pink-50 py-12 md:py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                  <h2 className="text-3xl md:text-5xl font-serif font-semibold text-gray-900 mb-4">
                    30 Day Money Back
                  </h2>
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                    We stand by our products with a 30-day, risk-free guarantee. If you're not completely thrilled with your order, simply return it for a full refund (no questions asked).
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* RELATED PRODUCTS */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mt-12 pt-12 border-t border-stone-100">
              <div className="text-center mb-16">
                <h2 className="font-serif text-transparent bg-clip-text bg-linear-to-r from-pink-400 to-purple-400 italic text-3xl md:text-6xl">Complete the Ritual</h2>
                <p className="font-serif italic text-sm md:text-lg">Recommended for you</p>
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
          </div>
        </main>
      </div>

      {
        showScrollTop && (
          <button
            type="button"
            onClick={handleScrollToTop}
            aria-label="Back to top"
            className="fixed  cursor-pointer bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-pink-500 text-white flex items-center justify-center shadow-[0_15px_35px_rgba(0,0,0,0.45)] border-2 border-pink-300 hover:bg-pink-500 hover:border-pink-500 transition-colors duration-300"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 18V6"
                stroke="white"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
              <path
                d="M7 10.5L12 5.5L17 10.5"
                stroke="white"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )
      }
    </>
  );
};

export default ProductDetail;