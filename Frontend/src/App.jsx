import { useState, useEffect } from 'react';
import axios from 'axios';
import Scanner from './Scanner';
import Inventory from './components/Inventory';

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [products, setProducts] = useState([]);
  const [view, setView] = useState('monitor'); // State to control real-time view
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      // Immediate fetch on load
      fetchProducts();
      // REAL-TIME: Poll the backend every 2 seconds for new scans
      const interval = setInterval(fetchProducts, 2000);
      return () => clearInterval(interval);
    }
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:8000/products/');
      setProducts(res.data);
    } catch (err) {
      console.error("Connection to FastAPI lost", err);
    }
  };

  if (isMobile) return <Scanner />;

  const totalValue = products.reduce((acc, p) => acc + (p.price * p.stock), 0);

  // Professional Theme Variables
  const theme = {
    bg: isDarkMode ? '#0f172a' : '#f8fafc',
    card: isDarkMode ? '#1e293b' : '#ffffff',
    text: isDarkMode ? '#f1f5f9' : '#1e293b',
    border: isDarkMode ? '#334155' : '#e2e8f0',
    accent: '#38bdf8'
  };

  return (
    <div style={{ backgroundColor: theme.bg, color: theme.text, minHeight: '100vh', transition: '0.3s' }}>
      
      {/* PROFESSIONAL TOP NAV */}
      <nav style={{ 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
        padding: '15px 40px', backgroundColor: theme.card, borderBottom: `1px solid ${theme.border}`,
        position: 'sticky', top: 0, zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          <h2 style={{ margin: 0, fontWeight: '800', letterSpacing: '-1px' }}>Omni<span style={{color: theme.accent}}>POS</span></h2>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => setView('monitor')} style={view === 'monitor' ? activeBtn : inactiveBtn(theme)}>
               Monitor Inventory
            </button>
            <button onClick={() => setView('inventory')} style={view === 'inventory' ? activeBtn : inactiveBtn(theme)}>
               Search & Manage
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
           <div style={statBox}>
              <small style={{color: '#94a3b8'}}>TOTAL ITEMS</small>
              <div style={{fontWeight: 'bold'}}>{products.length}</div>
           </div>
           <div style={statBox}>
              <small style={{color: '#94a3b8'}}>VALUATION</small>
              <div style={{fontWeight: 'bold', color: '#10b981'}}>Ksh {totalValue.toLocaleString()}</div>
           </div>
           <button onClick={() => setIsDarkMode(!isDarkMode)} style={themeToggle(theme)}>
             {isDarkMode ? '🌙' : '☀️'}
           </button>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto' }}>
        {view === 'monitor' ? (
          <div style={{ backgroundColor: theme.card, borderRadius: '12px', border: `1px solid ${theme.border}`, overflow: 'hidden' }}>
            <div style={{ padding: '20px', borderBottom: `1px solid ${theme.border}`, display: 'flex', justifyContent: 'space-between' }}>
              <h3 style={{ margin: 0 }}>Live Transaction Feed</h3>
              <span style={{ color: '#10b981', fontSize: '0.8rem' }}>● Receiving Live Data</span>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', backgroundColor: isDarkMode ? '#1e293b' : '#f8fafc' }}>
                  <th style={thStyle}>Product Name</th>
                  <th style={thStyle}>Barcode</th>
                  <th style={thStyle}>Price</th>
                  <th style={thStyle}>In Stock</th>
                  <th style={thStyle}>Total Value</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id} style={{ borderBottom: `1px solid ${theme.border}` }}>
                    <td style={tdStyle}><strong>{p.name}</strong></td>
                    <td style={{...tdStyle, color: '#94a3b8', fontFamily: 'monospace'}}>{p.barcode}</td>
                    <td style={tdStyle}>Ksh {p.price.toLocaleString()}</td>
                    <td style={tdStyle}>
                      <span style={{ 
                        padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem',
                        backgroundColor: p.stock < 5 ? '#fee2e2' : '#dcfce7',
                        color: p.stock < 5 ? '#991b1b' : '#166534'
                      }}>{p.stock} units</span>
                    </td>
                    <td style={{...tdStyle, fontWeight: 'bold'}}>Ksh {(p.price * p.stock).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <Inventory isDarkMode={isDarkMode} />
        )}
      </main>
    </div>
  );
}

// Button & Component Styles
const activeBtn = { padding: '10px 20px', borderRadius: '8px', border: 'none', backgroundColor: '#0f172a', color: 'white', cursor: 'pointer', fontWeight: 'bold' };
const inactiveBtn = (t) => ({ padding: '10px 20px', borderRadius: '8px', border: 'none', backgroundColor: 'transparent', color: t.text, cursor: 'pointer' });
const themeToggle = (t) => ({ padding: '8px', borderRadius: '50%', border: `1px solid ${t.border}`, backgroundColor: 'transparent', cursor: 'pointer' });
const statBox = { textAlign: 'right', paddingRight: '15px', borderRight: '1px solid #e2e8f0', lineHeight: '1.2' };
const thStyle = { padding: '15px 20px', fontSize: '0.75rem', textTransform: 'uppercase', color: '#94a3b8' };
const tdStyle = { padding: '15px 20px' };

export default App;
