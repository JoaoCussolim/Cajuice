import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Fuse from 'fuse.js';
import { gamesData } from '../gamesData'; // Importa a sua base de dados

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [busca, setBusca] = useState('');
  const [resultados, setResultados] = useState([]);

  // Configuração da pesquisa inteligente
  const fuse = new Fuse(gamesData, {
    keys: ['title'],
    threshold: 0.4,
  });

  const handleSearch = (e) => {
    const termo = e.target.value;
    setBusca(termo);

    if (termo.length > 0) {
      const resultadosDaBusca = fuse.search(termo);
      setResultados(resultadosDaBusca.map(resultado => resultado.item));
    } else {
      setResultados([]);
    }
  };

  const limpaBusca = () => {
    setBusca('');
    setResultados([]);
  };

  return (
    <>
      <header>
        <button className="hamburger" onClick={() => setSidebarOpen(true)}>☰</button>
        <div className="logo">
          {/* Logo clicável que leva pra Home */}
          <Link to="/">
            <img src="/Logo.png" alt="Logo Cajuice" />
          </Link>
        </div>

        <div className="search-bar" style={{ position: 'relative' }}>
          <input 
            type="search" 
            placeholder="Buscar..." 
            value={busca}
            onChange={handleSearch}
          />

          {resultados.length > 0 && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: '20px',
              right: '20px',
              backgroundColor: 'var(--fundo-card)',
              borderRadius: '10px',
              zIndex: 1000,
              marginTop: '5px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.6)',
              maxHeight: '300px',
              overflowY: 'auto'
            }}>
              {resultados.map(game => (
                <Link 
                  key={game.id} 
                  to={`/game/${game.id}`} 
                  onClick={limpaBusca}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px 15px',
                    borderBottom: '1px solid #555',
                    color: 'white',
                    transition: 'background-color 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#555'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <img 
                    src={game.imageUrl} 
                    alt={game.title} 
                    style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '5px', marginRight: '15px' }} 
                  />
                  <span style={{ fontWeight: 'bold' }}>{game.title}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        <nav>
          <ul>
            <li><Link to="/">Início</Link></li>
            <li><Link to="/favoritos">Favoritos</Link></li>
            <li><Link to="/sobre">Sobre</Link></li>
          </ul>
        </nav>
      </header>

      {/* A Sidebar também vem pra cá, afinal ela é parte da navegação! */}
      <div className="sidebar" style={{ width: sidebarOpen ? '250px' : '0' }}>
        <span className="close-btn" onClick={() => setSidebarOpen(false)}>&times;</span>
        <Link to="/" onClick={() => setSidebarOpen(false)}>Início</Link>
        <Link to="/favoritos" onClick={() => setSidebarOpen(false)}>Favoritos</Link>
        <Link to="/sobre" onClick={() => setSidebarOpen(false)}>Sobre</Link>
      </div>
    </>
  );
}