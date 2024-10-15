import React from 'react';
import ReactDOM from 'react-dom/client';
// IMPORT COMPONENTS
import App from './App';
import Header from './components/headerAndFooter/Header';
import Footer from './components/headerAndFooter/Footer';
// IMPORT STYLES
import "./styles/styles.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
    <App />
    <Footer />
  </React.StrictMode>
);