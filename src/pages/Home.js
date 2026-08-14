import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header'; // <-- Puxa o Header inteligente
import { gamesData } from '../gamesData'; 

export default function Home() {
  return (
    <>
      <Header />

      <section className="hero">
        <div className="hero-cards">
          <div className="hero-card large">
            <h3>Promoção de lançamento!</h3>
            <p>Ganhe bônus jogando Capybara Evolution.</p>
          </div>
          <div className="hero-right">
            <div className="hero-card">
              <h3>Novidade!</h3>
              <p>Frutas vs Formigas agora com multiplayer.</p>
            </div>
            <div className="hero-card">
              <h3>Destaque da semana</h3>
              <p>Desafie o Boss Slayer e entre no ranking.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="games-header">
        <h2>Games</h2>
        <div className="line"></div>
      </section>

      <section className="games-gallery">
        {gamesData.map(game => (
            <div className="game" key={game.id}>
                <img src={game.imageUrl} alt={game.title} />
                <Link to={`/game/${game.id}`} className="btn">
                    Jogar {game.title}
                </Link>
            </div>
        ))}
      </section>

      <footer>
        <p>&copy; 2024 Cajuice.</p>
      </footer>
    </>
  );
}