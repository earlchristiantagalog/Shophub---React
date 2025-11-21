import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function CartPage() {
  const [fontAwesomeLoaded, setFontAwesomeLoaded] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Wireless Headphones',
      price: 79.99,
      quantity: 1,
      image: '🎧',
      color: 'Black',
      inStock: true
    },
    {
      id: 2,
      name: 'Smart Watch',
      price: 199.99,
      quantity: 2,
      image: '⌚',
      color: 'Silver',
      inStock: true
    },
    {
      id: 3,
      name: 'Laptop Backpack',
      price: 49.99,
      quantity: 1,
      image: '🎒',
      color: 'Blue',
      inStock: true
    },
    {
      id: 4,
      name: 'Coffee Maker',
      price: 89.99,
      quantity: 1,
      image: '☕',
      color: 'Stainless Steel',
      inStock: false
    }
  ]);

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

  const updateQuantity = (id, delta) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === 'SAVE10') {
      setPromoApplied(true);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + shipping + tax;

  const suggestedProducts = [
    { id: 5, name: 'Phone Case', price: 19.99, image: '📱' },
    { id: 6, name: 'USB Cable', price: 12.99, image: '🔌' },
    { id: 7, name: 'Screen Protector', price: 14.99, image: '📲' },
  ];

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:text-gray-900">Home</Link>
          <i className="fas fa-chevron-right text-xs"></i>
          <a href="#" className="hover:text-gray-900">Shop</a>
          <i className="fas fa-chevron-right text-xs"></i>
          <span className="text-gray-900 font-medium">Shopping Cart</span>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h3>
            <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet</p>
            <button className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
              <i className="fas fa-shopping-bag mr-2"></i>
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {/* Free Shipping Banner */}
              {subtotal < 100 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center space-x-3">
                  <i className="fas fa-truck text-blue-600 text-xl"></i>
                  <div>
                    <p className="text-blue-900 font-medium">
                      Add ${(100 - subtotal).toFixed(2)} more to get FREE shipping!
                    </p>
                    <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${(subtotal / 100) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-start space-x-4">
                    {/* Product Image */}
                    <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center text-4xl flex-shrink-0">
                      {item.image}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg">{item.name}</h3>
                          <p className="text-sm text-gray-600">Color: {item.color}</p>
                          {!item.inStock && (
                            <span className="inline-block mt-1 px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                              <i className="fas fa-exclamation-circle mr-1"></i>
                              Out of Stock
                            </span>
                          )}
                          {item.inStock && (
                            <span className="inline-block mt-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                              <i className="fas fa-check-circle mr-1"></i>
                              In Stock
                            </span>
                          )}
                        </div>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-600 transition"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition"
                            disabled={item.quantity === 1}
                          >
                            <i className="fas fa-minus text-xs"></i>
                          </button>
                          <span className="w-12 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition"
                          >
                            <i className="fas fa-plus text-xs"></i>
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="text-xl font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                          <p className="text-sm text-gray-600">${item.price.toFixed(2)} each</p>
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="flex items-center space-x-4 mt-4 pt-4 border-t border-gray-200">
                        <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                          <i className="far fa-heart mr-1"></i>
                          Save for Later
                        </button>
                        <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                          <i className="fas fa-share-alt mr-1"></i>
                          Share
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Promo Code */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Have a promo code?</h3>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    onClick={applyPromoCode}
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                  >
                    Apply
                  </button>
                </div>
                {promoApplied && (
                  <div className="mt-3 flex items-center space-x-2 text-green-600">
                    <i className="fas fa-check-circle"></i>
                    <span className="text-sm font-medium">Promo code applied successfully!</span>
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-2">Try code: SAVE10 for 10% off</p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h3>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  {promoApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount (10%)</span>
                      <span className="font-medium">-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
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

                <Link to="/checkout"><button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition font-semibold mb-3">
                  <i className="fas fa-lock mr-2"></i>
                  Proceed to Checkout
                </button></Link>

                <Link to="/"><button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition font-semibold">
                 <i className="fas fa-shopping-bag mr-2"></i>
                  Continue Shopping
                </button></Link>
                

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">We Accept</h4>
                  <div className="flex space-x-2">
                    <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                      <i className="fab fa-cc-visa text-blue-600"></i>
                    </div>
                    <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                      <i className="fab fa-cc-mastercard text-red-600"></i>
                    </div>
                    <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                      <i className="fab fa-cc-amex text-blue-500"></i>
                    </div>
                    <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                      <i className="fab fa-cc-paypal text-blue-600"></i>
                    </div>
                  </div>
                </div>

                {/* Security Badge */}
                <div className="mt-4 flex items-center space-x-2 text-sm text-gray-600">
                  <i className="fas fa-shield-alt text-green-600"></i>
                  <span>Secure checkout guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Suggested Products */}
        {cartItems.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">You might also like</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {suggestedProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                  <div className="bg-gray-100 h-40 flex items-center justify-center text-5xl">
                    {product.image}
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">{product.name}</h4>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-gray-900">${product.price}</span>
                      <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}