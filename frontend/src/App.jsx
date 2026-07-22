import React from 'react';
import { MiraWidget } from './components/MiraWidget';

function App() {
  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>Mira Dashboard</h1>
      
      <div 
        style={{ 
          border: '2px solid #333', 
          padding: '20px', 
          width: '300px',
          height: '500px',
          backgroundColor: '#f0f4f8' 
        }}
      >
        <h2>Sample Content</h2>
        <p>Use the Mira widget to scan your entire laptop screen.</p>
      </div>

      {/* Mira Floating Widget */}
      <MiraWidget />
    </div>
  );
}

export default App;