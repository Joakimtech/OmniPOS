import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import axios from 'axios';

const Scanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const [status, setStatus] = useState("Ready to Scan");

  // REPLACEMENT REQUIRED: Put your active ngrok URL here
  const API_URL = "https://your-ngrok-url.ngrok-free.app/products/";

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: { width: 250, height: 250 },
      fps: 10,
    });

    scanner.render(onScanSuccess, onScanError);

    function onScanSuccess(result) {
      scanner.clear();
      setScanResult(result);
      sendDataToBackend(result);
    }

    function onScanError(err) {
      // Quietly log errors to avoid UI clutter
      console.warn(err);
    }

    return () => scanner.clear();
  }, []);

  const sendDataToBackend = async (barcode) => {
    setStatus("Processing...");
    try {
      const response = await axios.post(API_URL, {
        barcode: barcode,
        name: "New Scanned Item", // Backend logic usually handles naming
        price: 0.0,
        stock: 1
      });
      
      if (response.status === 200 || response.status === 201) {
        setStatus("✅ Successfully Added!");
        // Optional: Add a haptic feedback or sound here
        if (window.navigator.vibrate) window.navigator.vibrate(200); 
      }
    } catch (error) {
      console.error("Transmission Error:", error);
      setStatus("❌ Failed to send. Check ngrok/backend.");
    }

    // Reset status after 3 seconds to allow for next scan
    setTimeout(() => {
      setStatus("Ready to Scan");
      window.location.reload(); // Restarts the scanner for the next item
    }, 3000);
  };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h2>Omni<span style={{ color: '#38bdf8' }}>POS</span> Mobile</h2>
        <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.8 }}>Live Terminal Link</p>
      </header>

      <div id="reader" style={scannerStyle}></div>

      <div style={statusCardStyle}>
        <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase' }}>Current Status</div>
        <div style={{ fontSize: '1.1rem', fontWeight: 'bold', marginTop: '5px' }}>{status}</div>
        {scanResult && (
          <div style={{ marginTop: '10px', color: '#38bdf8', fontFamily: 'monospace' }}>
            ID: {scanResult}
          </div>
        )}
      </div>

      <button 
        onClick={() => window.location.reload()} 
        style={refreshButtonStyle}>
        🔄 Reset Scanner
      </button>
    </div>
  );
};

// --- STYLES ---
const containerStyle = {
  fontFamily: 'sans-serif',
  backgroundColor: '#0f172a',
  color: 'white',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px'
};

const headerStyle = {
  textAlign: 'center',
  marginBottom: '30px'
};

const scannerStyle = {
  width: '100%',
  maxWidth: '400px',
  borderRadius: '20px',
  overflow: 'hidden',
  border: '2px solid #334155'
};

const statusCardStyle = {
  width: '80%',
  maxWidth: '350px',
  backgroundColor: '#1e293b',
  padding: '20px',
  borderRadius: '15px',
  marginTop: '30px',
  textAlign: 'center',
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
};

const refreshButtonStyle = {
  marginTop: '20px',
  padding: '12px 25px',
  borderRadius: '30px',
  border: 'none',
  backgroundColor: '#38bdf8',
  color: 'white',
  fontWeight: 'bold',
  cursor: 'pointer'
};

export default Scanner;
