import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Checkout() {
  const [fontAwesomeLoaded, setFontAwesomeLoaded] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    saveCard: false
  });

  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('card');

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    link.onload = () => setFontAwesomeLoaded(true);
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const cartItems = [
    { id: 1, name: 'Wireless Headphones', price: 79.99, quantity: 1, image: '🎧' },
    { id: 2, name: 'Smart Watch', price: 199.99, quantity: 2, image: '⌚' },
    { id: 3, name: 'Laptop Backpack', price: 49.99, quantity: 1, image: '🎒' }
  ];

  const shippingOptions = [
    { id: 'standard', name: 'Standard Shipping', time: '5-7 business days', price: 9.99 },
    { id: 'express', name: 'Express Shipping', time: '2-3 business days', price: 19.99 },
    { id: 'overnight', name: 'Overnight Shipping', time: '1 business day', price: 39.99 }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const selectedShipping = shippingOptions.find(opt => opt.id === shippingMethod);
  const shipping = selectedShipping ? selectedShipping.price : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleShippingChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value
    });
  };

  const handlePaymentChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPaymentInfo({
      ...paymentInfo,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : value;
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setPaymentInfo({
      ...paymentInfo,
      cardNumber: formatted
    });
  };

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
  };

  if (!fontAwesomeLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-check text-green-600 text-4xl"></i>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
            <p className="text-gray-600 mb-6">Thank you for your purchase. Your order has been placed successfully.</p>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Order Number</span>
                <span className="font-semibold text-gray-900">#ORD-2024-{Math.floor(Math.random() * 1000)}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Total Amount</span>
                <span className="font-semibold text-gray-900">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Estimated Delivery</span>
                <span className="font-semibold text-gray-900">{selectedShipping.time}</span>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-6">
              A confirmation email has been sent to <span className="font-medium">{shippingInfo.email}</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/" className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold">
                <i className="fas fa-shopping-bag mr-2"></i>
                Continue Shopping
              </Link>
              <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold">
                <i className="fas fa-file-alt mr-2"></i>
                View Order Details
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center ${currentStep >= 1 ? 'text-purple-600' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${currentStep >= 1 ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}>
                  {currentStep > 1 ? <i className="fas fa-check"></i> : '1'}
                </div>
                <span className="ml-2 hidden sm:inline font-medium">Shipping</span>
              </div>
              <div className={`w-16 h-1 ${currentStep >= 2 ? 'bg-purple-600' : 'bg-gray-200'}`}></div>
              <div className={`flex items-center ${currentStep >= 2 ? 'text-purple-600' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${currentStep >= 2 ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}>
                  {currentStep > 2 ? <i className="fas fa-check"></i> : '2'}
                </div>
                <span className="ml-2 hidden sm:inline font-medium">Payment</span>
              </div>
              <div className={`w-16 h-1 ${currentStep >= 3 ? 'bg-purple-600' : 'bg-gray-200'}`}></div>
              <div className={`flex items-center ${currentStep >= 3 ? 'text-purple-600' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${currentStep >= 3 ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}>
                  3
                </div>
                <span className="ml-2 hidden sm:inline font-medium">Review</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping Information */}
            {currentStep === 1 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={shippingInfo.firstName}
                      onChange={handleShippingChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={shippingInfo.lastName}
                      onChange={handleShippingChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={shippingInfo.email}
                    onChange={handleShippingChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={shippingInfo.phone}
                    onChange={handleShippingChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={shippingInfo.address}
                    onChange={handleShippingChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Street address"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Apartment, suite, etc. (optional)
                  </label>
                  <input
                    type="text"
                    name="apartment"
                    value={shippingInfo.apartment}
                    onChange={handleShippingChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={shippingInfo.city}
                      onChange={handleShippingChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={shippingInfo.state}
                      onChange={handleShippingChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ZIP Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={shippingInfo.zipCode}
                      onChange={handleShippingChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                </div>

                {/* Shipping Method */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Method</h3>
                  <div className="space-y-3">
                    {shippingOptions.map((option) => (
                      <label
                        key={option.id}
                        className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition ${
                          shippingMethod === option.id
                            ? 'border-purple-600 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="shippingMethod"
                            value={option.id}
                            checked={shippingMethod === option.id}
                            onChange={(e) => setShippingMethod(e.target.value)}
                            className="w-5 h-5 text-purple-600"
                          />
                          <div className="ml-4">
                            <p className="font-medium text-gray-900">{option.name}</p>
                            <p className="text-sm text-gray-600">{option.time}</p>
                          </div>
                        </div>
                        <span className="font-semibold text-gray-900">${option.price.toFixed(2)}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold"
                  >
                    Continue to Payment
                    <i className="fas fa-arrow-right ml-2"></i>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Payment Information */}
            {currentStep === 2 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Payment Information</h2>
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-purple-600 hover:text-purple-700 font-medium text-sm"
                  >
                    <i className="fas fa-arrow-left mr-1"></i>
                    Back
                  </button>
                </div>

                {/* Payment Method Selection */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Payment Method</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <label
                      className={`flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer transition ${
                        paymentMethod === 'card'
                          ? 'border-purple-600 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="sr-only"
                      />
                      <i className="fas fa-credit-card text-3xl mb-2 text-purple-600"></i>
                      <span className="font-medium">Credit Card</span>
                    </label>
                    <label
                      className={`flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer transition ${
                        paymentMethod === 'paypal'
                          ? 'border-purple-600 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        checked={paymentMethod === 'paypal'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="sr-only"
                      />
                      <i className="fab fa-paypal text-3xl mb-2 text-blue-600"></i>
                      <span className="font-medium">PayPal</span>
                    </label>
                    <label
                      className={`flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer transition ${
                        paymentMethod === 'crypto'
                          ? 'border-purple-600 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="crypto"
                        checked={paymentMethod === 'crypto'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="sr-only"
                      />
                      <i className="fab fa-bitcoin text-3xl mb-2 text-yellow-600"></i>
                      <span className="font-medium">Crypto</span>
                    </label>
                  </div>
                </div>

                {/* Card Details */}
                {paymentMethod === 'card' && (
                  <div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="cardNumber"
                          value={paymentInfo.cardNumber}
                          onChange={handleCardNumberChange}
                          maxLength="19"
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          required
                        />
                        <div className="absolute right-3 top-2.5 flex space-x-2">
                          <i className="fab fa-cc-visa text-blue-600 text-xl"></i>
                          <i className="fab fa-cc-mastercard text-red-600 text-xl"></i>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cardholder Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="cardName"
                        value={paymentInfo.cardName}
                        onChange={handlePaymentChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={paymentInfo.expiryDate}
                          onChange={handlePaymentChange}
                          placeholder="MM/YY"
                          maxLength="5"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={paymentInfo.cvv}
                          onChange={handlePaymentChange}
                          placeholder="123"
                          maxLength="4"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          required
                        />
                      </div>
                    </div>

                    <label className="flex items-center mb-6">
                      <input
                        type="checkbox"
                        name="saveCard"
                        checked={paymentInfo.saveCard}
                        onChange={handlePaymentChange}
                        className="w-4 h-4 text-purple-600 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Save this card for future purchases</span>
                    </label>
                  </div>
                )}

                {paymentMethod === 'paypal' && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                    <i className="fab fa-paypal text-5xl text-blue-600 mb-4"></i>
                    <p className="text-gray-700 mb-4">You will be redirected to PayPal to complete your purchase</p>
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
                      <i className="fab fa-paypal mr-2"></i>
                      Continue with PayPal
                    </button>
                  </div>
                )}

                {paymentMethod === 'crypto' && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                    <i className="fab fa-bitcoin text-5xl text-yellow-600 mb-4"></i>
                    <p className="text-gray-700 mb-4">Pay with Bitcoin, Ethereum, or other cryptocurrencies</p>
                    <button className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition font-semibold">
                      <i className="fab fa-bitcoin mr-2"></i>
                      Continue with Crypto
                    </button>
                  </div>
                )}

                <div className="flex justify-between mt-6">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
                  >
                    <i className="fas fa-arrow-left mr-2"></i>
                    Back
                  </button>
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold"
                  >
                    Review Order
                    <i className="fas fa-arrow-right ml-2"></i>
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Review Order */}
            {currentStep === 3 && (
              <div className="space-y-6">
                {/* Shipping Details */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Shipping Address</h3>
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="text-gray-700">
                    <p className="font-medium">{shippingInfo.firstName} {shippingInfo.lastName}</p>
                    <p>{shippingInfo.address}</p>
                    {shippingInfo.apartment && <p>{shippingInfo.apartment}</p>}
                    <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
                    <p>{shippingInfo.country}</p>
                    <p className="mt-2">{shippingInfo.phone}</p>
                    <p>{shippingInfo.email}</p>
                  </div>
                </div>

                {/* Payment Details */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Payment Method</h3>
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="flex items-center space-x-3">
                    <i className="fas fa-credit-card text-2xl text-gray-600"></i>
                    <div>
                      <p className="font-medium text-gray-900">
                        {paymentMethod === 'card' && `Card ending in ${paymentInfo.cardNumber.slice(-4)}`}
                        {paymentMethod === 'paypal' && 'PayPal'}
                        {paymentMethod === 'crypto' && 'Cryptocurrency'}
                      </p>
                      {paymentMethod === 'card' && <p className="text-sm text-gray-600">{paymentInfo.cardName}</p>}
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h3>
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 pb-4 border-b border-gray-200 last:border-0">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                          {item.image}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <span className="font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Terms and Place Order */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <label className="flex items-start mb-6">
                    <input
                      type="checkbox"
                      className="w-5 h-5 text-purple-600 rounded mt-1"
                      required
                    />
                    <span className="ml-3 text-sm text-gray-700">
                      I agree to the <a href="#" className="text-purple-600 hover:underline">Terms and Conditions</a> and <a href="#" className="text-purple-600 hover:underline">Privacy Policy</a>
                    </span>
                  </label>

                  <div className="flex justify-between">
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
                    >
                      <i className="fas fa-arrow-left mr-2"></i>
                      Back
                    </button>
                    <button
                      onClick={handlePlaceOrder}
                      className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold"
                    >
                      <i className="fas fa-lock mr-2"></i>
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h3>
              
              {/* Cart Items Preview */}
              <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center text-xl flex-shrink-0">
                      {item.image}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                      <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-medium">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (8%)</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <i className="fas fa-shield-alt text-green-600"></i>
                  <span>Secure SSL Encryption</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="fas fa-undo text-green-600"></i>
                  <span>30-Day Return Policy</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="fas fa-truck text-green-600"></i>
                  <span>Free Shipping on Orders $100+</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="fas fa-headset text-green-600"></i>
                  <span>24/7 Customer Support</span>
                </div>
              </div>

              {/* Payment Icons */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-600 mb-3 text-center">We Accept</p>
                <div className="flex justify-center space-x-2">
                  <div className="w-10 h-7 bg-gray-100 rounded flex items-center justify-center">
                    <i className="fab fa-cc-visa text-blue-600"></i>
                  </div>
                  <div className="w-10 h-7 bg-gray-100 rounded flex items-center justify-center">
                    <i className="fab fa-cc-mastercard text-red-600"></i>
                  </div>
                  <div className="w-10 h-7 bg-gray-100 rounded flex items-center justify-center">
                    <i className="fab fa-cc-amex text-blue-500"></i>
                  </div>
                  <div className="w-10 h-7 bg-gray-100 rounded flex items-center justify-center">
                    <i className="fab fa-cc-paypal text-blue-600"></i>
                  </div>
                  <div className="w-10 h-7 bg-gray-100 rounded flex items-center justify-center">
                    <i className="fab fa-bitcoin text-yellow-600"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}