import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Importa o CSS global
import App from './App'; // Importa o componente principal App

// Cria a raiz do React e renderiza o componente App nela.
// O document.getElementById('root') refere-se ao div com id="root" em public/index.html.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);