import { useState, useEffect } from 'react';
import axios from 'axios';
import Scanner from './Scanner';

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      fetchProducts();
      const interval = setInterval(fetchProducts, 3000);
      return () => clearInterval(interval);
    }
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:8000/products/');
      setProducts(res.data);
    } catch (err) {
      console.error("Connection lost", err);
    }
  };

  if (isMobile) return <Scanner />;

  const totalValue = products.reduce((acc, p) => acc + (p.price * p.stock), 0);

  return (
    <div style={{ padding: '30px', backgroundColor: '#f4f7f6', minHeight: '100vh', fontFamily: 'Segoe UI, sans-serif' }}>
      {/* Header & Stats */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h1 style={{ margin: 0, color: '#2d3436' }}>OmniPOS Management</h1>
          <h3 style={{ color: '#636e72' }}>Live inventory from mobile scanner</h3>
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={statCardStyle}>
            <span style={statLabel}>Total Items</span>
            <span style={statValue}>{products.length}</span>
          </div>
          <div style={statCardStyle}>
            <span style={statLabel}>Inventory Value</span>
            <span style={statValue}>Ksh {totalValue.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#2d3436', color: 'white', textAlign: 'left' }}>
              <th style={thStyle}>Product Name</th>
              <th style={thStyle}>Barcode</th>
              <th style={thStyle}>Price</th>
              <th style={thStyle}>Stock</th>
              <th style={thStyle}>Total</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? products.map((p) => (
              <tr key={p.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={tdStyle}><strong>{p.name}</strong></td>
                <td style={{ ...tdStyle, color: '#636e72', fontSize: '0.9rem' }}>{p.barcode}</td>
                <td style={tdStyle}>Ksh {p.price.toFixed(2)}</td>
                <td style={tdStyle}>
                   <span style={{ backgroundColor: '#dfe6e9', padding: '4px 10px', borderRadius: '15px' }}>{p.stock}</span>
                </td>
                <td style={tdStyle}>Ksh {(p.price * p.stock).toFixed(2)}</td>
              </tr>
            )) : (
              <tr><td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: '#b2bec3' }}>Waiting for scans...</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Simple styles for the UI components
const statCardStyle = { backgroundColor: 'white', padding: '15px 25px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', textAlign: 'right' };
const statLabel = { display: 'block', fontSize: '0.8rem', color: '#636e72', textTransform: 'uppercase' };
const statValue = { fontSize: '1.4rem', fontWeight: 'bold', color: '#00b894' };
const thStyle = { padding: '15px' };
const tdStyle = { padding: '15px' };

export default App;
