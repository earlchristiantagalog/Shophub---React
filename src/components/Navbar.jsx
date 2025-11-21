// src/components/Navbar.jsx
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({ cartCount = 0 }) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Links */}
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-gray-900">
              <Link to="/">ShopHub</Link>
            </h1>
          </div>

          {/* Search, Profile, Cart */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-4 py-2">
              <span className="text-gray-500"><i className="fas fa-search text-xl"></i></span>
              <input
                type="text"
                placeholder="Search products..."
                className="bg-transparent ml-2 focus:outline-none w-64"
              />
            </div>

            {/* Wishlist */}
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <span role="img" aria-label="wishlist" className="text-gray-700 text-xl">
                <i className="fas fa-heart text-xl"></i>
              </span>
            </button>

            {/* Profile */}
            <Link
              to="/profile"
              className="text-gray-700 hover:text-blue-600 font-semibold"
            >
              <span role="img" aria-label="profile" className="text-gray-700 text-xl">
                <i className="fas fa-user text-xl"></i>
              </span>
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="p-2 hover:bg-gray-100 rounded-full relative"
            >
              <span role="img" aria-label="cart" className="text-gray-700 text-xl">
                <i className="fas fa-shopping-cart text-xl"></i>
              </span>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2">
              <span role="img" aria-label="menu" className="text-gray-700 text-xl">
                ☰
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
