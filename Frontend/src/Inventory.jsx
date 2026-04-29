import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InventorySearch from './InventorySearch';

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load initial data
  const fetchData = async () => {
    try {
      const [prodRes, alertRes] = await Promise.all([
        axios.get('http://localhost:8000/products/'),
        axios.get('http://localhost:8000/products/alerts')
      ]);
      setProducts(prodRes.data);
      setAlerts(alertRes.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching inventory:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleManualStockUpdate = async (id, currentStock) => {
    const adjustment = prompt("Enter amount to add (use negative to subtract):");
    if (!adjustment || isNaN(adjustment)) return;

    try {
      await axios.patch(`http://localhost:8000/products/${id}/stock?adjustment=${adjustment}`);
      fetchData(); // Refresh list
    } catch (err) {
      alert("Failed to update stock");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Inventory Management</h2>

      {/* 1. STOCK ALERTS SECTION */}
      {alerts.length > 0 && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
          <h3 className="text-red-800 font-bold flex items-center">
            ⚠️ Low Stock Alerts
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
            {alerts.map(item => (
              <div key={item.id} className="text-sm bg-white p-2 rounded shadow-sm border border-red-100">
                <span className="font-semibold text-gray-700">{item.name}</span>
                <p className="text-red-600 font-bold">Only {item.stock} left!</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. DYNAMIC SEARCH COMPONENT */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-600 mb-2">Search Products</label>
        <InventorySearch onSelectItem={(item) => alert(`Selected: ${item.name}`)} />
      </div>

      {/* 3. PRODUCT TABLE */}
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full text-left bg-white">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="p-4">Product Name</th>
              <th className="p-4">Barcode</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map(p => (
              <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 font-medium text-gray-900">{p.name}</td>
                <td className="p-4 text-gray-500 font-mono text-sm">{p.barcode}</td>
                <td className="p-4 font-bold text-green-600">${p.price}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    p.stock <= p.reorder_level ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {p.stock} units
                  </span>
                </td>
                <td className="p-4 text-center">
                  <button 
                    onClick={() => handleManualStockUpdate(p.id, p.stock)}
                    className="text-blue-600 hover:text-blue-900 text-sm font-semibold underline"
                  >
                    Adjust Stock
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;
