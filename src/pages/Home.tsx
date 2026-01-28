import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaCheckCircle, FaStar, FaQuoteLeft, FaQuestionCircle, FaTimes, FaMagic, FaArrowRight } from 'react-icons/fa';
import { Carousel, Collapse } from 'antd';
import productImage from '../assets/image.png';
import beforeImage from '../assets/before.jpeg';
import afterImage from '../assets/after.jpeg';

const Home = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 relative group max-w-lg mx-auto lg:mx-0 lg:mr-auto">
              {/* Restored Pink/Purple Glow */}
              <div className="absolute inset-0 bg-linear-to-tr from-pink-300 to-purple-400 rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform blur-lg opacity-60"></div>
              <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl aspect-square border border-gray-100 h-96">
                <img
                  src={productImage}
                  alt="Diatomaceous Stone Dish Mat"
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
                The <span className="font-bold font-serif text-transparent bg-clip-text bg-linear-to-r from-pink-400 to-purple-400">#1 Natural Solution</span> for
                <span className="italic"> drier, cleaner surfaces</span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Clinically proven Diatomaceous Earth structure infused with <span className="font-bold text-gray-900">Rapid Absorb Technology</span> to dry, sanitize, and upgrade your kitchen counter instantly.
              </p>

              <div className="pt-4 flex flex-col items-start space-y-4">
                <Link to="/product/1" className="bg-black text-white text-xl font-bold py-5 px-16 rounded-full hover:bg-gray-800 transition-all shadow-xl hover:shadow-2xl uppercase tracking-wider w-full sm:w-auto text-center">
                  Get Yours 70% Off
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
            <span className="text-pink-300 font-bold tracking-[0.2em] uppercase mb-4 block animate-pulse">Upgrade Your Countertop</span>
            <h2 className="text-5xl md:text-8xl font-black text-white mb-8 drop-shadow-2xl">
              MODERN <br />
              <span className="italic font-serif text-transparent bg-clip-text bg-linear-to-r from-pink-400 to-purple-400">LUXURY</span>
            </h2>
            <Link to="/product/1" className="inline-block bg-white text-black font-black text-xl py-4 px-12 rounded-none hover:bg-pink-500 hover:text-white transition-colors duration-300 uppercase tracking-wider transform hover:-translate-y-1">
              Shop The Mat
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
              <p className="text-gray-400 uppercase tracking-widest text-xs">Mold Free Results</p>
            </div>
            <div className="p-4 group">
              <div className="text-5xl font-black text-purple-500 mb-2 group-hover:scale-110 transition-transform">60s</div>
              <p className="text-gray-400 uppercase tracking-widest text-xs">Instant Drying Time</p>
            </div>
            <div className="p-4 group">
              <div className="text-5xl font-black text-pink-500 mb-2 group-hover:scale-110 transition-transform">50k+</div>
              <p className="text-gray-400 uppercase tracking-widest text-xs">Modern Kitchens Upgraded</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: The Comparison (Why Switch) */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-semibold text-gray-900">Stop The Soggy Mess.</h2>
            <p className="mt-4 text-gray-700 text-base md:text-lg">Traditional mats are a breeding ground for bacteria. Upgrade to the stone age.</p>
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
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center"><FaCheckCircle className="mr-2 text-pink-500" /> The Stone Mat</h3>
              <ul className="space-y-4">
                <li className="flex items-center text-gray-800 font-medium"><FaCheckCircle className="mr-3 text-pink-500" /> Dries in 60 seconds</li>
                <li className="flex items-center text-gray-800 font-medium"><FaCheckCircle className="mr-3 text-pink-500" /> Antimicrobial & Anti-odor</li>
                <li className="flex items-center text-gray-800 font-medium"><FaCheckCircle className="mr-3 text-pink-500" /> Minimalist & Elegant</li>
                <li className="flex items-center text-gray-800 font-medium"><FaCheckCircle className="mr-3 text-pink-500" /> Lifetime durability</li>
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
            <h2 className="text-3xl md:text-5xl font-serif font-semibold text-gray-900">The Magic of Diatoms</h2>
            <p className="mt-4 text-gray-700 text-base md:text-lg">Millions of microscopic pores work instantly to wick away moisture.</p>
          </div>

            <div className="relative mt-12 mb-8">
            <div className="block md:block absolute -top-16 md:-top-40 left-1/2 -translate-x-1/2 w-64 md:w-[1200px] h-12 md:h-32 z-10 text-pink-300 opacity-40 md:opacity-20">
              <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="w-full h-full">
                <path d="M0 10 H95 M90 5 L100 10 L90 15" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Before */}
              <div className="group relative overflow-hidden rounded-3xl aspect-square shadow-xl">
                <img
                  src={beforeImage}
                  alt="Before using the Stone Dish Mat"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <span className="inline-block px-4 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-black/80 text-pink-200">
                    Before
                  </span>
                  <p className="mt-3 text-sm md:text-base text-gray-100 max-w-xs">
                    Standing water, streaks and water spots collecting around the sink area.
                  </p>
                </div>
              </div>

              {/* After */}
              <div className="group relative overflow-hidden rounded-3xl aspect-square shadow-xl">
                <img
                  src={afterImage}
                  alt="After using the Stone Dish Mat"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-pink-900/70 via-black/10 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <span className="inline-block px-4 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-pink-500 text-white shadow-lg">
                    After
                  </span>
                  <p className="mt-3 text-sm md:text-base text-pink-50 max-w-xs">
                    Brighter, drier surfaces with water wicked away into millions of microscopic pores.
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

      {/* SECTION: Problem vs Solution + Before/After (Stone Dish Mat Version) */}
      <section className="py-24 bg-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-serif font-semibold text-gray-900">
              From Soggy &amp; Messy to Clean &amp; Elevated
            </h2>
            <p className="mt-4 text-gray-600 text-base md:text-lg">
              Swap damp, smelly cloth mats for a sleek stone surface that dries fast and actually looks good on your counter.
            </p>
          </div>

          <div className="mt-14 relative grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 items-stretch">
            {/* Your Problem */}
            <div className="bg-black text-white rounded-3xl shadow-2xl p-8 lg:p-10 border border-pink-500/40">
              <h3 className="text-2xl font-black mb-6 tracking-tight">Your Problem</h3>
              <ul className="space-y-5 text-sm md:text-base">
                <li className="flex gap-4">
                  <FaTimes className="text-pink-300 mt-1 shrink-0" />
                  <span className="font-medium">Cloth &amp; silicone mats stay wet for hours and never fully dry.</span>
                </li>
                <li className="flex gap-4">
                  <FaTimes className="text-pink-300 mt-1 shrink-0" />
                  <span className="font-medium">Musty smells, hidden mold and water spots around your sink.</span>
                </li>
                <li className="flex gap-4">
                  <FaTimes className="text-pink-300 mt-1 shrink-0" />
                  <span className="font-medium">Constantly washing soggy towels and wiping up puddles.</span>
                </li>
              </ul>
            </div>

            {/* 3D Arrow Divider */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-linear-to-br from-pink-200 via-white to-purple-300 shadow-[0_20px_40px_rgba(0,0,0,0.25)] flex items-center justify-center border border-white/70">
                  <FaArrowRight className="text-2xl text-gray-900 drop-shadow" />
                </div>
                <div className="absolute inset-0 -z-10 blur-xl bg-pink-300/40 rounded-full scale-110" />
              </div>
            </div>

            {/* Our Solution */}
            <div className="bg-black text-white rounded-3xl shadow-2xl p-8 lg:p-10 border border-pink-500">
              <h3 className="text-2xl font-black mb-6 tracking-tight">Our Solution</h3>
              <ul className="space-y-5 text-sm md:text-base">
                <li className="flex gap-4">
                  <FaCheckCircle className="text-pink-400 mt-1 shrink-0" />
                  <span className="font-medium">Diatomaceous Stone Dish Mat pulls water in and evaporates it in under 60 seconds.</span>
                </li>
                <li className="flex gap-4">
                  <FaCheckCircle className="text-pink-400 mt-1 shrink-0" />
                  <span className="font-medium">Naturally antimicrobial, helping keep your sink area fresh and odor‑free.</span>
                </li>
                <li className="flex gap-4">
                  <FaCheckCircle className="text-pink-400 mt-1 shrink-0" />
                  <span className="font-medium">Minimalist stone design that upgrades the look of your kitchen instantly.</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION: Numbers / Proof (Added to match reference image) */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-serif font-semibold text-gray-900">
              The Stone Dish Mat Works — The Numbers Prove It
            </h2>
            <p className="mt-4 text-gray-700 text-base md:text-lg">
              Real kitchens, real counters, real results. See what Stone Dish Mat customers are experiencing at home.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16">
            {[
              {
                pct: 95,
                title: 'Saw dishes and counters dry in under 60 seconds',
                desc: 'Agreed the Stone Dish Mat absorbed water dramatically faster than cloth or silicone mats'
              },
              {
                pct: 91,
                title: 'Noticed less odor and mildew around the sink',
                desc: 'Reported fewer musty smells and less visible moisture build-up on their countertops'
              },
              {
                pct: 89,
                title: 'Would recommend the Stone Dish Mat to a friend',
                desc: 'Said it made their sink area look cleaner, tidier, and more premium'
              },
              {
                pct: 93,
                title: 'Reduced the need for dish towels and paper towels',
                desc: 'Found they were washing fewer soggy towels and wasting less paper for everyday drying'
              }
            ].map((s) => (
              <div key={`${s.pct}-${s.title}`} className="max-w-xl">
                <div className="text-4xl md:text-5xl font-black text-gray-900">{s.pct}%</div>
                <div className="mt-4 text-lg font-bold text-gray-900">{s.title}</div>
                <div className="mt-1 text-gray-700">{s.desc}</div>

                <div className="mt-6 h-2 rounded-full bg-purple-200 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-pink-500"
                    style={{ width: `${s.pct}%` }}
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-1 h-px bg-gray-200/80" />
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
              { q: "How do I clean the mat?", a: "Simply wipe it down with a damp cloth. For tougher stains, use the included sanding tool to refresh the surface instantly." },
              { q: "Is it safe for my dishes?", a: "Absolutely! The stone surface is gentle on glassware and ceramic, yet provides a non-slip grip to keep everything secure." },
              { q: "Does it really prevent mold?", a: "Yes! The porous diatomaceous earth structure wicks moisture away immediately, eliminating the damp environment where mold and bacteria thrive." },
              { q: "How long does it last?", a: "With proper care, your Stone Mat is designed to last for years, making it a sustainable alternative to disposable plastic or fabric mats." }
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
            <h2 className="text-3xl md:text-5xl font-serif font-semibold text-gray-900">Kitchens Loved By You.</h2>
            <p className="mt-4 text-gray-700 text-base md:text-lg">See what thousands are switching to.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { seed: 'kitchen_user1', name: 'Maria L.', text: "No more smelly towels on the counter! This stone mat looks elegant and works like magic." },
              { seed: 'kitchen_user2', name: 'David K.', text: "I was surprised how fast it dries. My granite countertops are finally safe from water stains." },
              { seed: 'kitchen_user3', name: 'Sophie T.', text: "Bought one for the kitchen and one for the bathroom. Best home purchase of the year." }
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
        {/* Sticky bottom bar */}
        {/* <button
          type="button"
          onClick={() => setIsOfferModalOpen(true)}
          className={`fixed inset-x-0 bottom-0 right-0 z-40 flex justify-center pointer-events-none`}
        >
          <div
            className={`pointer-events-auto rounded-lg bg-[#eb9475] px-10 py-3 shadow-xl text-sm sm:text-base font-bold tracking-wide text-white uppercase transition-transform duration-300 ease-out ${
              isOfferModalOpen ? 'translate-y-full' : 'translate-y-0'
            }`}
          >
            GET 70% OFF
          </div>
        </button> */}

        {/* Offer Modal */}
        {/* {isOfferModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="relative mx-4 w-full max-w-4xl rounded-3xl bg-white shadow-2xl overflow-hidden animate-[fadeInScale_0.25s_ease-out]">
              <button
                type="button"
                aria-label="Close offer"
                onClick={() => setIsOfferModalOpen(false)}
                className="absolute right-4 top-4 z-10 rounded-full bg-white/80 p-1 text-gray-700 hover:bg-gray-100"
              >
                <FaTimes className="h-4 w-4" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="px-8 py-10 md:px-10">
                  <div className="text-xs font-semibold tracking-[0.2em] text-gray-500 mb-2">
                    LIMITED-TIME OFFER
                  </div>
                  <div className="text-2xl font-black tracking-[0.15em] mb-4">
                    STONE MAT
                  </div>
                  <div className="text-sm font-medium text-gray-700 mb-2">
                    You&apos;ve got
                  </div>
                  <div className="text-5xl sm:text-6xl font-black text-gray-900 leading-none mb-4">
                    70% OFF
                  </div>
                  <p className="text-sm sm:text-base text-gray-700 mb-6">
                    Claim your discount now by telling us your #1 kitchen goal:
                  </p>

                  <div className="space-y-3 mb-6">
                    <button className="w-full rounded-full bg-[#eb9475] py-3 text-sm sm:text-base font-bold text-white tracking-wide hover:bg-[#e37d57] transition-colors">
                      DRIER COUNTERS
                    </button>
                    <button className="w-full rounded-full bg-[#eb9475] py-3 text-sm sm:text-base font-bold text-white tracking-wide hover:bg-[#e37d57] transition-colors">
                      NO MORE ODOR
                    </button>
                    <button className="w-full rounded-full bg-[#eb9475] py-3 text-sm sm:text-base font-bold text-white tracking-wide hover:bg-[#e37d57] transition-colors">
                      CLEANER SINK AREA
                    </button>
                  </div>

                  <button
                    type="button"
                    className="mx-auto block text-xs font-semibold text-gray-400 hover:text-gray-600"
                    onClick={() => setIsOfferModalOpen(false)}
                  >
                    No thanks
                  </button>
                </div>

                <div className="relative hidden md:block">
                  <img
                    src={productImage}
                    alt="Customer enjoying the Stone Mat offer"
                    className="h-full w-full object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-linear-to-l from-white/40 via-transparent to-transparent" />
                </div>
              </div>
            </div>
          </div>
        )} */}
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
