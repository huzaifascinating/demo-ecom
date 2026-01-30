import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaCheckCircle, FaStar, FaQuoteLeft, FaQuestionCircle, FaTimes, FaMagic, FaArrowRight } from 'react-icons/fa';
import { Carousel, Collapse } from 'antd';
import productImage from '../assets/imageOne.png';
import beforeImage from '../assets/before.jpeg';
import afterImage from '../assets/after.jpeg';
import girlImage from '../assets/girlImage.png';
import { Modal } from 'antd'

const Home = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  // const BEAUTY_IMG = "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1887&auto=format&fit=crop";
  useEffect(() => {
    // Check if user has seen offer
    const hasSeenOffer = sessionStorage.getItem('hasSeenOffer');
    if (!hasSeenOffer) {
      // Small delay for better UX
      const timer = setTimeout(() => {
        setIsOfferModalOpen(true);
        sessionStorage.setItem('hasSeenOffer', 'true');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

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


  return (
    <div className="space-y-0">

      {/* SECTION 1: Main Product Highlight */}
      <section className="bg-white py-16 lg:py-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 relative group max-w-sm sm:max-w-md lg:max-w-lg mx-auto lg:mx-0 lg:mr-auto">
              {/* Stacked Frames Effect */}
              {/* Stacked Frames Effect */}
              <div className="absolute inset-0 bg-white border border-gray-200 rounded-3xl transform -rotate-12 scale-100 shadow-lg z-0 transition-transform duration-500 group-hover:-rotate-18 group-hover:scale-105"></div>
              <div className="absolute inset-0 bg-white border border-gray-200 rounded-3xl transform rotate-6 scale-100 shadow-lg z-0 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-105"></div>

              <div className="relative z-10 bg-white rounded-3xl overflow-hidden aspect-square border border-gray-100 h-72 sm:h-80 md:h-96 shadow-2xl">
                <img
                  src={productImage}
                  alt="Lift PDRN Collagen Eye Patches"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm">
                  <div className="flex text-yellow-500 text-sm">
                    {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                  </div>
                  <div className="text-xs font-bold text-gray-900 mt-1">4.9/5 RATING</div>
                </div>
              </div>
            </div>
            {/* Left: Copy & CTR */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center space-x-2 text-yellow-500 mb-4">
                <div className="flex text-lg">
                  <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
                </div>
                <span className="text-gray-900 font-medium text-sm ml-2">Rated 4.9 / 5 | Loved By 80,000+</span>
              </div>

              <h1 className="text-3xl lg:text-5xl font-serif font-medium text-gray-900 leading-tight">
                The <span className="font-medium font-serif text-transparent bg-clip-text bg-linear-to-r from-pink-400 to-purple-400">#1 Natural Solution</span> for
                <span className="italic"> brighter, smoother under-eyes</span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Clinically proven PDRN Collagen formula infused with <span className="font-bold text-gray-900">Advanced Hydration Technology</span> to lift, firm, and rejuvenate your delicate eye area instantly.
              </p>

              <div className="pt-4 flex flex-col items-start space-y-4">
                <Link to="/product/2" className="group flex items-center justify-center gap-3 bg-linear-to-tr from-pink-500 to-purple-400 text-white text-xl font-bold py-5 px-16 rounded-full hover:bg-gray-800 hover:scale-102 transition-all shadow-xl hover:shadow-2xl uppercase tracking-wider w-full sm:w-auto text-center">
                  Get Yours <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <div className="flex items-center text-gray-500 text-sm font-medium">
                  <FaCheckCircle className="mr-2" /> 30-day money back guarantee
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Carousel Hero / Visual Impact */}
      <section className="relative h-[600px] overflow-hidden">
        {/* Antd Carousel Background */}
        <div className="absolute inset-0 z-0">
          <Carousel autoplay effect="fade" speed={1000} autoplaySpeed={3000}>
            {[
              'https://picsum.photos/seed/purple_kitchen/1920/1080',
              'https://picsum.photos/seed/pink_glow/1920/1080',
              'https://picsum.photos/seed/stone_luxury/1920/1080'
            ].map((img, idx) => (
              <div key={idx} className="h-[600px]">
                <img src={img} alt="Hero Slide" className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent"></div>
              </div>
            ))}
          </Carousel>
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <div className="text-center max-w-4xl mx-auto px-4 pointer-events-auto">
            <span className="text-pink-300 font-bold tracking-[0.2em] uppercase mb-4 block animate-pulse">Upgrade Your Under-Eyes</span>
            <h2 className="text-5xl md:text-8xl font-black text-white mb-8 drop-shadow-2xl">
              MODERN <br />
              <span className="italic font-serif text-transparent bg-clip-text bg-linear-to-r from-pink-400 to-purple-400">LUXURY</span>
            </h2>
            <Link to="/product/2" className="inline-block bg-white text-black font-black text-xl py-4 px-12 rounded-none hover:bg-pink-500 hover:text-white transition-colors duration-300 uppercase tracking-wider transform hover:-translate-y-1">
              Shop The Patches
            </Link>
          </div>
        </div>
      </section>

      {/* Social Proof / Numbers */}
      <section className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="p-4 group">
              <div className="text-5xl font-black text-pink-500 mb-2 group-hover:scale-110 transition-transform">100%</div>
              <p className="text-gray-400 uppercase tracking-widest text-xs">Visible Results</p>
            </div>
            <div className="p-4 group">
              <div className="text-5xl font-black text-purple-500 mb-2 group-hover:scale-110 transition-transform">15m</div>
              <p className="text-gray-400 uppercase tracking-widest text-xs">Instant Hydration Time</p>
            </div>
            <div className="p-4 group">
              <div className="text-5xl font-black text-pink-500 mb-2 group-hover:scale-110 transition-transform">50k+</div>
              <p className="text-gray-400 uppercase tracking-widest text-xs">Beautiful Eyes Upgraded</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: The Comparison (Why Switch) */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-semibold text-gray-900">Stop The Soggy Mess.</h2>
            <p className="mt-4 text-gray-700 text-base md:text-lg">Traditional eye creams are a temporary fix. Upgrade to the collagen age.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Old Way */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 opacity-60 grayscale hover:grayscale-0 transition-all">
              <h3 className="text-2xl font-bold text-gray-500 mb-6 flex items-center"><FaTimes className="mr-2 text-red-400" /> Cloth & Plastic Mats</h3>
              <ul className="space-y-4">
                <li className="flex items-center text-gray-500"><FaTimes className="mr-3 text-red-300" /> Stays wet for hours</li>
                <li className="flex items-center text-gray-500"><FaTimes className="mr-3 text-red-300" /> Grows mold and bacteria</li>
                <li className="flex items-center text-gray-500"><FaTimes className="mr-3 text-red-300" /> Smells bad after a week</li>
                <li className="flex items-center text-gray-500"><FaTimes className="mr-3 text-red-300" /> Needs constant washing</li>
              </ul>
            </div>

            {/* New Way */}
            <div className="bg-white p-8 rounded-3xl shadow-xl border-2 border-pink-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">WINNER</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center"><FaCheckCircle className="mr-2 text-pink-500" /> The Eye Patches</h3>
              <ul className="space-y-4">
                <li className="flex items-center text-gray-800 font-medium"><FaCheckCircle className="mr-3 text-pink-500" /> Visible results in 15 minutes</li>
                <li className="flex items-center text-gray-800 font-medium"><FaCheckCircle className="mr-3 text-pink-500" /> Deep Hydration & Anti-aging</li>
                <li className="flex items-center text-gray-800 font-medium"><FaCheckCircle className="mr-3 text-pink-500" /> Minimalist & Elegant</li>
                <li className="flex items-center text-gray-800 font-medium"><FaCheckCircle className="mr-3 text-pink-500" /> Long-lasting results</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: How It Works (Before & After Visuals) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-pink-500 font-bold tracking-[0.2em] uppercase text-xs mb-3">Explore our other products as well</p>
            <h2 className="text-3xl md:text-5xl font-serif font-semibold text-gray-900">The Magic of PDRN Collagen</h2>
            <p className="mt-4 text-gray-700 text-base md:text-lg">Advanced PDRN collagen formula works instantly to hydrate and plump your delicate under-eye area.</p>
          </div>

          <div className="relative mt-12 mb-8">
            {/* <div className="block md:block absolute -top-16 md:-top-40 left-1/2 -translate-x-1/2 w-64 md:w-[1200px] h-12 md:h-32 z-10 text-pink-300 opacity-40 md:opacity-20">
              <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="w-full h-full">
                <path d="M0 10 H95 M90 5 L100 10 L90 15" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </div> */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Before */}
              <div className="group relative overflow-hidden rounded-3xl aspect-square shadow-xl">
                <img
                  src={beforeImage}
                  alt="Before using the Lift PDRN Collagen Eye Patches"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <span className="inline-block px-4 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-black/80 text-pink-200">
                    Before
                  </span>
                  <p className="mt-3 text-sm md:text-base text-gray-100 max-w-xs">
                    Tired, puffy under-eyes with fine lines and dark circles.
                  </p>
                </div>
              </div>

              {/* After */}
              <div className="group relative overflow-hidden rounded-3xl aspect-square shadow-xl">
                <img
                  src={afterImage}
                  alt="After using the Lift PDRN Collagen Eye Patches"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-pink-900/70 via-black/10 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <span className="inline-block px-4 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-pink-500 text-white shadow-lg">
                    After
                  </span>
                  <p className="mt-3 text-sm md:text-base text-pink-50 max-w-xs">
                    Brighter, smoother under-eyes with deep hydration delivered through advanced PDRN collagen technology.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-center gap-3 text-sm text-gray-600">
            <span className="w-10 h-px bg-pink-300" />
            <span className="uppercase tracking-[0.25em] text-xs font-semibold text-pink-500">
              Real Before &amp; After
            </span>
            <span className="w-10 h-px bg-pink-300" />
          </div>
        </div>
      </section>

      {/* SECTION: Problem vs Solution + Before/After (Lift PDRN Collagen Eye Patches Version) */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-semibold text-gray-900 leading-tight">
              From <span className="font-serif text-transparent bg-clip-text bg-linear-to-r from-pink-400 to-purple-400 italic">Soggy</span> to Elevated
            </h2>
            <p className="mt-6 text-gray-700 text-lg md:text-xl leading-relaxed">
              Stop settling for temporary fixes. Swap messy creams for PDRN technology that actually transforms your skin.
            </p>
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 items-center">

            {/* Your Problem - The "Old Way" */}
            <div className="group relative overflow-hidden bg-white rounded-4xl p-8 lg:p-12 transition-all duration-500 hover:translate-y-[-4px] border border-gray-200 shadow-sm hover:shadow-md">
              <div className="relative z-10">
                <span className="inline-block px-4 py-1 rounded-full bg-gray-100 text-gray-500 text-xs font-bold uppercase tracking-widest mb-6 border border-gray-200">
                  The Old Way
                </span>
                <h3 className="text-2xl font-bold text-gray-400 mb-8 flex items-center gap-3">
                  <FaTimes className="text-gray-300" /> Frustrating Results
                </h3>
                <ul className="space-y-5">
                  {[
                    "Creams sit on the surface",
                    "Waking up puffy & tired",
                    "Sticky, messy application"
                  ].map((text, i) => (
                    <li key={i} className="flex gap-4 items-center text-gray-500 transition-colors">
                      <FaTimes className="text-gray-300 mt-0.5 shrink-0" />
                      <span className="text-base font-medium leading-tight">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 3D Arrow Divider */}
            <div className="flex lg:flex-col items-center justify-center gap-4 z-20">
              <div className="h-px w-12 lg:w-px lg:h-12 bg-pink-200/50" />
              <div className="relative group">
                <div className="w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center border border-pink-100 transition-transform duration-500 group-hover:rotate-90 z-10 relative">
                  <FaArrowRight className="text-xl text-pink-500" />
                </div>
                <div className="absolute inset-0 -z-10 blur-xl bg-pink-200/60 rounded-full animate-pulse" />
              </div>
              <div className="h-px w-12 lg:w-px lg:h-12 bg-pink-200/50" />
            </div>

            {/* Our Solution - The "Glow Up" */}
            <div className="group relative overflow-hidden bg-pink-50 rounded-4xl p-8 lg:p-12 transition-all duration-500 hover:translate-y-[-8px] border-2 border-pink-200 shadow-xl shadow-pink-100">
              <div className="relative z-10">
                <span className="inline-block px-4 py-1 rounded-full bg-pink-500 text-white text-xs font-bold uppercase tracking-widest mb-6 shadow-lg shadow-pink-500/20">
                  The Solution
                </span>
                <h3 className="text-3xl font-bold text-gray-900 mb-8 tracking-tight flex items-center gap-3">
                  <FaCheckCircle className="text-pink-500" /> PDRN Collagen Lift
                </h3>
                <ul className="space-y-6">
                  {[
                    { title: "Instant Hydration", desc: "Deep PDRN delivery in under 15 minutes." },
                    { title: "Visible Firming", desc: "Naturally rejuvenates and lifts the eye area." },
                    { title: "Elevated Ritual", desc: "Mess-free, luxurious application every time." }
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4 items-start group/item">
                      <div className="mt-1 shrink-0 bg-white rounded-full p-1 shadow-sm">
                        <FaCheckCircle className="text-pink-500 text-sm" />
                      </div>
                      <div>
                        <p className="text-gray-900 font-bold text-lg leading-tight group-hover:text-pink-600 transition-colors">{item.title}</p>
                        <p className="text-gray-600 text-sm mt-1">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Glowing Accent */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/40 blur-[60px] rounded-full pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-pink-200/20 blur-[60px] rounded-full pointer-events-none" />
            </div>

          </div>
        </div>
      </section>

      {/* SECTION: Numbers / Proof (Added to match reference image) */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-serif font-semibold text-gray-900">
              The Lift PDRN Collagen Eye Patches Work — The Numbers Prove It
            </h2>
            <p className="mt-4 text-gray-700 text-base md:text-lg">
              Real users, real results. See what Lift PDRN Collagen Eye Patches customers are experiencing at home.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16">
            {[
              {
                pct: 95,
                title: 'Saw visible improvement in under-eye area in under 15 minutes',
                desc: 'Agreed the Lift PDRN Collagen Eye Patches delivered hydration dramatically faster than traditional eye creams'
              },
              {
                pct: 91,
                title: 'Noticed less puffiness and dark circles around the eyes',
                desc: 'Reported fewer fine lines and less visible signs of aging on their under-eye area'
              },
              {
                pct: 89,
                title: 'Would recommend the Lift PDRN Collagen Eye Patches to a friend',
                desc: 'Said it made their sink area look cleaner, tidier, and more premium'
              },
              {
                pct: 93,
                title: 'Reduced the need for multiple eye creams and serums',
                desc: 'Found they were using fewer products and achieving better results with just the patches'
              }
            ].map((s) => (
              <div key={`${s.pct}-${s.title}`} className="flex flex-col h-full">
                <div className="text-6xl md:text-7xl font-serif font-light italic text-pink-500 mb-4">{s.pct}%</div>
                <div className="text-lg font-semibold text-gray-900 mb-2">{s.title}</div>
                <div className="text-gray-600 mb-8 grow leading-relaxed">{s.desc}</div>

                <div className="w-full bg-pink-50 rounded-full h-1.5">
                  <div
                    className="bg-pink-500 h-1.5 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${s.pct}%` }}
                    aria-hidden="true"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Catchy FAQ Section (Enhanced) */}
      <section className="py-24 bg-pink-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="absolute -top-10 -left-10 text-9xl text-pink-100 opacity-50 rotate-12 pointer-events-none"><FaQuestionCircle /></div>
          <div className="text-center mb-12 relative z-10">
            <h2 className="text-3xl md:text-5xl font-serif font-semibold text-gray-900">Got Questions?</h2>
            <p className="mt-4 text-gray-700 text-base md:text-lg">We've got the answers.</p>
          </div>

          <div className="space-y-6 relative z-10">
            {[
              { q: "How do I use the patches?", a: "Simply apply the patches under your eyes for 15-20 minutes. For best results, use them 2-3 times per week for visible improvement." },
              { q: "Is it safe for sensitive skin?", a: "Absolutely! The PDRN collagen formula is gentle on delicate under-eye skin, yet provides deep hydration to keep your skin looking refreshed." },
              { q: "Does it really reduce fine lines?", a: "Yes! The advanced PDRN collagen structure delivers moisture immediately, plumping the skin and reducing the appearance of fine lines and wrinkles." },
              { q: "How long does it last?", a: "With regular use, your Lift PDRN Collagen Eye Patches are designed to provide lasting results, making them a sustainable alternative to temporary eye creams." }
            ].map((faq, i) => (
              <Collapse
                key={i}
                bordered={false}
                expandIconPosition="end"
                items={[{
                  key: '1',
                  label: <div className="flex items-center text-lg font-bold text-gray-800"><FaMagic className="mr-3 text-pink-500" /> {faq.q}</div>,
                  children: <p className="text-gray-600 text-base leading-relaxed pl-8 border-l-2 border-pink-200 ml-2">{faq.a}</p>
                }]}
                className="bg-white hover:shadow-md transition-all rounded-2xl overflow-hidden border border-pink-100"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-semibold text-gray-900">Eyes Loved By You.</h2>
            <p className="mt-4 text-gray-700 text-base md:text-lg">See what thousands are switching to.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { seed: 'kitchen_user1', name: 'Maria L.', text: "No more tired-looking under-eyes! These eye patches look elegant and work like magic." },
              { seed: 'kitchen_user2', name: 'David K.', text: "I was surprised how fast it works. My under-eye area is finally looking refreshed and smooth." },
              { seed: 'kitchen_user3', name: 'Sophie T.', text: "Bought one for myself and one for my mom. Best skincare purchase of the year." }
            ].map((t, idx) => (
              <div key={idx} className="bg-gray-50 p-8 rounded-3xl border border-gray-100 relative transform transition-all hover:-translate-y-2 hover:shadow-xl hover:bg-pink-50/30">
                <FaQuoteLeft className="text-4xl text-pink-200 mb-6" />
                <p className="text-gray-700 text-lg italic mb-6 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center space-x-4">
                  <img src={`https://picsum.photos/seed/${t.seed}/100/100`} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-pink-500" />
                  <div>
                    <h4 className="font-bold text-gray-900">{t.name}</h4>
                    <div className="flex text-yellow-500 text-xs">
                      {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky 70% OFF Bar + Modal */}
      <>
        <Modal
          open={isOfferModalOpen}
          onOk={() => setIsOfferModalOpen(false)}
          closeIcon={false}
          footer={false}
          centered
          width={390}
        >
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark Backdrop */}
            <div
              className="absolute inset-0 bg-stone-900/60 transition-opacity"
              onClick={() => setIsOfferModalOpen(false)}
            />

            {/* Modal Container */}
            <div className="relative w-full max-w-[390px] h-[500px] rounded-2xl bg-white shadow-2xl overflow-hidden animate-[fadeInScale_0.4s_ease-out] group">

              {/* 1. Full Background Image */}
              <div className="absolute inset-0">
                <img
                  src={girlImage}
                  alt="Beauty Routine"
                  className="w-full h-full object-contain transition-transform duration-[3s] group-hover:scale-110"
                />
              </div>

              {/* 2. Gradient Overlay (Top-Left Transparent -> Bottom Right Pink) */}
              {/* We use a double gradient: one for general tint, one strong at bottom for text readability */}
              <div className="absolute inset-0 bg-linear-to-br from-transparent via-pink-500/20 to-pink-900/90 mix-blend-multiply" />
              <div className="absolute inset-0 bg-linear-to-t from-pink-950/90 via-pink-900/40 to-transparent" />

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsOfferModalOpen(false)}
                className="absolute right-5 top-5 z-20 p-2.5 rounded-full bg-white/20 text-white hover:bg-white hover:text-pink-600 backdrop-blur-md transition-all border border-white/20 cursor-pointer"
              >
                <FaTimes className="h-4 w-4" />
              </button>

              {/* 3. Content Area */}
              <div className="absolute bottom-0 inset-x-0 p-8 flex flex-col justify-end h-full z-10 text-white">

                {/* Top Badge */}
                <div className="self-start mb-auto ">
                  <span className="inline-block px-3 py-1 rounded-full bg-pink-500/80 backdrop-blur-md text-[10px] font-semibold shadow-lg border border-pink-400/50">
                    Secret Sale Unlocked
                  </span>
                </div>

                {/* Big Offer Text */}
                <div className="mb-3 space-y-0.5">
                  <p className="text-pink-200 text-xs tracking-wide">Congratulations! You've earned</p>
                  <h2 className="text-6xl md:text-7xl font-black tracking-tighter leading-[0.9] drop-shadow-lg">
                    70% <span className="text-pink-300 font-serif italic font-light">OFF</span>
                  </h2>
                </div>

                {/* Feature Cards (Glassmorphism) */}
                <div className="grid grid-cols-3 gap-3 ">
                  {/* Card 1 */}
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-1 text-center hover:bg-white/20 transition-colors cursor-default">
                    <p className="text-[10px] font-semibold italic uppercase tracking-wide leading-tight">Instant Lift</p>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-1 text-center hover:bg-white/20 transition-colors cursor-default">
                    <p className="text-[10px] font-semibold italic uppercase tracking-wide leading-tight">Deep Hydration</p>
                  </div>

                  {/* Card 3 */}
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-1 text-center hover:bg-white/20 transition-colors cursor-default">
                    <p className="text-[10px] font-semibold italic uppercase tracking-wide leading-tight">Fast Results</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </>

      {/* Scroll To Top Button */}
      {showScrollTop && (
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
      )}

    </div>
  );
};

export default Home;
