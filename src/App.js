// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Games from './pages/Games';
import Credits from './pages/Credits';
import GamePlayer from './pages/GamePlayer'; // 1. Importe o novo componente
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Games />} />
            <Route path="/creditos" element={<Credits />} />
            {/* 2. Adicione a nova rota dinâmica */}
            <Route path="/jogo/:gameId" element={<GamePlayer />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;