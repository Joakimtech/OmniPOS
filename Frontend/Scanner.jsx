import React, { useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import axios from 'axios';

const Scanner = () => {
  useEffect(() => {
    // This initializes the scanner box
    const scanner = new Html5QrcodeScanner('reader', {
      fps: 10,
      qrbox: { width: 250, height: 250 },
    });

    scanner.render(onScanSuccess, onScanFailure);

    async function onScanSuccess(decodedText) {
      console.log(`Scan result: ${decodedText}`);
      
      try {
        // This sends the barcode to your Python Backend
        await axios.post('http://192.168.0.112:8000/products/', {
          name: "Scanned Item",
          barcode: decodedText,
          price: 0.0,
          stock: 1
        });
        alert(`Success! Barcode ${decodedText} sent to Desktop.`);
      } catch (error) {
        console.error("Failed to send to backend", error);
        alert("Backend not reachable. Check if python run.py is active!");
      }
    }

    function onScanFailure(error) {
      // We leave this empty to keep the camera scanning quietly
    }

    return () => scanner.clear();
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>OmniPOS Mobile Scanner</h2>
      <div id="reader" style={{ width: '100%' }}></div>
      <p>Point your camera at a barcode to add it to the system.</p>
    </div>
  );
};

export default Scanner;