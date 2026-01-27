import { Link } from 'react-router-dom';
import { FaCheckCircle, FaStar, FaArrowRight, FaQuoteLeft, FaQuestionCircle, FaTimes, FaMagic } from 'react-icons/fa';
import { Carousel, Collapse } from 'antd';
import { useState } from 'react';
import productImage from '../assets/image.png';

const Home = () => {
  return (
    <div className="space-y-0">
      
      {/* SECTION 1: Main Product Highlight */}
      <section className="bg-white py-16 lg:py-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Product Image */}
            <div className="relative group">
               {/* Restored Pink/Purple Glow */}
               <div className="absolute inset-0 bg-gradient-to-tr from-pink-300 to-purple-400 rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform blur-lg opacity-60"></div>
               <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl aspect-square border border-gray-100">
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

            {/* Right: Copy & CTR */}
            <div className="space-y-8">
               <div className="inline-block bg-pink-50 text-pink-600 font-bold px-4 py-1.5 rounded-full text-sm tracking-wide mb-2 border border-pink-100">
                 #1 VIRAL KITCHEN UPGRADE
               </div>
               <h1 className="text-5xl lg:text-7xl font-black text-gray-900 leading-none">
                 Dry Dishes <br/>
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">Instantly.</span>
               </h1>
               <p className="text-xl text-gray-500 leading-relaxed max-w-lg">
                 The eco-friendly Diatomaceous Earth mat that absorbs water in seconds and prevents mold for good. Experience the magic of rapid drying.
               </p>

               {/* Catchy Add-ons */}
               <div className="space-y-4 bg-purple-50 p-6 rounded-2xl border border-purple-100">
                 <div className="flex items-start space-x-3">
                    <div className="mt-1 bg-pink-100 p-1 rounded-full text-pink-600"><FaCheckCircle className="w-4 h-4" /></div>
                    <div>
                      <h4 className="font-bold text-gray-900">Ultra Absorbent Technology</h4>
                      <p className="text-sm text-gray-600">Water evaporates in under 60 seconds.</p>
                    </div>
                 </div>
                 <div className="flex items-start space-x-3">
                    <div className="mt-1 bg-pink-100 p-1 rounded-full text-pink-600"><FaCheckCircle className="w-4 h-4" /></div>
                    <div>
                      <h4 className="font-bold text-gray-900">Antibacterial & Mold-Free</h4>
                      <p className="text-sm text-gray-600">Naturally eliminates moisture buildup.</p>
                    </div>
                 </div>
               </div>

               <div className="flex items-center space-x-4 pt-4">
                 <Link to="/product/1" className="bg-black text-white text-lg font-bold py-4 px-10 rounded-full hover:bg-pink-600 transition-all shadow-lg hover:shadow-pink-500/30 flex items-center space-x-2 transform hover:-translate-y-1">
                   <span>Shop Now</span>
                   <FaArrowRight />
                 </Link>
                 <div className="text-sm text-gray-400 font-medium">
                   Free Shipping <br/> Over $50
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              </div>
            ))}
          </Carousel>
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <div className="text-center max-w-4xl mx-auto px-4 pointer-events-auto">
             <span className="text-pink-300 font-bold tracking-[0.2em] uppercase mb-4 block animate-pulse">Upgrade Your Countertop</span>
             <h2 className="text-5xl md:text-8xl font-black text-white mb-8 drop-shadow-2xl">
               MODERN <br/> 
               <span className="italic font-serif text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">LUXURY</span>
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
              <h2 className="text-4xl font-black text-gray-900 mb-4">Stop The Soggy Mess.</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Traditional mats are a breeding ground for bacteria. Upgrade to the stone age.</p>
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

      {/* SECTION: How It Works (Restored with Catchy Visuals) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">The Magic of Diatoms</h2>
              <p className="text-gray-500">Millions of microscopic pores work instantly to wick away moisture.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Absorb', desc: 'Water hits the porous surface.', seed: 'water_drop' },
                { title: 'Dissipate', desc: 'Moisture spreads and evaporates.', seed: 'mist' },
                { title: 'Dry', desc: 'Bone dry surface in seconds.', seed: 'dry_stone' }
              ].map((step, idx) => (
                <div key={idx} className="group relative overflow-hidden rounded-3xl aspect-[4/5] shadow-lg">
                   <img src={`https://picsum.photos/seed/${step.seed}/400/500`} alt={step.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8">
                      <div className="text-pink-400 font-black text-6xl mb-2 opacity-50">{idx + 1}</div>
                      <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                      <p className="text-gray-300">{step.desc}</p>
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
               <h2 className="text-4xl font-black text-gray-900 mb-4">Got Questions?</h2>
               <p className="text-gray-600">We've got the answers.</p>
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
                     label: <div className="flex items-center text-lg font-bold text-gray-800"><FaMagic className="mr-3 text-pink-500"/> {faq.q}</div>, 
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
              <h2 className="text-4xl font-black text-gray-900 mb-4">Kitchens Loved By You.</h2>
              <p className="text-gray-600">See what thousands are switching to.</p>
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

    </div>
  );
};

export default Home;
