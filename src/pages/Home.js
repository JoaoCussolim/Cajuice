import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { gamesData } from '../gamesData'; 

export default function Home() {
  return (
    <>
      <Header />

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