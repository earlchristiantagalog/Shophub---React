import React, { useState, useEffect } from 'react';

export default function Profile() {
  const [fontAwesomeLoaded, setFontAwesomeLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States'
  });

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

  const orders = [
    { id: '#ORD-2024-001', date: '2024-11-15', status: 'Delivered', total: 129.99, items: 3 },
    { id: '#ORD-2024-002', date: '2024-11-10', status: 'Shipped', total: 89.99, items: 2 },
    { id: '#ORD-2024-003', date: '2024-11-05', status: 'Processing', total: 199.99, items: 1 },
    { id: '#ORD-2024-004', date: '2024-10-28', status: 'Delivered', total: 45.50, items: 2 },
  ];

  const savedAddresses = [
    { id: 1, type: 'Home', address: '123 Main Street', city: 'New York, NY 10001', isDefault: true },
    { id: 2, type: 'Work', address: '456 Business Ave', city: 'New York, NY 10002', isDefault: false },
  ];

  const paymentMethods = [
    { id: 1, type: 'Visa', last4: '4242', expiry: '12/25', isDefault: true },
    { id: 2, type: 'Mastercard', last4: '8888', expiry: '06/26', isDefault: false },
  ];

  const handleInputChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Shipped': return 'bg-blue-100 text-blue-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* --- PROFILE HEADER --- */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-4 sm:space-y-0">

            {/* Avatar */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl sm:text-3xl font-bold">
              {profileData.firstName[0]}{profileData.lastName[0]}
            </div>

            {/* Name + Details */}
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{profileData.firstName} {profileData.lastName}</h2>
              <p className="text-gray-600 text-sm sm:text-base">{profileData.email}</p>

              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm bg-purple-100 text-purple-800">
                  <i className="fas fa-star mr-1"></i> Premium Member
                </span>
                <span className="text-xs sm:text-sm text-gray-600">
                  <i className="fas fa-calendar-alt mr-1"></i> Joined November 2023
                </span>
              </div>
            </div>

            {/* Upload button */}
            <button className="w-full sm:w-auto px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
              <i className="fas fa-upload mr-2"></i> Upload Photo
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* --- SIDEBAR NAVIGATION (scrollable on mobile) --- */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4">
              <nav className="space-y-2 overflow-x-auto flex lg:block whitespace-nowrap scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300">
                {[
                  ['profile', 'fa-user', 'Profile Info'],
                  ['orders', 'fa-shopping-bag', 'Orders'],
                  ['addresses', 'fa-map-marker-alt', 'Addresses'],
                  ['payment', 'fa-credit-card', 'Payment Methods'],
                  ['security', 'fa-lock', 'Security'],
                  ['preferences', 'fa-cog', 'Preferences']
                ].map(([tab, icon, label]) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-3 rounded-lg transition flex items-center space-x-3 mr-3 lg:mr-0 ${
                      activeTab === tab
                        ? 'bg-purple-100 text-purple-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <i className={`fas ${icon}`}></i>
                    <span>{label}</span>
                  </button>
                ))}
              </nav>

              <div className="border-t border-gray-200 mt-4 pt-4">
                <button className="w-full text-left px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition flex items-center space-x-3">
                  <i className="fas fa-sign-out-alt"></i>
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>

          {/* --- MAIN CONTENT AREA --- */}
          <div className="lg:col-span-3 space-y-6">

            {/* PROFILE TAB */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-0">
                    Personal Information
                  </h3>

                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                    >
                      <i className="fas fa-edit mr-2"></i>Edit Profile
                    </button>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveProfile}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                      >
                        <i className="fas fa-save mr-2"></i>Save
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    'firstName', 'lastName', 'email', 'phone',
                    'address', 'city', 'state', 'zipCode', 'country'
                  ].map((field) => (
                    <div key={field} className={field === 'address' ? 'md:col-span-2' : ''}>
                      <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                        {field.replace(/([A-Z])/g, ' $1')}
                      </label>
                      <input
                        type="text"
                        name={field}
                        value={profileData[field]}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ORDERS TAB */}
            {activeTab === 'orders' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Order History</h3>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3">
                        <div className="mb-3 sm:mb-0">
                          <h4 className="font-semibold text-gray-900">{order.id}</h4>
                          <p className="text-sm text-gray-600">
                            <i className="far fa-calendar mr-1"></i>{order.date}
                          </p>
                        </div>

                        <span className={`px-3 py-1 text-sm rounded-full font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm text-gray-600">
                        <div className="mb-3 sm:mb-0">
                          <i className="fas fa-box mr-1"></i>{order.items} items
                          <span className="ml-4 font-semibold text-gray-900">Total: ${order.total}</span>
                        </div>

                        <button className="text-purple-600 hover:text-purple-700 font-medium text-sm">
                          View Details <i className="fas fa-arrow-right ml-1"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ADDRESSES TAB */}
            {activeTab === 'addresses' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Saved Addresses</h3>
                  <button className="mt-3 sm:mt-0 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                    <i className="fas fa-plus mr-2"></i>Add Address
                  </button>
                </div>

                <div className="space-y-4">
                  {savedAddresses.map((address) => (
                    <div key={address.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-gray-900">{address.type}</h4>
                            {address.isDefault && (
                              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 text-sm">{address.address}</p>
                          <p className="text-gray-600 text-sm">{address.city}</p>
                        </div>

                        <div className="flex gap-3 mt-4 sm:mt-0">
                          <button className="text-gray-600 hover:text-purple-600">
                            <i className="fas fa-edit"></i>
                          </button>
                          <button className="text-gray-600 hover:text-red-600">
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PAYMENT METHODS TAB */}
            {activeTab === 'payment' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Payment Methods</h3>
                  <button className="mt-3 sm:mt-0 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                    <i className="fas fa-plus mr-2"></i>Add Card
                  </button>
                </div>

                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">

                        {/* Card + Info */}
                        <div className="flex items-center gap-4 mb-3 sm:mb-0">
                          <div className="w-12 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">
                            <i className={`fab fa-cc-${method.type.toLowerCase()}`}></i>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-gray-900">
                                {method.type} •••• {method.last4}
                              </h4>
                              {method.isDefault && (
                                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">Expires {method.expiry}</p>
                          </div>
                        </div>

                        {/* Edit/Delete */}
                        <div className="flex gap-3">
                          <button className="text-gray-600 hover:text-purple-600">
                            <i className="fas fa-edit"></i>
                          </button>
                          <button className="text-gray-600 hover:text-red-600">
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECURITY TAB */}
            {activeTab === 'security' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Security Settings</h3>

                <div className="space-y-6">
                  {/* Password Section */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Change Password</h4>

                    <div className="space-y-4">
                      {['Current Password', 'New Password', 'Confirm New Password'].map((label, index) => (
                        <div key={index}>
                          <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
                          <input
                            type="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                      ))}

                      <button className="w-full sm:w-auto px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                        Update Password
                      </button>
                    </div>
                  </div>

                  {/* 2FA */}
                  <div className="border-t border-gray-200 pt-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Two-Factor Authentication</h4>

                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 bg-gray-50 rounded-lg">
                      <div className="mb-3 sm:mb-0">
                        <p className="font-medium text-gray-900">Enable 2FA</p>
                        <p className="text-sm text-gray-600">Add extra security to your account</p>
                      </div>

                      <button className="w-full sm:w-auto px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                        Enable
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PREFERENCES TAB */}
            {activeTab === 'preferences' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Preferences</h3>

                <div className="space-y-6">
                  {/* Email Notifications */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Email Notifications</h4>

                    <div className="space-y-3">
                      {[
                        'Order updates',
                        'Promotional emails',
                        'Newsletter'
                      ].map((label, index) => (
                        <label key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                          <span className="text-gray-700 text-sm sm:text-base">{label}</span>
                          <input type="checkbox" defaultChecked={index < 2} className="w-5 h-5 text-purple-600" />
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Language + Region */}
                  <div className="border-t border-gray-200 pt-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Language & Region</h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                          <option>English</option>
                          <option>Spanish</option>
                          <option>French</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                          <option>USD ($)</option>
                          <option>EUR (€)</option>
                          <option>GBP (£)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
