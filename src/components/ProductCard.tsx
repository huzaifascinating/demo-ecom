import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating?: number;
  reviews?: number;
}

const ProductCard = ({ id, name, price, originalPrice, image, reviews = 437 }: ProductCardProps) => {

  return (
    <Link to={`/product/${id}`} className="group block">
      <button
        type="button"
        className="group block text-left w-full"
      >
        <div className="relative overflow-hidden bg-gray-100 rounded-sm aspect-square mb-4 w-full">
          <img
            src={image}
            alt={name}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-in-out"
          />
          {originalPrice && (
            <div className="absolute top-3 left-3 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded-sm shadow-sm">
              SALE
            </div>
          )}
        </div>
        <div className="space-y-1 w-full">
          <h3 className="text-gray-900 font-semibold text-lg group-hover:text-pink-500 transition-colors">{name}</h3>
          <div className="flex items-center space-x-1">
            <div className="flex text-yellow-400 text-xs">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
            <span className="text-gray-500 text-xs">({reviews} reviews)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-900 font-bold">${price.toFixed(2)}</span>
            {originalPrice && (
              <span className="text-gray-400 text-sm line-through">${originalPrice.toFixed(2)}</span>
            )}
          </div>
        </div>
      </button>
    </Link>
  );
};

export default ProductCard;
