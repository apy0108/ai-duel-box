
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Get the root element
const rootElement = document.getElementById('root');

// Create root only if the element exists
if (rootElement) {
  createRoot(rootElement).render(<App />);
} else {
  console.error('Root element not found');
}
