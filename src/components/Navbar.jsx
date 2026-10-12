import { Link } from 'react-router-dom';
// Importing clean, minimal icons from the react-icons library
import { FiSearch, FiUser, FiShoppingCart } from 'react-icons/fi';

export default function Navbar({ cartCount = 0 }) {
  return (
    <header className="w-full shadow-sm sticky top-0 z-50">
      <div className="bg-dark-spruce-800 text-soft-linen-50 text-xs py-2 overflow-hidden">
        <marquee scrollamount="5" className="tracking-widest uppercase font-semibold">
          ✨ Welcome to Anasta See Yatures — Free Shipping on orders over ₱10,000! ✨
          Welcome to Anasta See Yatures — Free Shipping on orders over ₱10,000! ✨
          Welcome to Anasta See Yatures — Free Shipping on orders over ₱10,000! ✨
        </marquee>
      </div>

      <nav className="bg-soft-linen-50 border-b border-dry-sage-200 px-8 py-5 flex justify-between items-center">
        
        <Link to="/" className="text-4xl font-garamond font-extrabold text-dark-spruce-900 tracking-wider">
        Anasta See Yatures
        </Link>

        <div className="hidden md:flex gap-10 font-medium text-dark-spruce-700">
          <Link to="/" className="hover:text-fern-600 hover:scale-105 transition-all">Home</Link>
          <Link to="/catalog" className="hover:text-fern-600 hover:scale-105 transition-all">Products</Link>
          <Link to="/about" className="hover:text-fern-600 hover:scale-105 transition-all">About Us</Link>
        </div>

        <div className="flex gap-6 items-center text-dark-spruce-800">
          <button className="hover:text-fern-600 transition-colors" aria-label="Search">
            <FiSearch size={22} />
          </button>
          <button className="hover:text-fern-600 transition-colors" aria-label="Account">
            <FiUser size={22} />
          </button>
          
          <Link to="/cart" className="flex items-center gap-1.5 hover:text-fern-600 transition-colors" aria-label="Cart">
            <FiShoppingCart size={22} />
            <span className="bg-tuscan-sun-400 text-dark-spruce-950 rounded-full px-2 py-0.5 text-xs font-extrabold relative -top-2 -left-3 shadow-sm">
              {cartCount}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
}