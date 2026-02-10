import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaCheckCircle, FaStar, FaQuestionCircle, FaTimes, FaMagic, FaArrowRight } from 'react-icons/fa';
import { Collapse } from 'antd';
import productImage from '../assets/imageOne.png';
import productImageTwo from '../assets/imageTwo.png';
// import beforeImage from '../assets/before.jpeg';
// import afterImage from '../assets/after.jpeg';
// import b1 from '../assets/b1.png';
// import b2 from '../assets/b2.png';
// import b3 from '../assets/b3.png';
import AnnouncementBar from '../components/AnnouncementBar';

const Home = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [_timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date('2026-02-14T23:59:59').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
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
            <div className="lg:col-span-6 relative group max-w-sm sm:max-w-md lg:max-w-lg mx-auto lg:mx-0 lg:mr-auto h-[400px] sm:h-[450px] flex items-center justify-center">
              {/* Decorative background blurs */}
              <div className="absolute -top-10 -left-10 w-64 h-64 bg-pink-100 rounded-full blur-3xl opacity-60 animate-pulse"></div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-purple-100 rounded-full blur-3xl opacity-60 animate-pulse" style={{ animationDelay: '2s' }}></div>

              <div className="relative w-full h-full flex items-center justify-center">
                {/* Secondary Product (Bottom Layer) */}
                <div className="absolute transform -translate-x-12 -translate-y-6 -rotate-12 group-hover:rotate-[-15deg] group-hover:-translate-x-16 transition-all duration-700">
                  <div className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-xl">
                    <img
                      src={productImageTwo}
                      alt="Precision Microneedle Patches"
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                </div>

                {/* Primary Product (Top Layer) */}
                <div className="relative z-10 transform translate-x-10 translate-y-6 rotate-6 group-hover:rotate-[8deg] group-hover:translate-x-12 transition-all duration-700">
                  <div className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-2xl">
                    <img
                      src={productImage}
                      alt="InstaLift PDRN Collagen Eye Patches"
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Floating Rating Badge */}
                    <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md border border-gray-50">
                      <div className="flex text-yellow-500 text-[10px]">
                        {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                      </div>
                      <div className="text-[10px] font-black text-gray-900 mt-0.5 tracking-tighter uppercase">Loved by 80k+</div>
                    </div>
                  </div>
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

              <h1 className="text-3xl lg:text-[43px] font-serif font-medium text-gray-900 leading-tight">
                The <span className="font-medium font-serif text-transparent bg-clip-text bg-linear-to-r from-pink-400 to-purple-400">#1 Targeted Solution</span> for
                <span className="italic"> brighter, smoother under & upper eyes</span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Advanced eye-patch technology designed to hydrate, smooth, and refresh the delicate under-eye and upper-eye areas — helping reduce the look of puffiness, fine lines, and tired eyes with consistent use.
              </p>

              <div className="pt-4 flex flex-col items-start space-y-4">
                <Link to="/shop" className="group flex items-center justify-center gap-3 bg-linear-to-tr from-pink-500 to-purple-400 text-white text-xl font-bold py-5 px-16 rounded-full hover:bg-gray-800 hover:scale-102 transition-all shadow-xl hover:shadow-2xl uppercase tracking-wider w-full sm:w-auto text-center">
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
      {/* <section className="relative h-[600px] overflow-hidden">

        <div className="absolute inset-0 z-0">
          <Carousel autoplay effect="fade" speed={1000} autoplaySpeed={3000}>
            {[b1, b2, b3].map((img, idx) => (
              <div key={idx} className="h-[600px]">
                <img src={img} alt={`Hero Slide ${idx + 1}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/30"></div>
              </div>
            ))}
          </Carousel>
        </div>

        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <div className="text-center max-w-4xl mx-auto px-4 pointer-events-auto">
            <span className="text-pink-300 font-bold tracking-[0.2em] uppercase mb-4 block animate-pulse">Upgrade Your Under-Eyes</span>
            <h2 className="text-5xl md:text-8xl font-black text-white mb-8 drop-shadow-2xl">
              MODERN <br />
              <span className="italic font-serif text-transparent bg-clip-text bg-linear-to-r from-pink-400 to-purple-400">LUXURY</span>
            </h2>
            <Link to="/product/8076385943615" className="inline-block bg-white text-black font-black text-xl py-4 px-12 rounded-none hover:bg-pink-500 hover:text-white transition-colors duration-300 uppercase tracking-wider transform hover:-translate-y-1">
              Shop The Patches
            </Link>
          </div>
        </div>
      </section> */}

      {/* VALENTINE'S SALE TIMER SECTION (Moved below Hero) */}
      <AnnouncementBar />
      {/* <section className="bg-linear-to-r from-pink-400 via-rose-400 to-purple-400 bg-[length:200%_200%] animate-gradient-move text-white py-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-50px] left-[-100px] w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-50px] right-[-100px] w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 bg-white/10 backdrop-blur-md p-8 md:p-12 rounded-[3.5rem] border border-white/20 shadow-2xl">
            <div className="space-y-4 text-center md:text-left">
              <span className="inline-block bg-white text-pink-600 px-5 py-1 rounded-full text-xs font-black uppercase tracking-[0.25em] shadow-lg">Special Offer</span>
              <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-none">
                Valentine's <br />
                <span className="text-pink-100 text-3xl md:text-4xl italic font-serif">Sale Ends In:</span>
              </h2>
            </div>

            <div className="flex items-center gap-4 md:gap-10">
              {[
                { label: 'Days', value: timeLeft.days },
                { label: 'Hours', value: timeLeft.hours },
                { label: 'Mins', value: timeLeft.minutes },
                { label: 'Secs', value: timeLeft.seconds }
              ].map((unit, i) => (
                <div key={i} className="flex flex-col items-center gap-3">
                  <div className="bg-white text-pink-600 w-20 h-20 md:w-28 md:h-28 rounded-[2rem] flex items-center justify-center shadow-2xl border-b-8 border-pink-200 transform hover:scale-105 transition-transform">
                    <span className="font-sans font-black text-3xl md:text-5xl tabular-nums">
                      {String(unit.value).padStart(2, '0')}
                    </span>
                  </div>
                  <span className="text-xs md:text-sm font-black uppercase tracking-widest text-pink-50">{unit.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center md:items-end gap-5">
              <Link
                to="/product/8076385943615"
                className="group bg-white text-pink-600 px-12 py-6 rounded-full font-black text-2xl md:text-3xl uppercase hover:bg-pink-50 transition-all shadow-[0_15px_35px_rgba(0,0,0,0.3)] hover:-translate-y-1 active:scale-95"
              >
                Get 70% Off
              </Link>
            </div>
          </div>
        </div>
      </section> */}


      {/* SECTION: 5 Reasons (Redesigned for a unique, premium look) */}
      {/* <section className="py-24 bg-linear-to-b from-[#fdf2f8] to-[#fffbff] overflow-hidden">
        <div className="max-w-7xl mx-auto px-1 sm:px-3 lg:px-4 relative">
          
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-pink-100 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-50" />

          <div className="text-center mb-20 relative z-10">
            <span className="text-pink-500 font-bold tracking-[0.3em] uppercase text-xs mb-4 block">The NovaLift Difference</span>
            <h2 className="text-4xl md:text-6xl font-serif font-medium text-gray-900 leading-tight">
              5 Reasons Your Eyes <br />
              <span className="italic text-transparent bg-clip-text bg-linear-to-r from-pink-500 to-rose-400">Deserve This Ritual</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6 relative z-10">
            {[
              {
                id: "1",
                label: "The Science",
                title: "Microneedle Tech",
                desc: "PDRN delivery that actually penetrates deep into skin layers.",
                image: "https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&q=80",
                color: "pink"
              },
              {
                id: "2",
                label: "The Result",
                title: "Instant Glow",
                desc: "Noticeably brighter, smoother eyes in just one 15-minute session.",
                image: "https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&q=80",
                color: "pink"
              },
              {
                id: "3",
                label: "The Value",
                title: "In-Home Luxury",
                desc: "Professional-grade results without the clinical price tag.",
                image: "https://images.unsplash.com/photo-1552046122-03184de85e08?auto=format&fit=crop&q=80",
                color: "pink"
              },
              {
                id: "4",
                label: "The Ease",
                title: "No-Mess Ritual",
                desc: "Swap sticky creams for our clean, elegant, and fast-acting patches.",
                image: "https://images.unsplash.com/photo-1552046122-03184de85e08?auto=format&fit=crop&q=80",
                color: "pink"
              },
              {
                id: "5",
                label: "The Promise",
                title: "Long Term Care",
                desc: "Anti-aging benefits that build up with every single application.",
                image: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&q=80",
                color: "pink"
              }
            ].map((item, idx) => (

              <div 
                key={idx} 
                className="group relative bg-white border border-pink-100 p-4 rounded-md shadow-sm hover:shadow-2xl hover:shadow-pink-200/50 transition-all duration-500 hover:-translate-y-2 overflow-hidden flex flex-col items-center text-center"
              >
                <div className="relative w-full aspect-square overflow-hidden mb-6 ring-4 rounded-lg ring-transparent group-hover:ring-pink-100 transition-all duration-500">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                </div>

                <div className="px-2 pb-2 flex flex-col items-center">
                  <div className="text-6xl md:text-7xl font-sans italic font-black text-pink-500 mb-4 leading-none opacity-80 group-hover:opacity-100 transition-opacity">
                    {item.id}
                  </div>

                  <h3 className="text-xl font-serif font-bold text-gray-900 mb-3 group-hover:text-pink-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {item.desc}
                  </p>
                  
                  <div className="w-12 h-12 rounded-full bg-pink-50 flex items-center justify-center group-hover:bg-pink-500 transition-all duration-300 shadow-sm group-hover:shadow-pink-400/50">
                    <FaArrowRight className="text-pink-500 group-hover:text-white transition-colors" />
                  </div>
                </div>

                <div className="absolute bottom-0 inset-x-0 h-1 bg-pink-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <Link to="/product/8076385943615" className="inline-flex items-center gap-3 bg-gray-900 text-white px-10 py-4 rounded-full font-bold hover:bg-pink-600 transition-all shadow-xl hover:shadow-pink-200/50 group">
              EXPERIENCE THE RITUAL
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section> */}

      {/* SECTION 3: How It Works (Before & After Visuals) */}
      {/* <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-pink-500 font-bold tracking-[0.2em] uppercase text-xs mb-3">Explore our other products as well</p>
            <h2 className="text-3xl md:text-5xl font-serif font-semibold text-gray-900">The Magic of PDRN Collagen</h2>
            <p className="mt-4 text-gray-700 text-base md:text-lg">Advanced PDRN collagen formula works instantly to hydrate and plump your delicate under-eye area.</p>
          </div>

          <div className="relative mt-12 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
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
      </section> */}

      {/* SECTION 4: Problem vs Solution + Before/After (Lift PDRN Collagen Eye Patches Version) */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-semibold text-gray-900 leading-tight">
              From Tired to <span className="font-serif text-transparent bg-clip-text bg-linear-to-r from-pink-400 to-purple-400 italic">Refreshed</span>
            </h2>
            <p className="mt-6 text-gray-700 text-lg md:text-xl leading-relaxed">
              Stop relying on temporary fixes. Upgrade your under-eye and upper-eye routine
              with targeted patch care designed to support hydration, smoothness, and a
              refreshed look.
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
                    "Products that sit on the surface",
                    "Waking up with puffy, tired-looking eyes",
                    "Messy or inconsistent application"
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
                  The Better Way
                </span>
                <h3 className="text-3xl font-bold text-gray-900 mb-8 tracking-tight flex items-center gap-3">
                  <FaCheckCircle className="text-pink-500" /> Targeted Eye Patches
                </h3>
                <ul className="space-y-6">
                  {[
                    { title: "Instant Hydration", desc: "Hydrates and refreshes the under & upper eye areas" },
                    { title: "Visible Firming", desc: "Helps smooth the look of fine lines and puffiness" },
                    { title: "Elevated Ritual", desc: "Easy, mess-free application" }
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

      {/* SECTION 5: Numbers / Proof (Added to match reference image) */}
      {/* <section className="py-24 bg-white">
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
      </section> */}

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
              {
                q: "How do I use the patches?", a: `Apply to clean, dry under-eye skin. Leave on for 15–20 minutes, then remove and gently pat in any remaining serum.`
              },
              { q: "Are the patches suitable for sensitive skin?", a: `Yes. Our patches are designed to be gentle on the delicate under-eye area. A patch test is recommended for sensitive skin.` },
              { q: "What concerns do these patches help with?", a: `They help hydrate the under-eye area and improve the appearance of puffiness, dark circles, and fine lines.` },
              { q: "When will I see results?", a: `Skin may look more hydrated and refreshed after use. Results improve with consistent use over time.` }
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
      {/* <section className="py-24 bg-white overflow-hidden">
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
      </section> */}

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
