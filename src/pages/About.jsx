import { Link } from 'react-router-dom';

// Assuming these images are placed in your standard assets folder
import aboutImg from '../assets/about.jpeg';
import historyImg from '../assets/history.jpeg';
import visionImg from '../assets/vision.jpeg';

export default function About() {
  return (
    <div className="bg-soft-linen-50 min-h-screen">

      <div className="max-w-7xl mx-auto px-8 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="font-garamond text-4xl md:text-8xl font-extrabold text-dark-spruce-900 tracking-tighter">
            About Us
          </h1>
        </div>

        <div className="w-full h-[400px] border border-dry-sage-300 shadow-inner overflow-hidden">
          <img src={aboutImg} alt="About Us" className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="bg-dry-sage-50 py-20 border-y border-dry-sage-200 text-center">
        <div className="max-w-3xl mx-auto px-8">
          <h2 className="text-4xl font-garamond font-bold text-dark-spruce-900 mb-6">Anasta See Yatures</h2>
          <p className="text-xl text-dark-spruce-700 leading-relaxed font-medium">
            A curated collection of retro-like, unique, and anthropomorphic furniture inspired by the frozen elegance of Snezhnaya.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-20 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        <div className="w-full h-[500px] border border-dry-sage-200 shadow-inner overflow-hidden">
          <img src={historyImg} alt="History of the Brand" className="w-full h-full object-cover" />
        </div>
        
        <div className="flex flex-col items-start text-left">
          <h3 className="text-3xl font-garamond font-bold text-dark-spruce-900 mb-6">History of the Brand</h3>
          <p className="text-dark-spruce-800 text-lg mb-6 leading-relaxed">
            The name <span className="font-bold">Anasta See Yatures</span> draws its breath from the legacy of the Tsaritsa, Anastasya Feodorovna Snezhnaya. Born out of a deep reverence for winter's timeless beauty, our brand was established to capture the essence of her reign—where rigid ice meets the warm, beating heart of artistry.
          </p>
          <p className="text-dark-spruce-800 text-lg leading-relaxed">
            What began as a small workshop restoring mid-century Victorian lamps has evolved into a sanctuary for avant-garde design. We specialize in anthropomorphic silhouettes, bold velvet textures, and deep, resonant colors that challenge the mundane and celebrate the extraordinary.
          </p>
        </div>
      </div>

      <div className="bg-dark-spruce-900 text-soft-linen-50 py-24">
        <div className="max-w-4xl mx-auto px-8 text-center mb-16">
          <h3 className="text-4xl md:text-5xl font-garamond font-extrabold mb-8 text-tuscan-sun-400">Our Vision</h3>
          <p className="text-xl leading-relaxed font-medium">
            To blur the boundaries between utility and sculptural expression. We envision a world where your everyday spaces are transformed into living works of art, offering not just a place to sit or a light to read by, but a profound aesthetic experience.
          </p>
        </div>

        <div className="w-full max-w-7xl mx-auto px-8">
          <div className="w-full h-[400px] border border-dark-spruce-700 shadow-xl overflow-hidden">
            <img src={visionImg} alt="Our Vision" className="w-full h-full object-cover" />
          </div>
        </div>
        
        <div className="text-center mt-16">
          <Link 
            to="/catalog" 
            className="inline-block bg-tuscan-sun-400 text-dark-spruce-950 font-bold px-10 py-4 rounded-md shadow-md hover:bg-tuscan-sun-300 transition-colors"
          >
            Explore the Collection
          </Link>
        </div>
      </div>

    </div>
  );
}