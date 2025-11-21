import React, { useState, useEffect } from 'react';

export default function EcommerceHomepage() {
  const [cartCount, setCartCount] = useState(0);
  const [fontAwesomeLoaded, setFontAwesomeLoaded] = useState(false);

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

      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">

          <div className="flex flex-col md:flex-row items-center justify-between">

            {/* LEFT TEXT */}
            <div className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-2 mb-3">
                <i className="fas fa-chart-line"></i>
                <span className="text-xs md:text-sm font-semibold">TRENDING NOW</span>
              </div>

              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3 leading-tight">
                Summer Sale
              </h2>

              <p className="text-lg md:text-xl mb-6">
                Up to 50% off on selected items
              </p>

              <button className="bg-white text-purple-600 px-6 py-3 sm:px-8 rounded-lg font-semibold hover:bg-gray-100 inline-flex items-center space-x-2 transition">
                <span>Shop Now</span>
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>

            {/* RIGHT IMAGE */}
            <div className="md:w-1/2 flex justify-center">
              <div className="text-7xl sm:text-8xl md:text-9xl">🛍️</div>
            </div>

          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
          Shop by Category
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category, index) => (
            <div 
              key={index}
              className={`${category.color} p-6 sm:p-8 rounded-xl cursor-pointer hover:shadow-lg transition transform hover:-translate-y-1`}
            >
              <div className="text-4xl sm:text-5xl mb-2">{category.icon}</div>
              <h4 className="text-sm sm:text-lg font-semibold text-gray-800">{category.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-0">
            Featured Products
          </h3>

          <button className="text-purple-600 font-semibold hover:text-purple-700 inline-flex items-center space-x-1 text-sm sm:text-base">
            <span>View All</span>
            <i className="fas fa-arrow-right text-sm"></i>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {featuredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
              <div className="bg-gray-100 h-40 sm:h-48 flex items-center justify-center text-6xl sm:text-7xl">
                {product.image}
              </div>

              <div className="p-4 sm:p-5">
                <h4 className="font-semibold text-gray-900 mb-2 text-base sm:text-lg">
                  {product.name}
                </h4>

                <div className="flex items-center mb-3">
                  <div className="flex text-yellow-400 text-sm">
                    {[...Array(5)].map((_, i) => (
                      <i 
                        key={i} 
                        className={`${i < Math.floor(product.rating) ? 'fas' : 'far'} fa-star`}
                      ></i>
                    ))}
                  </div>
                  <span className="text-xs sm:text-sm text-gray-500 ml-2">
                    ({product.reviews})
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xl sm:text-2xl font-bold text-gray-900">
                    ${product.price}
                  </span>

                  <button 
                    onClick={addToCart}
                    className="bg-purple-600 text-white text-sm sm:text-base px-3 py-2 sm:px-4 rounded-lg hover:bg-purple-700 transition"
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
