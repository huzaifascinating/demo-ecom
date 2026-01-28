import stoneMatImage from '../assets/image.png';
import ImageOne from '../assets/imageOne.png';
import ImageTwo from '../assets/imageTwo.png';

// Mock Data - Updated with requested products
export const PRODUCTS = [
    {
      id: '1',
      name: 'Diatomaceous Stone Dish Mat',
      price: 39.99,
      originalPrice: 79.99,
      category: 'home',
      image: stoneMatImage, // Using local asset
      rating: 4.9,
      reviews: 2400
    },
    {
      id: '2',
      name: 'Lift PDRN Collagen Eye Patches',
      price: 34.99,
      originalPrice: 69.99,
      category: 'skincare',
      image: ImageOne,
      rating: 4.8,
      reviews: 850
    },
    {
      id: '3',
      name: 'Microneedle Eye Patches',
      price: 29.99,
      originalPrice: 59.99,
      category: 'skincare',
      image: ImageTwo,
      rating: 4.7,
      reviews: 1200
    },
  ];