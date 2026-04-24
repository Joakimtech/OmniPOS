import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import axios from 'axios';

let isScanning = false;

const Scanner = () => {
  const [status, setStatus] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to Dark

  // Dynamic Theme Colors
  const theme = {
    bg: isDarkMode ? '#0f172a' : '#f8fafc',
    card: isDarkMode ? 'rgba(30, 41, 59, 0.7)' : 'rgba(255, 255, 255, 0.9)',
    text: isDarkMode ? '#f8fafc' : '#1e293b',
    subtext: isDarkMode ? '#94a3b8' : '#64748b',
    border: isDarkMode ? '#334155' : '#e2e8f0',
    accent: '#38bdf8'
  };

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  async function onScanSuccess(decodedText) {
    if (isScanning) return;
    isScanning = true;
    setStatus("⏳ SYNCING...");
    
    const backendUrl = "http://192.168.0.112:8000/products/";

    try {
      const response = await axios.get(backendUrl);
      const existingProduct = response.data.find(
        p => String(p.barcode).trim() === String(decodedText).trim()
      );

      let message = "";
      if (existingProduct) {
        await axios.post(backendUrl, {
          name: existingProduct.name,
          barcode: existingProduct.barcode,
          price: existingProduct.price,
          stock: 1
        });
        message = `✅ ${existingProduct.name} UPDATED`;
      } else {
        const name = prompt("NEW ITEM FOUND! Enter Name:");
        if (name) {
          const price = prompt("Enter Price (Ksh):", "0");
          await axios.post(backendUrl, {
            name: name,
            barcode: decodedText,
            price: parseFloat(price) || 0,
            stock: 1
          });
          message = ` ${name} ADDED`;
        } else {
          message = "SCAN CANCELLED";
        }
      }
      setStatus(message);
      setCountdown(3);
      setTimeout(() => {
        isScanning = false;
        setStatus("");
        setCountdown(0);
      }, 3000);
    } catch (err) {
      setStatus("❌ SERVER OFFLINE");
      isScanning = false;
    }
  }

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      fps: 20,
      qrbox: { width: 250, height: 250 },
      aspectRatio: 1.0,
      videoConstraints: { facingMode: "environment" }
    });
    scanner.render(onScanSuccess, () => {});
    return () => {
      scanner.clear().catch(e => console.error(e));
    };
  }, []);

  return (
    <div style={{...containerStyle, backgroundColor: theme.bg, color: theme.text}}>
      {/* Top Navigation Bar */}
      <div style={navStyle}>
        <div style={{...logoStyle, color: theme.accent}}>Omni<span style={{ fontWeight: '300' }}>POS</span></div>
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)} 
          style={{...themeToggleStyle, backgroundColor: theme.card, color: theme.text, borderColor: theme.border}}
        >
          {isDarkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>

      {/* Hero Status Section */}
      <div style={{...statusCardStyle, backgroundColor: theme.card, borderColor: status.includes('✅') ? '#22c55e' : theme.border}}>
        <div style={{ fontSize: '1.1rem', letterSpacing: '1px' }}>{status || "READY TO SCAN"}</div>
        {countdown > 0 && (
          <div style={{...countdownStyle, color: theme.subtext}}>Cooldown: {countdown}s</div>
        )}
      </div>

      {/* Scanner Window Wrapper */}
      <div style={scannerWrapper}>
        <div id="reader" style={readerStyle}></div>
        {/* Aesthetic Corner Brackets */}
        <div style={{...corner, top: 0, left: 0, borderTop: '4px solid #fff', borderLeft: '4px solid #fff'}}></div>
        <div style={{...corner, top: 0, right: 0, borderTop: '4px solid #fff', borderRight: '4px solid #fff'}}></div>
        <div style={{...corner, bottom: 0, left: 0, borderBottom: '4px solid #fff', borderLeft: '4px solid #fff'}}></div>
        <div style={{...corner, bottom: 0, right: 0, borderBottom: '4px solid #fff', borderRight: '4px solid #fff'}}></div>
      </div>

      <div style={{...footerStyle, color: theme.subtext}}>
        <p>Ensure lighting is sufficient for barcodes</p>
        <div style={{...indicatorStyle, backgroundColor: theme.card}}>
          <div style={{...dotStyle, backgroundColor: theme.accent}}></div> IP: 192.168.0.112
        </div>
      </div>
    </div>
  );
};

// --- STYLES ---

const containerStyle = {
  minHeight: '100vh',
  padding: '20px',
  transition: 'background-color 0.4s ease, color 0.4s ease',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
};

const navStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px'
};

const logoStyle = {
  fontSize: '1.5rem',
  fontWeight: 'bold'
};

const themeToggleStyle = {
  padding: '8px 16px',
  borderRadius: '20px',
  border: '1px solid',
  cursor: 'pointer',
  fontSize: '0.85rem',
  fontWeight: 'bold',
  transition: 'all 0.3s ease'
};

const statusCardStyle = {
  backdropFilter: 'blur(10px)',
  padding: '20px',
  borderRadius: '16px',
  border: '1px solid',
  textAlign: 'center',
  marginBottom: '25px',
  minHeight: '80px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  transition: 'all 0.3s ease'
};

const countdownStyle = {
  fontSize: '0.8rem',
  marginTop: '8px',
  textTransform: 'uppercase'
};

const scannerWrapper = {
  position: 'relative',
  width: '100%',
  maxWidth: '400px',
  margin: '0 auto',
  borderRadius: '24px',
  overflow: 'hidden',
  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)'
};

const readerStyle = {
  border: 'none',
  width: '100%'
};

const corner = {
  position: 'absolute',
  width: '30px',
  height: '30px',
  zIndex: 10,
  margin: '20px',
  pointerEvents: 'none'
};

const footerStyle = {
  textAlign: 'center',
  marginTop: '30px',
  fontSize: '0.85rem'
};

const indicatorStyle = {
  marginTop: '10px',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  padding: '5px 15px',
  borderRadius: '20px',
  fontSize: '0.75rem'
};

const dotStyle = {
  width: '6px',
  height: '6px',
  borderRadius: '50%'
};

export default Scanner;
