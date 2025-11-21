import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home"; 
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import AdminDashboard from "./admin/AdminDashboard";

function App() {
  const [cartCount, setCartCount] = useState(0);
  const addToCart = () => setCartCount(cartCount + 1);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      {/* Routes */}
      <Routes>
        <Route
          path="/"
          element={<Home cartCount={cartCount} addToCart={addToCart} />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
