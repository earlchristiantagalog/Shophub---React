import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function CartPage() {
  const [fontAwesomeLoaded, setFontAwesomeLoaded] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Wireless Headphones",
      price: 79.99,
      quantity: 1,
      image: "🎧",
      color: "Black",
      inStock: true,
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 199.99,
      quantity: 2,
      image: "⌚",
      color: "Silver",
      inStock: true,
    },
    {
      id: 3,
      name: "Laptop Backpack",
      price: 49.99,
      quantity: 1,
      image: "🎒",
      color: "Blue",
      inStock: true,
    },
    {
      id: 4,
      name: "Coffee Maker",
      price: 89.99,
      quantity: 1,
      image: "☕",
      color: "Stainless Steel",
      inStock: false,
    },
  ]);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
    link.onload = () => setFontAwesomeLoaded(true);
    document.head.appendChild(link);

    return () => document.head.removeChild(link);
  }, []);

  const updateQuantity = (id, delta) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === "SAVE10") setPromoApplied(true);
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + shipping + tax;

  const suggestedProducts = [
    { id: 5, name: "Phone Case", price: 19.99, image: "📱" },
    { id: 6, name: "USB Cable", price: 12.99, image: "🔌" },
    { id: 7, name: "Screen Protector", price: 14.99, image: "📲" },
  ];

  if (!fontAwesomeLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="text-gray-500 mt-2">Loading…</p>
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
          <span className="text-gray-900 font-medium">Shopping Cart</span>
        </div>

        {/* Empty Cart */}
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-10 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h3 className="text-2xl font-bold mb-2">Your cart is empty</h3>
            <p className="text-gray-500 mb-6">Start adding items to your cart!</p>
            <Link to="/">
              <button className="px-8 py-3 bg-purple-600 text-white rounded-lg">
                Continue Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">

              {/* Free Shipping Banner */}
              {subtotal < 100 && (
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-blue-900 font-medium">
                    Add ${(100 - subtotal).toFixed(2)} more for FREE shipping!
                  </p>
                </div>
              )}

              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-md p-4 sm:p-6">

                  {/* Parent Row: image + details */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-4">

                    {/* Image */}
                    <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center text-4xl mx-auto sm:mx-0">
                      {item.image}
                    </div>

                    {/* Details */}
                    <div className="flex-1 mt-4 sm:mt-0">

                      {/* Product Title */}
                      <div className="flex justify-between">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <button onClick={() => removeItem(item.id)}>
                          <i className="fas fa-trash text-red-500"></i>
                        </button>
                      </div>

                      <p className="text-sm text-gray-600">Color: {item.color}</p>

                      <span
                        className={`inline-block mt-2 px-2 py-1 text-xs rounded-full ${
                          item.inStock
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.inStock ? "In stock" : "Out of stock"}
                      </span>

                      {/* Quantity + Price (STACK on mobile) */}
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4 space-y-4 sm:space-y-0">

                        {/* Quantity Buttons */}
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 rounded-full border flex items-center justify-center"
                          >
                            <i className="fas fa-minus text-xs"></i>
                          </button>

                          <span className="w-10 text-center">{item.quantity}</span>

                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 rounded-full border flex items-center justify-center"
                          >
                            <i className="fas fa-plus text-xs"></i>
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right sm:text-left">
                          <p className="text-xl font-bold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-500">${item.price} each</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Promo Code */}
              <div className="bg-white shadow-md rounded-lg p-4">
                <h3 className="font-semibold mb-3">Have a promo code?</h3>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-2">
                  <input
                    type="text"
                    className="flex-1 border rounded-lg px-4 py-2"
                    placeholder="Enter code"
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <button
                    onClick={applyPromoCode}
                    className="bg-purple-600 text-white px-6 py-2 rounded-lg"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">

                <h3 className="text-xl font-bold mb-4">Order Summary</h3>

                <div className="space-y-3 mb-4 text-gray-700">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>

                  {promoApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount (10%)</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="border-t pt-4 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <Link to="/checkout">
                  <button className="w-full bg-purple-600 text-white py-3 mt-6 rounded-lg">
                    Proceed to Checkout
                  </button>
                </Link>

                <Link to="/">
                  <button className="w-full border mt-3 py-3 rounded-lg">
                    Continue Shopping
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Suggested Products */}
        {cartItems.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6">You might also like</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {suggestedProducts.map((product) => (
                <div key={product.id} className="bg-white p-4 rounded-lg shadow">
                  <div className="bg-gray-100 h-32 flex items-center justify-center text-5xl">
                    {product.image}
                  </div>
                  <h4 className="font-semibold mt-3">{product.name}</h4>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xl font-bold">${product.price}</span>
                    <button className="px-3 py-2 bg-purple-600 text-white rounded text-sm">
                      Add to Cart
                    </button>
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
