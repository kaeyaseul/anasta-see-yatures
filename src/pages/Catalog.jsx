import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiChevronDown, FiCheck } from 'react-icons/fi';

const CATEGORIES = ["All", "Seating", "Lighting", "Tables & Accents"];
const ITEMS_PER_PAGE = 6; 

export default function Catalog({products}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Popular"); // Fixed state variable name to match the UI
  const [currentPage, setCurrentPage] = useState(1);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortOptions = ["Popular", "Price: Lowest to Highest", "Price: Highest to Lowest"];

  let filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (sortBy === "Price: Lowest to Highest") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "Price: Highest to Lowest") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else {
    filteredProducts.sort((a, b) => b.popularity - a.popularity);
  }

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleFilterChange = (setter, value) => {
    setter(value);
    setCurrentPage(1);
  };

  return (
    <div className="bg-soft-linen-50 min-h-screen py-12 px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
          <h1 className="text-4xl font-garamond font-extrabold text-dark-spruce-900">Products</h1>
          <div className="relative flex items-center w-full md:w-72">
            <FiSearch className="absolute left-3 text-dry-sage-600" />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => handleFilterChange(setSearchQuery, e.target.value)}
              className="pl-10 pr-4 py-2 border border-dry-sage-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fern-500 bg-white w-full shadow-sm"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <div className="flex items-center gap-3">
            <span className="font-bold text-dark-spruce-900">Category:</span>
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => handleFilterChange(setSelectedCategory, category)}
                  className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-colors ${
                    selectedCategory === category 
                      ? 'bg-dark-spruce-800 text-soft-linen-50' 
                      : 'bg-dry-sage-200 text-dark-spruce-800 hover:bg-dry-sage-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 relative mt-4 md:mt-0 z-20">
            <span className="font-bold text-dark-spruce-900">Sort By:</span>
            
            <div className="relative">
              <button 
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="bg-white border border-dry-sage-300 rounded-md py-2 px-4 flex items-center justify-between min-w-[220px] text-dark-spruce-800 font-medium hover:border-dry-sage-400 focus:outline-none transition-colors shadow-sm"
              >
                {sortBy} 
                <FiChevronDown className={`transition-transform duration-200 ${isSortOpen ? 'rotate-180' : ''}`} />
              </button>

              {isSortOpen && (
                <div className="absolute top-full right-0 md:left-0 mt-2 w-full bg-white border border-dry-sage-200 rounded-md shadow-lg overflow-hidden">
                  {sortOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSortBy(option);
                        setIsSortOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-soft-linen-100 transition-colors flex items-center gap-2"
                    >
                      <span className="w-4">
                        {sortBy === option && <FiCheck className="text-fern-600 font-bold" />}
                      </span>
                      <span className={sortBy === option ? 'text-fern-700 font-bold' : 'text-dark-spruce-700'}>
                        {option}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <hr className="border-dry-sage-300 border-2 mb-8 rounded-full" />

        {displayedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-12">
            {displayedProducts.map(product => (
              <div key={product.id} className="bg-white rounded-xl p-5 shadow-sm border border-dry-sage-200 flex flex-col hover:shadow-md transition-shadow">
                
                {/* Dynamic Image Area */}
                <div className="h-56 w-full bg-tuscan-sun-50 rounded-lg mb-4 flex items-center justify-center p-4 border border-dry-sage-100">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="max-h-full object-contain drop-shadow-md" />
                  ) : (
                    <span className="text-tuscan-sun-300 text-6xl font-bold opacity-50">
                      {product.name.charAt(0)}
                    </span>
                  )}
                </div>
                
                <div className="flex flex-col flex-grow">
                  <span className="text-xs font-bold text-fern-600 uppercase tracking-wider mb-1">{product.category}</span>
                  <h3 className="text-lg font-bold text-dark-spruce-900 leading-tight mb-2">{product.name}</h3>
                  <p className="text-sm text-dark-spruce-700 mb-4 flex-grow">{product.shortDesc}</p>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-dry-sage-100">
                    <span className="text-lg font-extrabold text-dark-spruce-950">₱{product.price.toLocaleString()}</span>
                    <Link 
                      to={`/product/${product.id}`}
                      className="bg-dry-sage-200 text-dark-spruce-900 text-sm font-bold px-4 py-2 rounded hover:bg-dry-sage-300 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-dark-spruce-700">
            <p className="text-xl font-medium">No products found matching your search or filters.</p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-md font-bold text-sm bg-white border border-dry-sage-300 text-dark-spruce-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-dry-sage-100 transition-colors"
            >
              Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
              <button
                key={pageNumber}
                onClick={() => setCurrentPage(pageNumber)}
                className={`w-10 h-10 rounded-md font-bold text-sm transition-colors border ${
                  currentPage === pageNumber
                    ? 'bg-dark-spruce-800 text-soft-linen-50 border-dark-spruce-800'
                    : 'bg-white border-dry-sage-300 text-dark-spruce-800 hover:bg-dry-sage-100'
                }`}
              >
                {pageNumber}
              </button>
            ))}

            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-md font-bold text-sm bg-white border border-dry-sage-300 text-dark-spruce-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-dry-sage-100 transition-colors"
            >
              Next
            </button>
          </div>
        )}

      </div>
    </div>
  );
}