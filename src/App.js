import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GamePlayer from './pages/GamePlayer';
import Sobre from './pages/Sobre'; 
import Favoritos from './pages/Favoritos';
import './App.css'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Esta é a rota que faz os links mágicos funcionarem: */}
        <Route path="/game/:gameId" element={<GamePlayer />} />
        <Route path="/favoritos" element={<Favoritos />} />
        { <Route path="/sobre" element={<Sobre />} /> }
      </Routes>
    </BrowserRouter>
  );
}

export default App;