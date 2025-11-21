import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home' // <-- import the new file
import Profile from './pages/Profile'
import Navbar from './components/Navbar'

function Shop() {
  return <h2 className="p-10 text-2xl font-bold">Shop Page (coming soon)</h2>
}
function App() {
  const [cartCount, setCartCount] = useState(0)
  const addToCart = () => setCartCount(cartCount + 1)

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home cartCount={cartCount} addToCart={addToCart} />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-white text-lg font-bold mb-4">ShopHub</h4>
              <p className="text-sm">Your one-stop destination for quality products at great prices.</p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="hover:text-white"><i className="fab fa-facebook text-xl"></i></a>
                <a href="#" className="hover:text-white"><i className="fab fa-twitter text-xl"></i></a>
                <a href="#" className="hover:text-white"><i className="fab fa-instagram text-xl"></i></a>
                <a href="#" className="hover:text-white"><i className="fab fa-youtube text-xl"></i></a>
              </div>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-4">Shop</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">New Arrivals</a></li>
                <li><a href="#" className="hover:text-white">Best Sellers</a></li>
                <li><a href="#" className="hover:text-white">Sale</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">FAQs</a></li>
                <li><a href="#" className="hover:text-white">Shipping</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-4">Company</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2024 ShopHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
