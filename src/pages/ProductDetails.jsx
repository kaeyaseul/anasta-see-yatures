import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiMinus, FiPlus, FiShoppingCart, FiCheckCircle } from 'react-icons/fi';

export default function ProductDetails({ products, addToCart, cartItems }) {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const product = products.find(p => p.id === parseInt(id));
  
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [stockError, setStockError] = useState(""); 

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-soft-linen-50">
        <h2 className="text-3xl font-bold text-dark-spruce-900 mb-4">Product Not Found</h2>
        <Link to="/catalog" className="text-fern-600 font-bold hover:underline">Return to Catalog</Link>
      </div>
    );
  }

  const existingCartItem = cartItems?.find(item => item.id === product.id);
  const inCartQuantity = existingCartItem ? existingCartItem.quantity : 0;
  const availableStock = product.stock - inCartQuantity;
  
  const isSoldOut = product.stock === 0;

  const handleAddToCart = () => {
    if (availableStock === 0) {
      setStockError(`You already have all ${product.stock} available units in your cart!`);
      return;
    }
    if (quantity > availableStock) {
      setStockError(`You already have ${inCartQuantity} in your cart. You can only add ${availableStock} more.`);
      return;
    }

    setStockError("");
    addToCart(product, quantity); 
    setShowModal(true); 
  };

  return (
    <div className="bg-soft-linen-50 min-h-screen py-12 px-8">
      <div className="max-w-6xl mx-auto">
        
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-dark-spruce-700 hover:text-dark-spruce-900 font-medium mt-8 mb-10 transition-colors"
        >
          <FiArrowLeft /> Back to Catalog
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          
          <div className="w-full h-[400px] md:h-[500px] bg-white rounded-2xl p-8 border border-dry-sage-200 shadow-sm flex items-center justify-center relative">
            
            <div className="absolute top-4 right-4 md:top-6 md:right-6">
              <span className={`px-4 py-1.5 rounded-full text-xs font-bold inline-block whitespace-nowrap shadow-sm ${
                isSoldOut 
                  ? 'bg-red-100 text-red-800 border border-red-200'
                  : product.stock > 3 
                    ? 'bg-fern-100 text-fern-800 border border-fern-200' 
                    : 'bg-tuscan-sun-100 text-tuscan-sun-800 border border-tuscan-sun-200'
              }`}>
                {isSoldOut ? 'Sold Out' : product.stock > 3 ? 'In Stock' : `Only ${product.stock} left`}
              </span>
            </div>
            
            {product.image ? (
              <img src={product.image} alt={product.name} className="max-h-full object-contain drop-shadow-lg" />
            ) : (
              <span className="text-tuscan-sun-300 text-9xl font-bold opacity-50">
                {product.name.charAt(0)}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-bold text-fern-600 uppercase tracking-widest mb-2">{product.category}</span>
            <h1 className="text-4xl md:text-5xl font-garamond font-extrabold text-dark-spruce-900 mb-4 leading-tight">{product.name}</h1>
            <p className="text-3xl font-bold text-dark-spruce-800 mb-8">₱{product.price.toLocaleString()}</p>
            
            <hr className="border-dry-sage-200 mb-8" />
            
            <div className="mb-10">
              <h3 className="text-lg font-bold text-dark-spruce-900 mb-3">Product Description</h3>
              <p className="text-dark-spruce-700 leading-relaxed text-lg">
                {product.shortDesc} Designed with the iconic Snezhnayan aesthetic, this piece bridges the gap between functional furniture and sculptural art. Crafted from premium materials to ensure timeless durability.
              </p>
            </div>

            {stockError && !isSoldOut && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 font-semibold rounded-md text-sm">
                {stockError}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex items-center justify-between border-2 border-dry-sage-300 rounded-md bg-white w-full sm:w-auto">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-5 py-3 text-dark-spruce-700 hover:bg-dry-sage-100 transition-colors disabled:opacity-50"
                  disabled={availableStock === 0}
                >
                  <FiMinus />
                </button>
                <span className="w-12 text-center font-bold text-lg text-dark-spruce-900">
                  {availableStock === 0 ? 0 : quantity}
                </span>
                
                <button 
                  onClick={() => setQuantity(Math.min(availableStock, quantity + 1))}
                  className="px-5 py-3 text-dark-spruce-700 hover:bg-dry-sage-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={quantity >= availableStock || availableStock === 0}
                >
                  <FiPlus />
                </button>
              </div>

              <button 
                onClick={handleAddToCart}
                disabled={availableStock === 0}
                className={`flex-1 flex items-center justify-center gap-2 font-bold text-lg px-8 py-4 rounded-md shadow-md transition-all ${
                  availableStock === 0 
                    ? 'bg-dry-sage-300 text-dry-sage-500 cursor-not-allowed' 
                    : 'bg-dark-spruce-800 text-soft-linen-50 hover:bg-dark-spruce-700 hover:scale-[1.02]'
                }`}
              >
                <FiShoppingCart size={20} /> 
                {isSoldOut ? 'Sold Out' : availableStock === 0 ? 'Limit Reached' : 'Add to Cart'}
              </button>
            </div>

            <p className="text-sm text-dry-sage-600 font-medium">Free standard shipping. Returns accepted within 30 days.</p>
          </div>

        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark-spruce-900/60 backdrop-blur-sm px-4 transition-opacity">
          <div className="bg-soft-linen-50 rounded-2xl p-8 max-w-md w-full shadow-2xl flex flex-col items-center">
            
            <div className="text-3xl font-garamond font-extrabold text-dark-spruce-900 mb-6 tracking-widest flex items-center gap-2">
              <FiCheckCircle className="text-fern-600 w-6 h-6" /> Anasta See Yatures
            </div>
            
            <h3 className="text-2xl font-bold text-dark-spruce-950 mb-2 text-center">Added to Cart!</h3>
            <p className="text-dark-spruce-700 text-center mb-10 font-medium">
              {quantity}x <span className="font-bold">{product.name}</span> has been successfully added to your shopping cart.
            </p>
            
            <div className="flex flex-col sm:flex-row w-full gap-4">
              <button 
                onClick={() => setShowModal(false)}
                className="flex-1 py-3 px-4 rounded-md font-bold border-2 border-dark-spruce-800 text-dark-spruce-800 hover:bg-dry-sage-100 transition-colors"
              >
                Continue Shopping
              </button>
              <Link 
                to="/cart"
                className="flex-1 py-3 px-4 rounded-md font-bold bg-dark-spruce-800 text-soft-linen-50 text-center hover:bg-dark-spruce-700 shadow-md transition-colors"
              >
                View Cart
              </Link>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}