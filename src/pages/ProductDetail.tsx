import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { FaStar, FaCheck, FaMagic, FaClock, FaLeaf, FaFlask, FaShoppingBag, FaRegCircle, FaDotCircle, FaChevronDown, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { fetchShopifyProductById, fetchShopifyProducts } from '../utils/shopify';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/price';
import GifOne from '../assets/gifOne.gif'
import GifTwo from '../assets/gifTwo.gif'
import GifThree from '../assets/gifThree.gif'
import LeftRightImage from '../assets/leftrightimages.jpeg'
import SecondIdGifOne from '../assets/SecondIdGif.gif'
import SecondIdGifTwo from '../assets/SecondIdGif2.gif'
import SecondIdGifThree from '../assets/SecondIdGif3.gif'
import CompareImg from '../assets/compare.png';


const ProductDetail = () => {
  const { id } = useParams<{ id: any }>();
  const [product, setProduct] = useState<any>(null);
  const [_relatedProducts, setRelatedProducts] = useState<any[]>([]); ``
  const [loading, setLoading] = useState(true);
  const [_error, setError] = useState<string | null>(null);
  const { addItem } = useCart();
  const [selectedBundle, setSelectedBundle] = useState({ id: 2 }); // Default to Most Popular
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const touchStartXRef = useRef<number | null>(null);

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
          setActiveImageIndex(0);
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

  // Image slider setup
  const imageList: string[] =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];

  const totalSlides = imageList.length || 1;

  const goToNextImage = () => {
    if (totalSlides <= 1) return;
    setActiveImageIndex((prev) => (prev + 1) % totalSlides);
  };

  const goToPrevImage = () => {
    if (totalSlides <= 1) return;
    setActiveImageIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleTouchStart = (e: any) => {
    if (!e.touches || e.touches.length === 0) return;
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: any) => {
    if (touchStartXRef.current == null || !e.changedTouches || e.changedTouches.length === 0) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    const threshold = 40;

    if (deltaX > threshold) {
      goToPrevImage();
    } else if (deltaX < -threshold) {
      goToNextImage();
    }

    touchStartXRef.current = null;
  };

  const currentImage = imageList[((activeImageIndex % totalSlides) + totalSlides) % totalSlides];

  // Map bundles to Shopify variants
  // Variant indices: 0 = Buy 1, 1 = Buy 2 Get 1, 2 = Buy 3 Get 2
  const variants = product.variants || [];
  const bundleConfigs = [
    { id: 1, name: 'Essentials Pack', quantity: 1, paidQty: 1, save: 0, label: 'Starter', desc: 'Single Treatment', title: "Buy 1 Box", subTitle: "Contains 8 Pairs" },
    { id: 2, name: 'Radiance Bundle', quantity: 3, paidQty: 2, save: 33, label: 'Best Seller', desc: 'Double the Glow', title: "Buy 2 Get 1 FREE", subTitle: "Contains 24 Pairs", badge: "Most Popular" },
    { id: 3, name: 'The Ultimate Ritual', quantity: 5, paidQty: 3, save: 40, label: 'Best Value', desc: '6 Month Transformation', title: "Buy 3 Get 2 FREE", subTitle: "Contains 40 Pairs" },
  ];

  const currentBundles = bundleConfigs.map((config, index) => {
    const variant = variants[index];
    if (!variant) {
      // Fallback to calculated prices if variant not available
      const basePrice = product.price || 0;
      return {
        ...config,
        variantId: product.variantId,
        price: index === 0 ? basePrice : index === 1 ? basePrice * 2 : basePrice * 3,
        originalPrice: index === 0 ? basePrice : index === 1 ? basePrice * 3 : basePrice * 5,
      };
    }

    const variantPrice = variant.price || 0;
    const compareAtPrice = variant.compareAtPrice;

    return {
      ...config,
      variantId: variant.id,
      price: variantPrice,
      originalPrice: compareAtPrice || variantPrice,
    };
  });

  const activeBundle = currentBundles.find(b => b.id === selectedBundle.id) || currentBundles[1];


  return (
    <>
      <div className="mt-5 min-h-screen bg-[#FCFAF8] text-stone-800 selection:bg-pink-100">
        <main className="pb-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

              {/* LEFT: Gallery (Sticky) */}
              <div className="lg:col-span-7 space-y-6 lg:top-8 self-start">
                <div
                  className="relative h-[320px] sm:h-[360px] lg:h-[500px] w-full rounded-3xl bg-white overflow-hidden shadow-sm border border-stone-100"
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
                  <img
                    src={currentImage}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                  />

                  {/* Top badge */}
                  <div className="absolute top-6 left-6 bg-white/80 backdrop-blur-md px-5 py-2 rounded-full text-[10px] font-black tracking-widest uppercase border border-white/20 shadow-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-pulse" />
                    Trending Now
                  </div>

                  {/* Left/Right navigation arrows */}
                  {totalSlides > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={goToPrevImage}
                        aria-label="Previous image"
                        className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 bg-white/85 hover:bg-white rounded-full w-9 h-9 sm:w-10 sm:h-10 shadow-md border border-stone-100 flex items-center justify-center text-stone-700 hover:text-pink-500 cursor-pointer transition-colors"
                      >
                        <FaChevronLeft className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={goToNextImage}
                        aria-label="Next image"
                        className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 bg-white/85 hover:bg-white rounded-full w-9 h-9 sm:w-10 sm:h-10 shadow-md border border-stone-100 flex items-center justify-center text-stone-700 hover:text-pink-500 cursor-pointer transition-colors"
                      >
                        <FaChevronRight className="h-4 w-4" />
                      </button>
                    </>
                  )}
                </div>

                {/* Pagination dots */}
                <div className="flex justify-center gap-2 mt-1">
                  {imageList.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveImageIndex(i)}
                      className={`h-2.5 rounded-full transition-all ${i === activeImageIndex ? 'w-6 bg-pink-500' : 'w-2.5 bg-stone-300'}`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
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
                    {id === "8076385943615" ? (
                      <>
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
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-3">
                          <div className="bg-pink-500 text-white p-1.5 rounded-full"><FaMagic className="w-3 h-3" /></div> Targets eye bags & dark circles
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="bg-pink-500 text-white p-1.5 rounded-full"><FaFlask className="w-3 h-3" /></div> Deep serum infusion
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="bg-pink-500 text-white p-1.5 rounded-full"><FaClock className="w-3 h-3" /></div> Long-lasting hydration & smoothness
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="bg-pink-500 text-white p-1.5 rounded-full"><FaCheck className="w-3 h-3" /></div> Boosts firmness & elasticity
                        </div>
                      </>
                    )}
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
                    onClick={() => {
                      // Create product object with the correct variant ID
                      const productWithVariant = {
                        ...product,
                        variantId: activeBundle.variantId || product.variantId,
                      };
                      // For bundle variants, quantity 1 means one bundle;
                      // the discount (e.g. Buy 2 Get 1) is already baked into
                      // the Shopify variant price.
                      addItem(productWithVariant, {
                        quantity: 1,
                        attributes: [
                          { key: '_bundle_title', value: activeBundle.title },
                          { key: '_bundle_paid_qty', value: activeBundle.paidQty.toString() },
                          { key: '_bundle_original_price', value: activeBundle.originalPrice.toString() }
                        ]
                      });
                    }}
                    className="w-full bg-pink-500 text-white cursor-pointer py-5 rounded-full font-semibold text-lg uppercase tracking-wide shadow-xl hover:bg-pink-600 hover:shadow-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-3"
                  >
                    <FaShoppingBag /> Add To Cart
                  </button>

                  {/* <div className="flex flex-wrap justify-center gap-3">
                    <div className="bg-white border border-gray-200 rounded-md px-2 py-0.5 flex items-center shadow-sm h-8">
                      <span className="text-gray-900 font-bold flex items-center gap-1 text-xs">
                        <span className="text-lg"></span> Pay
                      </span>
                    </div>
                    <div className="bg-[#007BC1] rounded-md px-2 py-0.5 flex flex-col items-center justify-center shadow-sm h-8 w-12">
                      <span className="text-white font-bold text-[8px] leading-none uppercase italic">Am</span>
                      <span className="text-white font-bold text-[8px] leading-none uppercase italic">Ex</span>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-md px-1.5 py-0.5 flex flex-col items-center justify-center shadow-sm h-8 w-14">
                      <span className="text-[#E55C20] font-black text-[7px] uppercase tracking-tighter">Discover</span>
                      <div className="w-full h-px bg-[#E55C20] mt-0.5"></div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-md px-2 py-0.5 flex items-center shadow-sm h-8">
                      <div className="flex -space-x-1.5">
                        <div className="w-4 h-4 rounded-full bg-[#EB001B] opacity-90"></div>
                        <div className="w-4 h-4 rounded-full bg-[#F79E1B] opacity-90"></div>
                      </div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-md px-2 py-0.5 flex items-center shadow-sm h-8">
                      <span className="text-[#1A1F71] font-black italic text-sm tracking-tighter">VISA</span>
                    </div>
                  </div> */}

                  {/* Collapsible Sections */}
                  <div className="mt-8 space-y-1 pt-4">
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
                          className="w-full py-3 flex items-center justify-between text-left group cursor-pointer"
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
          <section className="relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Decorative background orbs */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-pink-100/40 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-stone-100 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2" />

              {/* <div className="bg-white border border-stone-100 rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.03)] px-6 py-16 md:py-24 md:px-12 relative">
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
                      <div className="w-16 h-16 rounded-2xl bg-pink-500 text-white flex items-center justify-center group-hover:text-white transition-all duration-500 shadow-sm border border-pink-100">
                        <FaLeaf className="text-xl" />
                      </div>
                      <h4 className="font-serif font-bold text-xl text-stone-900">Clean Beauty</h4>
                      <p className="text-stone-400 text-sm leading-relaxed">100% gentle, non-irritating, and perfect for the eye area.</p>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </section>

          {/* IMAGE + TEXT SECTION 1 - Before Clinical Results */}
          <section className="py-16 md:py-10 mt-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left: Image */}
                <div className="relative group">
                  <div className="absolute -inset-4 bg-pink-100 rounded-lg blur-2xl opacity-30 group-hover:opacity-50 transition-opacity" />
                  {id === "8076385943615" ? (
                    <img
                      src={SecondIdGifOne}
                      alt="PDRN Collagen Application"
                      className="relative w-full h-auto rounded-lg shadow-xl"
                    />
                  ) : (
                    <img
                      src={GifOne}
                      alt="Microneedle Patch Application"
                      className="relative w-full h-auto rounded-lg shadow-xl"
                    />
                  )}
                </div>

                {/* Right: Content */}
                <div className="space-y-6">
                  {id === "8076385943615" ? (
                    <>
                      <h2 className="text-3xl md:text-5xl font-serif font-semibold text-gray-900 leading-tight">
                        The Power of <span className="font-serif text-transparent bg-clip-text bg-linear-to-r from-pink-400 to-purple-400 italic">Liquid Collagen</span>
                      </h2>
                      <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                        Say goodbye to puffy, dehydrated eyes with our unique hydrogel technology.
                      </p>
                      <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                        The <span className="font-bold text-gray-900">InstaLift PDRN patches</span> are saturated with
                        premium collagen to deeply hydrate. They soothe on contact, instantly cooling
                        delicate skin while <span className="font-bold text-gray-900">erasing signs of fatigue</span> and late nights.
                      </p>
                    </>
                  ) : (
                    <>
                      <h2 className="text-3xl md:text-5xl font-serif font-semibold text-gray-900 leading-tight">
                        Deep Delivery <span className="font-serif text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-400 italic">Microneedle Tech</span>
                      </h2>
                      <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                        Tired of creams that only sit on the surface and never solve the problem?
                      </p>
                      <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                        Our <span className="font-bold text-gray-900">Microneedle Patches</span> feature microscopic
                        painless needles that dissolve directly into your skin. They deliver
                        active ingredients <span className="font-bold text-gray-900">deeper than any cream</span>,
                        targeting the root cause of dark circles and fine lines.
                      </p>
                    </>
                  )}
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
                  <div className="flex md:grid md:grid-cols-3 gap-8 md:gap-16 overflow-x-auto no-scrollbar pb-2">
                    <div className="text-center space-y-4 shrink-0 min-w-[220px]">
                      <h3 className="text-6xl md:text-7xl font-serif font-light italic text-pink-500 mb-2">95%</h3>
                      <p className="text-sm md:text-base font-semibold text-gray-900 leading-relaxed px-2">
                        Saw significant improvement in eye appearance within 4 weeks
                      </p>
                    </div>

                    <div className="text-center space-y-4 shrink-0 min-w-[220px]">
                      <h3 className="text-6xl md:text-7xl font-serif font-light italic text-pink-500 mb-2">92%</h3>
                      <p className="text-sm md:text-base font-semibold text-gray-900 leading-relaxed px-2">
                        Saw a noticeable reduction in under eye bags in 2 weeks
                      </p>
                    </div>

                    <div className="text-center space-y-4 shrink-0 min-w-[220px]">
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
                  {id === "8076385943615" ? (
                    <>
                      <h2 className="text-3xl md:text-5xl font-serif font-semibold text-gray-900 leading-tight">
                        Refine & <span className="font-serif text-transparent bg-clip-text bg-linear-to-r from-pink-400 to-purple-400 italic">Intensify Glow</span>
                      </h2>
                      <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                        Restore the natural elasticity of your undereye area with pure PDRN.
                      </p>
                      <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                        Our advanced <span className="font-bold text-gray-900">PDRN Collagen tech</span> works
                        to thicken the delicate skin barrier. With regular use, your eyes will look
                        <span className="font-bold text-gray-900"> smoother, brighter, </span> and significantly
                        more rested—no matter how much sleep you actually got.
                      </p>
                    </>
                  ) : (
                    <>
                      <h2 className="text-3xl md:text-5xl font-serif font-semibold text-gray-900 leading-tight">
                        Repair & <span className="font-serif text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-400 italic">Rejuvenate</span>
                      </h2>
                      <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                        Watch as stubborn fine lines and wrinkles physically soften over time.
                      </p>
                      <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                        The <span className="font-bold text-gray-900">Lorena Care Microneedles</span> trigger
                        the skin's natural repair process. This concentrated delivery system ensures
                        your sensitive eye area receives <span className="font-bold text-gray-900">maximum nutrition</span>
                        for long-lasting, transformative results.
                      </p>
                    </>
                  )}
                </div>

                {/* Right: Image */}
                <div className="relative group order-1 lg:order-2">
                  <div className="absolute -inset-4 bg-pink-100 rounded-lg blur-2xl opacity-30 group-hover:opacity-50 transition-opacity" />
                  {id === '8076385943615' ? (
                    <img
                      src={SecondIdGifTwo}
                      alt="PDRN Collagen Result"
                      className="relative w-full h-auto rounded-lg shadow-xl"
                    />
                  ) : (
                    <img
                      src={GifTwo}
                      alt="Microneedle Result"
                      className="relative w-full h-auto rounded-lg shadow-xl"
                    />
                  )}
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
                  {id === '8076385943615' ? (
                    <img
                      src={SecondIdGifThree}
                      alt="PDRN Care Routine"
                      className="relative w-full h-auto rounded-lg shadow-xl"
                    />
                  ) : (
                    <img
                      src={GifThree}
                      alt="Microneedle Care Routine"
                      className="relative w-full h-auto rounded-lg shadow-xl"
                    />
                  )}
                </div>

                {/* Right: Content */}
                <div className="space-y-6">
                  {id === "8076385943615" ? (
                    <>
                      <h2 className="text-3xl md:text-5xl font-serif font-semibold text-gray-900 leading-tight">
                        Your Daily <span className="font-serif text-transparent bg-clip-text bg-linear-to-r from-pink-400 to-purple-400 italic">Spa Ritual</span>
                      </h2>
                      <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                        Effortless and mess-free. Perfect for your morning coffee or evening wind-down.
                      </p>
                      <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                        Unlike creams that rub off, our <span className="font-bold text-gray-900">Hydrogel Patches</span>
                        grip the skin perfectly, allowing for <span className="font-bold text-gray-900">maximum absorption</span>
                        while you go about your day. Professional eye care, simplified for your home.
                      </p>
                    </>
                  ) : (
                    <>
                      <h2 className="text-3xl md:text-5xl font-serif font-semibold text-gray-900 leading-tight">
                        The Ultimate <span className="font-serif text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-400 italic">Precision Tool</span>
                      </h2>
                      <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                        Intensive treatment that fits seamlessly into your weekly maintenance.
                      </p>
                      <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                        Our <span className="font-bold text-gray-900">Precision Microneedles</span> ensure that
                        every drop of active ingredient is used efficiently. Join the thousands of
                        customers who have switched to the <span className="font-bold text-gray-900">smarter, more effective</span>
                        way to maintain youthful eyes.
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* WHY CHOOSE NOVALIFT SECTION */}
          <section className="py-14 overflow-hidden mt-5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                {/* Right Side: Copywriting */}
                <div className="lg:col-span-5 space-y-8">

                  <h2 className="text-3xl md:text-5xl font-serif font-semibold text-gray-900 leading-tight">
                    Why Chose <span className="font-serif text-transparent bg-clip-text bg-linear-to-r from-pink-400 to-purple-400 italic">Lorena</span> {id === "8076385943615" ? "InstaLift" : "Precision"}?
                  </h2>

                  <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
                    {id === "8076385943615"
                      ? "Don't settle for creams that evaporate before they work. Enjoy lasting hydration with the InstaLift PDRN ritual."
                      : "Don't waste another penny on cheap, ineffective creams that only hide the problem. Enjoy the deep-rooted repair you deserve."
                    }
                  </p>
                </div>
                {/* Left Side: Static comparison image */}
                <div className="lg:col-span-7 relative">
                  {/* Decorative Background Blur */}
                  <div className="absolute -top-10 -left-10 w-64 h-64 bg-pink-100 rounded-full blur-3xl opacity-70" />

                  <div className="relative bg-white border border-stone-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-2xl overflow-hidden flex items-center justify-center">
                    <img
                      src={CompareImg}
                      alt="Comparison chart"
                      className="w-full h-auto object-contain"
                    />
                  </div>
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
          {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          </div> */}
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