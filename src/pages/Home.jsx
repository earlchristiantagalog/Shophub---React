import React, { useState, useEffect } from 'react';

export default function EcommerceHomepage() {
  const [cartCount, setCartCount] = useState(0);
  const [fontAwesomeLoaded, setFontAwesomeLoaded] = useState(false);

  useEffect(() => {
    // Load Font Awesome CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    link.onload = () => setFontAwesomeLoaded(true);
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const featuredProducts = [
    { id: 1, name: 'Wireless Headphones', price: 79.99, image: '🎧', rating: 4.5, reviews: 128 },
    { id: 2, name: 'Smart Watch', price: 199.99, image: '⌚', rating: 4.8, reviews: 256 },
    { id: 3, name: 'Laptop Backpack', price: 49.99, image: '🎒', rating: 4.3, reviews: 94 },
    { id: 4, name: 'Coffee Maker', price: 89.99, image: '☕', rating: 4.6, reviews: 182 },
  ];

  const categories = [
    { name: 'Electronics', icon: '💻', color: 'bg-blue-100' },
    { name: 'Fashion', icon: '👔', color: 'bg-pink-100' },
    { name: 'Home & Living', icon: '🏠', color: 'bg-green-100' },
    { name: 'Sports', icon: '⚽', color: 'bg-orange-100' },
  ];

  const addToCart = () => {
    setCartCount(cartCount + 1);
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <div className="flex items-center space-x-2 mb-4">
                <i className="fas fa-chart-line"></i>
                <span className="text-sm font-semibold">TRENDING NOW</span>
              </div>
              <h2 className="text-5xl font-bold mb-4">Summer Sale</h2>
              <p className="text-xl mb-6">Up to 50% off on selected items</p>
              <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-flex items-center space-x-2">
                <span>Shop Now</span>
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="text-9xl">🛍️</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h3 className="text-3xl font-bold text-gray-900 mb-8">Shop by Category</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div 
              key={index}
              className={`${category.color} p-8 rounded-xl cursor-pointer hover:shadow-lg transition transform hover:-translate-y-1`}
            >
              <div className="text-5xl mb-3">{category.icon}</div>
              <h4 className="text-lg font-semibold text-gray-800">{category.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-3xl font-bold text-gray-900">Featured Products</h3>
          <button className="text-purple-600 font-semibold hover:text-purple-700 inline-flex items-center space-x-1">
            <span>View All</span>
            <i className="fas fa-arrow-right text-sm"></i>
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
              <div className="bg-gray-100 h-48 flex items-center justify-center text-7xl">
                {product.image}
              </div>
              <div className="p-5">
                <h4 className="font-semibold text-gray-900 mb-2">{product.name}</h4>
                <div className="flex items-center mb-3">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <i 
                        key={i} 
                        className={`${i < Math.floor(product.rating) ? 'fas' : 'far'} fa-star text-sm`}
                      ></i>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                  <button 
                    onClick={addToCart}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}