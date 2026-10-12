import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiShield, FiTruck, FiRefreshCw, FiCheckCircle, FiCreditCard } from 'react-icons/fi';

export default function Checkout({ cartItems, processCheckout }) {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    email: '', fullName: '', address1: '', address2: '', city: '', province: '', zipCode: '', country: 'Philippines',
    nameOnCard: '', cardNumber: '', expiry: '', cvv: ''
  });

  const [errors, setErrors] = useState({});

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 10000 || subtotal === 0 ? 0 : 500;
  const discount = subtotal > 15000 ? subtotal * 0.1 : 0; 
  const total = subtotal + shipping - discount;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.fullName.trim()) newErrors.fullName = 'Name is required';
    if (!formData.address1.trim()) newErrors.address1 = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.province.trim()) newErrors.province = 'Province is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.nameOnCard.trim()) newErrors.nameOnCard = 'Name on card is required';
    if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
    if (!formData.expiry.trim()) newErrors.expiry = 'Expiry date is required';
    if (!formData.cvv.trim()) newErrors.cvv = 'CVV is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePlaceOrder = () => {
    processCheckout();
    setStep(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (step === 4) {
    return (
      <div className="bg-soft-linen-50 min-h-[80vh] py-20 px-8 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-sm border border-dry-sage-200 text-center">
          <div className="w-16 h-16 bg-fern-100 text-fern-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiCheckCircle size={36} />
          </div>
          <h2 className="text-4xl font-garamond font-extrabold text-dark-spruce-900 mb-2">Order Confirmed!</h2>
          <p className="text-dark-spruce-700 mb-6">
            Thank you for your purchase. A receipt has been sent to <span className="font-semibold">{formData.email}</span>.
          </p>
          <div className="bg-dry-sage-50 rounded-lg p-4 mb-8 text-left text-sm text-dark-spruce-800 border border-dry-sage-200">
            <p className="font-bold mb-1">Shipping To:</p>
            <p>{formData.fullName}</p>
            <p>{formData.address1}</p>
            <p>{formData.city}, {formData.province}</p>
          </div>
          <Link to="/catalog" className="w-full block bg-dark-spruce-800 text-soft-linen-50 font-bold py-3 rounded-md shadow hover:bg-dark-spruce-700 transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const renderStepper = () => (
    <div className="flex items-center gap-2 sm:gap-4 mb-10 text-xs sm:text-sm font-semibold">
      <div className={`flex items-center gap-2 ${step >= 1 ? 'text-dark-spruce-900' : 'text-dry-sage-500'}`}>
        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 1 ? 'bg-dark-spruce-800 text-soft-linen-50' : 'border-2 border-dry-sage-300 text-dry-sage-500'}`}>
          {step > 1 ? '✓' : '1'}
        </span>
        <span>Shipping</span>
      </div>
      <div className="w-6 sm:w-10 h-px bg-dry-sage-300"></div>
      
      <div className={`flex items-center gap-2 ${step >= 2 ? 'text-dark-spruce-900' : 'text-dry-sage-500'}`}>
        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 2 ? 'bg-dark-spruce-800 text-soft-linen-50' : 'border-2 border-dry-sage-300 text-dry-sage-500'}`}>
          {step > 2 ? '✓' : '2'}
        </span>
        <span>Payment</span>
      </div>
      <div className="w-6 sm:w-10 h-px bg-dry-sage-300"></div>
      
      <div className={`flex items-center gap-2 ${step === 3 ? 'text-dark-spruce-900' : 'text-dry-sage-500'}`}>
        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === 3 ? 'bg-dark-spruce-800 text-soft-linen-50' : 'border-2 border-dry-sage-300 text-dry-sage-500'}`}>
          3
        </span>
        <span>Review</span>
      </div>
    </div>
  );

  return (
    <div className="bg-soft-linen-50 min-h-screen py-10 px-6 font-sans text-dark-spruce-900">
      <div className="max-w-5xl mx-auto">
        
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={() => step > 1 ? setStep(step - 1) : navigate('/cart')}
            className="flex items-center gap-2 text-fern-700 hover:text-fern-800 font-bold transition-colors"
          >
            <FiArrowLeft/> {step > 1 ? 'Back to previous step' : 'Back to Cart'}
          </button>
        </div>

        <h1 className="text-4xl font-garamond font-extrabold mb-6">Checkout</h1>
        
        {renderStepper()}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-7">
            
            {step === 1 && (
              <form onSubmit={handleShippingSubmit} className="flex flex-col gap-8">
                <div>
                  <h3 className="text-lg font-bold mb-4">Contact Information</h3>
                  <input type="email" name="email" placeholder="Email address" value={formData.email} onChange={handleChange} className={`w-full p-3.5 rounded-md border bg-white text-sm focus:outline-none focus:ring-2 ${errors.email ? 'border-red-400 focus:ring-red-400' : 'border-dry-sage-300 focus:ring-fern-500'}`} />
                  {errors.email && <span className="text-red-500 text-xs mt-1 block font-medium">{errors.email}</span>}
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-4">Shipping Address</h3>
                  <div className="flex flex-col gap-4">
                    <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} className={`w-full p-3.5 rounded-md border bg-white text-sm ${errors.fullName ? 'border-red-400' : 'border-dry-sage-300 focus:ring-fern-500'}`} />
                    <input type="text" name="address1" placeholder="Address Line 1" value={formData.address1} onChange={handleChange} className={`w-full p-3.5 rounded-md border bg-white text-sm ${errors.address1 ? 'border-red-400' : 'border-dry-sage-300 focus:ring-fern-500'}`} />
                    <input type="text" name="address2" placeholder="Address Line 2 (Optional)" value={formData.address2} onChange={handleChange} className="w-full p-3.5 rounded-md border border-dry-sage-300 bg-white text-sm focus:ring-fern-500" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} className={`w-full p-3.5 rounded-md border bg-white text-sm ${errors.city ? 'border-red-400' : 'border-dry-sage-300 focus:ring-fern-500'}`} />
                      <select name="province" value={formData.province} onChange={handleChange} className={`w-full p-3.5 rounded-md border bg-white text-sm appearance-none ${errors.province ? 'border-red-400' : 'border-dry-sage-300 focus:ring-fern-500'}`}>
                        <option value="">State / Province</option>
                        <option value="Metro Manila">Metro Manila</option>
                        <option value="Snezhnaya Region">Snezhnaya Region</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input type="text" name="zipCode" placeholder="ZIP / Postal Code" value={formData.zipCode} onChange={handleChange} className={`w-full p-3.5 rounded-md border bg-white text-sm ${errors.zipCode ? 'border-red-400' : 'border-dry-sage-300 focus:ring-fern-500'}`} />
                      <select name="country" value={formData.country} onChange={handleChange} className="w-full p-3.5 rounded-md border border-dry-sage-300 bg-white text-sm appearance-none">
                        <option value="Philippines">Philippines</option>
                        <option value="Russia">Russia</option>
                        <option value="International">International</option>
                      </select>
                    </div>
                  </div>
                </div>

                <button type="submit" className="w-full bg-dark-spruce-800 text-soft-linen-50 font-bold text-lg py-4 rounded-md shadow-md hover:bg-dark-spruce-700 transition-all flex justify-center items-center gap-2 mt-4">
                  Continue to Payment <FiArrowLeft className="rotate-180"/>
                </button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handlePaymentSubmit} className="flex flex-col gap-8">
                <div>
                  <h3 className="text-lg font-bold mb-2">Payment Details</h3>
                  <p className="text-sm text-dark-spruce-600 mb-6">All transactions are secure and encrypted.</p>
                  
                  <div className="bg-white p-6 rounded-lg border border-dry-sage-300 shadow-sm flex flex-col gap-4">
                    
                    <div className="flex items-center gap-2 mb-2 text-dark-spruce-800 font-bold">
                      <FiCreditCard size={20} /> Credit or Debit Card
                    </div>

                    <div>
                      <input type="text" name="nameOnCard" placeholder="Name on Card" value={formData.nameOnCard} onChange={handleChange} className={`w-full p-3.5 rounded-md border bg-white text-sm ${errors.nameOnCard ? 'border-red-400' : 'border-dry-sage-300 focus:ring-fern-500'}`} />
                      {errors.nameOnCard && <span className="text-red-500 text-xs mt-1 block font-medium">{errors.nameOnCard}</span>}
                    </div>

                    <div>
                      <input type="text" name="cardNumber" placeholder="Card Number (e.g. 4111 1111 1111 1111)" value={formData.cardNumber} onChange={handleChange} maxLength="16" className={`w-full p-3.5 rounded-md border bg-white text-sm ${errors.cardNumber ? 'border-red-400' : 'border-dry-sage-300 focus:ring-fern-500'}`} />
                      {errors.cardNumber && <span className="text-red-500 text-xs mt-1 block font-medium">{errors.cardNumber}</span>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <input type="text" name="expiry" placeholder="Expiration (MM/YY)" value={formData.expiry} onChange={handleChange} maxLength="5" className={`w-full p-3.5 rounded-md border bg-white text-sm ${errors.expiry ? 'border-red-400' : 'border-dry-sage-300 focus:ring-fern-500'}`} />
                        {errors.expiry && <span className="text-red-500 text-xs mt-1 block font-medium">{errors.expiry}</span>}
                      </div>
                      <div>
                        <input type="text" name="cvv" placeholder="CVV" value={formData.cvv} onChange={handleChange} maxLength="4" className={`w-full p-3.5 rounded-md border bg-white text-sm ${errors.cvv ? 'border-red-400' : 'border-dry-sage-300 focus:ring-fern-500'}`} />
                        {errors.cvv && <span className="text-red-500 text-xs mt-1 block font-medium">{errors.cvv}</span>}
                      </div>
                    </div>
                  </div>
                </div>

                <button type="submit" className="w-full bg-dark-spruce-800 text-soft-linen-50 font-bold text-lg py-4 rounded-md shadow-md hover:bg-dark-spruce-700 transition-all flex justify-center items-center gap-2 mt-4">
                  Review Order <FiArrowLeft className="rotate-180"/>
                </button>
              </form>
            )}

            {step === 3 && (
              <div className="flex flex-col gap-8">
                <div>
                  <h3 className="text-lg font-bold mb-4">Review Your Details</h3>
                  
                  <div className="bg-white border border-dry-sage-200 rounded-lg overflow-hidden shadow-sm text-sm">
                    {/* Shipping Review */}
                    <div className="p-6 border-b border-dry-sage-200 flex justify-between items-start">
                      <div>
                        <p className="font-bold text-dark-spruce-900 mb-2">Shipping Address</p>
                        <p className="text-dark-spruce-700">{formData.fullName}</p>
                        <p className="text-dark-spruce-700">{formData.address1} {formData.address2}</p>
                        <p className="text-dark-spruce-700">{formData.city}, {formData.province} {formData.zipCode}</p>
                        <p className="text-dark-spruce-700">{formData.country}</p>
                      </div>
                      <button onClick={() => setStep(1)} className="text-fern-600 font-bold hover:underline">Edit</button>
                    </div>

                    <div className="p-6 flex justify-between items-start">
                      <div>
                        <p className="font-bold text-dark-spruce-900 mb-2">Payment Method</p>
                        <p className="text-dark-spruce-700 flex items-center gap-2">
                          <FiCreditCard /> Card ending in {formData.cardNumber.slice(-4) || 'XXXX'}
                        </p>
                        <p className="text-dark-spruce-700">Name: {formData.nameOnCard}</p>
                      </div>
                      <button onClick={() => setStep(2)} className="text-fern-600 font-bold hover:underline">Edit</button>
                    </div>
                  </div>
                </div>

                <button onClick={handlePlaceOrder} className="w-full bg-fern-700 text-soft-linen-50 font-bold text-lg py-4 rounded-md shadow-md hover:bg-fern-800 transition-all flex justify-center items-center gap-2 mt-4">
                  Place Order
                </button>
              </div>
            )}

          </div>

          <div className="lg:col-span-5">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-dry-sage-200 sticky top-24">
              <h3 className="text-xl font-bold mb-6">Order Summary</h3>

              <div className="flex flex-col gap-6 mb-8 max-h-80 overflow-y-auto pr-2">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-20 bg-tuscan-sun-50 rounded-md flex-shrink-0 flex items-center justify-center p-2 border border-dry-sage-100">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="max-h-full object-contain" />
                      ) : (
                        <span className="text-tuscan-sun-300 font-bold text-xl">{item.name.charAt(0)}</span>
                      )}
                    </div>
                    <div className="flex-grow flex flex-col justify-center">
                      <h4 className="text-sm font-bold text-dark-spruce-900 leading-tight mb-1">{item.name}</h4>
                      <p className="text-xs text-dark-spruce-600 mb-2">Category: {item.category} • Qty: {item.quantity}</p>
                      <span className="text-sm font-extrabold text-dark-spruce-950">₱{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>

              <hr className="border-dry-sage-200 mb-6" />

              <div className="space-y-4 text-sm mb-6 font-medium text-dark-spruce-800">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₱{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `₱${shipping.toLocaleString()}`}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-fern-700">
                    <span>Discount</span>
                    <span>-₱{discount.toLocaleString()}</span>
                  </div>
                )}
              </div>

              <hr className="border-dry-sage-200 mb-6" />

              <div className="flex justify-between items-center mb-10">
                <span className="text-lg font-extrabold text-dark-spruce-900">Total</span>
                <span className="text-2xl font-extrabold text-fern-700">₱{total.toLocaleString()}</span>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 text-center text-dark-spruce-700">
                <div className="flex flex-col items-center gap-1.5"><FiShield className="w-6 h-6 text-dark-spruce-800"/><span className="text-xs font-semibold">Secure<br/>Checkout</span></div>
                <div className="flex flex-col items-center gap-1.5"><FiTruck className="w-6 h-6 text-dark-spruce-800"/><span className="text-xs font-semibold">Free<br/>Shipping</span></div>
                <div className="flex flex-col items-center gap-1.5"><FiRefreshCw className="w-6 h-6 text-dark-spruce-800"/><span className="text-xs font-semibold">Easy<br/>Returns</span></div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}