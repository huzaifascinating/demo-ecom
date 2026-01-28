import { FaStar, FaQuoteLeft, FaSmile, FaArrowRight } from 'react-icons/fa';

const mockReviews = [
  {
    name: 'Sarah M.',
    tag: 'Stone Dish Mat',
    rating: 5,
    text: 'My counters used to stay wet for hours. Now everything is dry in under a minute and my kitchen actually looks styled.',
  },
  {
    name: 'Daniel K.',
    tag: 'Eye Patches',
    rating: 5,
    text: 'The under‑eye patches made a visible difference in a week. I look more awake on every Zoom call.',
  },
  {
    name: 'Olivia R.',
    tag: 'Lorena Bundle',
    rating: 5,
    text: 'The bundle was the perfect gift set. Packaging feels luxe and the products actually do what they promise.',
  },
];

const Reviews = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-pink-50 via-white to-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-pink-50 px-3 py-1 mb-4 border border-pink-100">
            <span className="h-1.5 w-1.5 rounded-full bg-pink-500" />
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-pink-600">
              Real voices, real results
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-gray-900">
            What Lorena Customers Are Saying
          </h1>
          <p className="mt-3 text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
            Every product we create is designed to solve a real problem in your home or routine. Here&apos;s what
            customers are experiencing after switching to Lorena.
          </p>
        </div>

        {/* Highlight strip */}
        <div className="mb-12 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-xs md:text-sm">
          <div className="rounded-2xl bg-white shadow-sm border border-pink-100 px-4 py-5">
            <div className="flex justify-center mb-2 text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
            <p className="font-semibold text-gray-900">4.9 / 5 average rating</p>
            <p className="text-gray-500 mt-1">Based on 3,000+ verified reviews</p>
          </div>
          <div className="rounded-2xl bg-white shadow-sm border border-pink-100 px-4 py-5">
            <p className="font-semibold text-gray-900">92% saw visible improvements</p>
            <p className="text-gray-500 mt-1">Within the first 7 days of use</p>
          </div>
          <div className="rounded-2xl bg-white shadow-sm border border-pink-100 px-4 py-5">
            <p className="font-semibold text-gray-900">89% would recommend Lorena</p>
            <p className="text-gray-500 mt-1">To a friend or family member</p>
          </div>
        </div>

        {/* Review cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {mockReviews.map((review, idx) => (
            <div
              key={idx}
              className="relative h-full rounded-3xl bg-white border border-gray-100 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <FaQuoteLeft className="absolute -top-6 left-6 text-4xl text-pink-100" />
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-pink-600 mb-4">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-pink-50 text-pink-500">
                  <FaSmile className="text-[11px]" />
                </span>
                {review.tag}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-4 italic">"{review.text}"</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{review.name}</p>
                  <div className="flex text-yellow-400 text-xs">
                    {[...Array(review.rating)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA strip */}
        <div className="rounded-3xl bg-black text-white px-6 py-7 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-pink-300 mb-1">
              Join the before & after club
            </p>
            <p className="text-lg md:text-xl font-semibold">
              Ready to go from soggy counters and tired eyes to your best‑looking home and skin?
            </p>
          </div>
          <a
            href="/shop"
            className="inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-3 text-sm font-bold tracking-wide hover:bg-pink-500 hover:text-white transition-colors"
          >
            Shop Customer Favorites
            <FaArrowRight className="text-xs" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Reviews;


