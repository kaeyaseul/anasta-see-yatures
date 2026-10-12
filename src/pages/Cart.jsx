import { Link } from 'react-router-dom';
import { FiTrash2, FiMinus, FiPlus, FiArrowLeft } from 'react-icons/fi';

export default function Cart({ cartItems, updateQuantity, removeFromCart }) {
  
  // Calculate Overall Total
  const overallTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  if (cartItems.length === 0) {
    return (
      <div className="bg-soft-linen-50 min-h-screen py-20 px-8 flex flex-col items-center justify-center">
        <h2 className="text-4xl font-bold text-dark-spruce-900 mb-6">Your Cart is Empty</h2>
        <p className="text-dark-spruce-700 mb-8">Looks like you haven't added any unique pieces yet.</p>
        <Link to="/catalog" className="bg-dark-spruce-800 text-soft-linen-50 font-bold px-8 py-4 rounded-md shadow-md hover:bg-dark-spruce-700 transition-colors">
          Browse Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-soft-linen-50 min-h-screen py-12 px-8">
      <div className="max-w-7xl mx-auto">
        
        <h1 className="text-4xl font-garamond font-extrabold text-dark-spruce-900 mb-10">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 flex flex-col gap-6">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-dry-sage-200 flex flex-row items-center gap-4 sm:gap-6 relative">
   
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 text-dry-sage-500 hover:text-red-600 transition-colors"
                  aria-label="Remove item"
                >
                  <FiTrash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                <div className="w-20 h-20 sm:w-32 sm:h-32 bg-tuscan-sun-50 rounded-lg flex-shrink-0 flex items-center justify-center border border-dry-sage-100 p-1 sm:p-2">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="max-h-full object-contain drop-shadow-sm" />
                  ) : (
                    <span className="text-tuscan-sun-300 text-xl sm:text-3xl font-bold opacity-50">{item.name.charAt(0)}</span>
                  )}
                </div>

                <div className="flex-grow text-left pr-6 sm:pr-0">
                  <span className="text-[10px] sm:text-xs font-bold text-fern-600 uppercase tracking-wider block mb-0.5 sm:mb-0">{item.category}</span>
                  <h3 className="text-sm sm:text-xl font-bold text-dark-spruce-900 mb-1 leading-tight">{item.name}</h3>
                  <p className="text-xs sm:text-base text-dark-spruce-700 font-medium mb-2 sm:mb-4">₱{item.price.toLocaleString()} <span className="hidden sm:inline">each</span></p>
                  
                  <div className="flex items-center justify-start border border-dry-sage-300 rounded-md bg-white w-max">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2 py-1 sm:px-3 sm:py-1.5 text-dark-spruce-700 hover:bg-dry-sage-100 transition-colors"
                    >
                      <FiMinus className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                    <span className="w-8 sm:w-10 text-center font-bold text-sm sm:text-base text-dark-spruce-900">{item.quantity}</span>

                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className={`px-2 py-1 sm:px-3 sm:py-1.5 transition-colors ${item.quantity >= item.stock ? 'text-dry-sage-300 cursor-not-allowed' : 'text-dark-spruce-700 hover:bg-dry-sage-100'}`}
                      disabled={item.quantity >= item.stock}
                    >
                      <FiPlus className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </div>

                <div className="hidden sm:block text-right ml-auto">
                  <p className="text-sm text-dark-spruce-700 mb-1">Subtotal</p>
                  <p className="text-xl font-extrabold text-dark-spruce-950">₱{(item.price * item.quantity).toLocaleString()}</p>
                </div>

              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-dry-sage-200 sticky top-24">
              <h2 className="text-2xl font-bold text-dark-spruce-900 mb-6">Order Summary</h2>
              
              <div className="flex justify-between items-center mb-4 text-dark-spruce-800">
                <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                <span className="font-semibold">₱{overallTotal.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between items-center mb-6 text-dark-spruce-800">
                <span>Shipping</span>
                <span className="font-semibold">{overallTotal > 10000 ? 'Free' : '₱500'}</span>
              </div>

              <hr className="border-dry-sage-300 mb-6" />

              <div className="flex justify-between items-center mb-8">
                <span className="text-xl font-bold text-dark-spruce-900">Total</span>
                <span className="text-2xl font-extrabold text-dark-spruce-950">
                  ₱{(overallTotal > 10000 ? overallTotal : overallTotal + 500).toLocaleString()}
                </span>
              </div>

              <Link 
                to="/checkout" 
                className="w-full block text-center bg-dark-spruce-800 text-soft-linen-50 font-bold text-lg px-8 py-4 rounded-md shadow-md hover:bg-dark-spruce-700 transition-all"
              >
                Proceed to Checkout
              </Link>
              
              <Link 
                to="/catalog" 
                className="flex items-center justify-center gap-2 mt-6 text-fern-700 font-bold hover:text-fern-800 transition-colors"
              >
                <FiArrowLeft /> Continue Shopping
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}