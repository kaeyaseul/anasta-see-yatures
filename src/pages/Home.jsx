import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import snezhnayaLamp from '../assets/snezhnaya-lamp.png';
import caterpillarSofa from '../assets/caterpillar-sofa.png';
import brazeroTable from '../assets/brazero-side-table.png';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [snezhnayaLamp, caterpillarSofa, brazeroTable];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const featuredProducts = [
    { id: 1, name: "Snezhnaya Vintage Lamp", price: "₱4,800", image: snezhnayaLamp },
    { id: 2, name: "Caterpillar Lounge Sofa", price: "₱28,900", image: caterpillarSofa },
    { id: 3, name: "Brazero Crimson Side Table", price: "₱8,700", image: brazeroTable }
  ];

  return (
    <div className="w-full bg-soft-linen-50 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-8 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-12 md:py-20">
        
        <div className="relative w-full h-[400px] md:h-[500px] flex justify-center items-center bg-tuscan-sun-100 rounded-2xl shadow-sm border border-dry-sage-200">
          {slides.map((slide, index) => (
            <img
              key={index}
              src={slide}
              alt="Featured Furniture"
              className={`absolute max-h-[80%] max-w-[80%] object-contain transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            />
          ))}
          <div className="absolute bottom-6 flex gap-2 z-20">
            {slides.map((_, index) => (
              <span 
                key={index} 
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-dark-spruce-800' : 'bg-dry-sage-300'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start text-left">
          <h1 className="text-5xl md:text-6xl font-garamond font-extrabold text-dark-spruce-900 mb-4 tracking-tight">
            Anasta See <br /> Yatures
          </h1>
          <h2 className="text-2xl font-semibold text-fern-700 mb-6">
            Retro-like. Unique. Anthropomorphic.
          </h2>
          <p className="text-dark-spruce-700 text-lg mb-8 leading-relaxed max-w-lg">
            Welcome to a curated collection of avant-garde seating, mid-century lighting, and sculptural accents inspired by the vintage elegance of Snezhnaya. 
          </p>
          <Link 
            to="/catalog" 
            className="bg-dark-spruce-800 text-soft-linen-50 text-lg font-bold px-8 py-4 rounded-md shadow-md hover:bg-dark-spruce-700 hover:scale-105 transition-all"
          >
            Shop Now
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 w-full py-16 border-t border-dry-sage-200">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-garamond font-bold text-dark-spruce-900 mb-4">Featured Additions</h2>
          <p className="text-dark-spruce-700 text-lg">A glimpse into our most coveted Snezhnaya-inspired pieces.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {featuredProducts.map((product) => (
            <div key={product.id} className="bg-soft-linen-50 rounded-xl p-6 shadow-sm border border-dry-sage-200 flex flex-col items-center hover:shadow-md transition-shadow">
              <div className="h-48 w-full bg-white rounded-lg mb-4 flex items-center justify-center p-4 border border-soft-linen-100">
                <img src={product.image} alt={product.name} className="max-h-full object-contain drop-shadow-md" />
              </div>
              <h3 className="text-lg font-bold text-dark-spruce-900 mb-2 text-center">{product.name}</h3>
              <p className="text-fern-700 font-semibold">{product.price}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
            <Link 
            to="/catalog" 
            className="inline-block bg-dry-sage-200 text-dark-spruce-900 font-bold px-8 py-3 rounded-md shadow-sm hover:bg-dry-sage-300 transition-colors"
            >
            See All Products
            </Link>
        </div>
      </div>

      <div className="bg-dry-sage-100 py-20 border-t border-dry-sage-200">
        <div className="max-w-3xl mx-auto px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-garamond font-bold text-dark-spruce-900 mb-6">Our Story</h2>
          <p className="text-dark-spruce-800 text-lg leading-relaxed mb-8">
            Anasta See Yatures is born from the frozen elegance of Snezhnaya, blending vintage charm with modern anthropomorphic art. We believe furniture should be more than functional—it should be a living, breathing work of art.
          </p>
          <Link 
            to="/about" 
            className="inline-block border-2 border-dark-spruce-800 text-dark-spruce-800 font-bold px-8 py-3 rounded-md hover:bg-dark-spruce-800 hover:text-soft-linen-50 transition-colors"
            >
            Read Our Full Story
            </Link>
        </div>
      </div>

    </div>
  );
}