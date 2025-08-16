import React from 'react';
import { Link } from 'react-router-dom'; // Importe o Link
import './GameCard.css';

// O componente agora também recebe o 'id' do jogo
function GameCard({ id, title, description, imageUrl }) {
    return (
        <div className="game-card">
            <img src={imageUrl} alt={`Capa do jogo ${title}`} className="game-card-image" />
            <div className="game-card-content">
                <h3>{title}</h3>
                <p>{description}</p>
                {/* O botão agora é um Link que leva para a rota /jogo/ID_DO_JOGO */}
                <Link to={`/jogo/${id}`} className="play-button">
                    Jogar
                </Link>
            </div>
        </div>
    );
}

export default GameCard;