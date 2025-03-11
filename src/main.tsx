import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

let rootElement = document.getElementById('erin-popup-root');
if (!rootElement) {
  rootElement = document.createElement('div');
  rootElement.id = 'erin-popup-root';
  document.body.appendChild(rootElement);
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
