import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InventorySearch = ({ onSelectItem }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        axios.get(`http://localhost:8000/products/search?q=${searchTerm}`)
          .then(res => setResults(res.data))
          .catch(err => console.error(err));
      } else {
        setResults([]);
      }
    }, 300); // Wait 300ms after user stops typing

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Search product name or type barcode..."
        className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {results.length > 0 && (
        <div className="absolute z-10 w-full bg-white mt-1 border rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {results.map(item => (
            <div 
              key={item.id}
              onClick={() => onSelectItem(item)}
              className={`p-3 cursor-pointer hover:bg-gray-100 flex justify-between items-center border-b ${item.is_low_stock ? 'bg-red-50' : ''}`}
            >
              <div>
                <span className="font-medium">{item.name}</span>
                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
              </div>
              <div className="text-right">
                <span className="font-bold">${item.price}</span>
                {item.is_low_stock && (
                  <span className="ml-2 text-[10px] bg-red-600 text-white px-2 py-1 rounded-full uppercase">
                    Low Stock
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InventorySearch;