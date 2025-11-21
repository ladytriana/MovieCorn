import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// HANYA ADA SATU ROUTER DI SELURUH APLIKASI, yaitu di sini
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* App adalah komponen anak pertama dari BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);