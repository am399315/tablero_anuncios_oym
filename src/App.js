// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AnuncioDetalle from './pages/AnuncioDetalle';
import CrearAnuncio from './pages/CrearAnuncio';
import EditarAnuncio from './pages/EditarAnuncio';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
          <Navbar />
          <main className="flex-grow-1">
            <div className="container mt-4">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/anuncio/:id" element={<AnuncioDetalle />} />
                <Route path="/login" element={<Login />} />
                <Route path="/crear" element={
                  <ProtectedRoute>
                    <CrearAnuncio />
                  </ProtectedRoute>
                } />
                <Route path="/editar/:id" element={
                  <ProtectedRoute>
                    <EditarAnuncio />
                  </ProtectedRoute>
                } />
              </Routes>
            </div>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
