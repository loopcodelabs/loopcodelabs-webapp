import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { WebsiteProvider } from './context/WebsiteContext.tsx';

// Suppress benign Vite HMR websocket reconnection noise in dev sandbox environment
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    if (
      event.reason &&
      (typeof event.reason === 'string'
        ? event.reason.includes('WebSocket')
        : event.reason?.message?.includes('WebSocket') || event.reason?.toString?.().includes('WebSocket'))
    ) {
      event.preventDefault();
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WebsiteProvider>
      <App />
    </WebsiteProvider>
  </StrictMode>,
);
