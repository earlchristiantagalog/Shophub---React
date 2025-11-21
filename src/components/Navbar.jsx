// src/components/Navbar.jsx
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({ cartCount = 0 }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <h1 className="text-2xl font-bold text-gray-900">
            <Link to="/">ShopHub</Link>
          </h1>

          {/* Search bar (always visible on desktop, visible on mobile) */}
          <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 w-40 sm:w-64 md:w-72">
            <i className="fas fa-search text-gray-500"></i>
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent ml-2 focus:outline-none w-full"
            />
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-4">
            
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <i className="fas fa-heart text-xl text-gray-700"></i>
            </button>

            <Link to="/profile" className="p-2 hover:bg-gray-100 rounded-full">
              <i className="fas fa-user text-xl text-gray-700"></i>
            </Link>

            <Link to="/cart" className="p-2 hover:bg-gray-100 rounded-full relative">
              <i className="fas fa-shopping-cart text-xl text-gray-700"></i>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <i className="fas fa-bars text-2xl text-gray-700"></i>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white shadow-md mt-2 p-4 rounded-lg space-y-4">

            <button className="flex items-center space-x-3 w-full p-2 hover:bg-gray-100 rounded-lg">
              <i className="fas fa-heart text-xl text-gray-700"></i>
              <span>Wishlist</span>
            </button>

            <Link
              to="/profile"
              className="flex items-center space-x-3 w-full p-2 hover:bg-gray-100 rounded-lg"
            >
              <i className="fas fa-user text-xl text-gray-700"></i>
              <span>Profile</span>
            </Link>

            <Link
              to="/cart"
              className="flex items-center space-x-3 w-full p-2 hover:bg-gray-100 rounded-lg relative"
            >
              <i className="fas fa-shopping-cart text-xl text-gray-700"></i>
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="absolute top-2 right-4 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar
