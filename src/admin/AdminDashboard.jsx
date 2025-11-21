import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const products = [
    {
      id: 1,
      name: "Sample Product 1",
      price: 199,
      stock: 20,
      category: "Electronics",
    },
    {
      id: 2,
      name: "Sample Product 2",
      price: 299,
      stock: 10,
      category: "Clothing",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white shadow-lg p-5">
        <h2 className="text-2xl font-bold mb-8 text-blue-600">Admin Panel</h2>

        <nav className="space-y-4">
          <Link className="block p-2 rounded hover:bg-blue-100" to="/admin">
            Dashboard
          </Link>
          <Link className="block p-2 rounded hover:bg-blue-100" to="/admin/products">
            Products
          </Link>
          <Link className="block p-2 rounded hover:bg-blue-100" to="/admin/orders">
            Orders
          </Link>
          <Link className="block p-2 rounded hover:bg-blue-100" to="/admin/users">
            Users
          </Link>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

        {/* TOP STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-5 rounded-lg shadow">
            <p className="text-gray-500">Total Sales</p>
            <h2 className="text-2xl font-bold mt-2">₱12,450</h2>
          </div>

          <div className="bg-white p-5 rounded-lg shadow">
            <p className="text-gray-500">Total Orders</p>
            <h2 className="text-2xl font-bold mt-2">87</h2>
          </div>

          <div className="bg-white p-5 rounded-lg shadow">
            <p className="text-gray-500">Total Users</p>
            <h2 className="text-2xl font-bold mt-2">243</h2>
          </div>
        </div>

        {/* PRODUCT MANAGEMENT SECTION */}
        <div className="bg-white p-5 rounded-lg shadow mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Products</h2>

            <Link
              to="/admin/products/add"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              + Add Product
            </Link>
          </div>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="p-3">ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Price</th>
                <th className="p-3">Stock</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="p-3">{item.id}</td>
                  <td className="p-3">{item.name}</td>
                  <td className="p-3">{item.category}</td>
                  <td className="p-3">₱{item.price}</td>
                  <td className="p-3">{item.stock}</td>
                  <td className="p-3">
                    <div className="flex gap-3">
                      <Link
                        to={`/admin/products/edit/${item.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </Link>
                      <button className="text-red-500 hover:underline">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ORDERS SECTION PLACEHOLDER */}
        <div className="bg-white p-5 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Latest Orders</h2>
          <p className="text-gray-600">Orders data will show here (connect backend later).</p>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
