import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gamesData } from './Games'; // Importando nossa lista de jogos
import './GamePlayer.css';

function GamePlayer() {
    const { gameId } = useParams();
    const navigate = useNavigate();

    const game = gamesData.find(g => g.id === parseInt(gameId));

    if (!game) {
        return (
            <div className="game-player-container">
                <h2>Jogo não encontrado!</h2>
                <button onClick={() => navigate('/')} className="back-button">Voltar para a lista de jogos</button>
            </div>
        );
    }

    // Define um estilo para o cabeçalho para que ele tenha a mesma largura do jogo
    const headerStyle = {
        width: game.width,
    };

    // Define o estilo para o wrapper do iframe, garantindo a responsividade e o tamanho máximo
    const wrapperStyle = {
        maxWidth: game.width,
        maxHeight: game.height,
        aspectRatio: `${game.width} / ${game.height}`, // Mantém a proporção correta
    };

    return (
        <div className="game-player-container">
            {/* Aplica o estilo dinâmico ao cabeçalho */}
            <div className="game-header" style={headerStyle}>
                <h2>{game.title}</h2>
                <button onClick={() => navigate('/')} className="back-button">
                    &larr; Voltar
                </button>
            </div>
            {/* Aplica o estilo dinâmico ao wrapper */}
            <div className="iframe-wrapper" style={wrapperStyle}>
                <iframe
                    src={game.gameUrl}
                    title={game.title}
                    // Usa as dimensões do objeto 'game'
                    width={game.width}
                    height={game.height}
                    scrolling="no"
                    frameBorder="0"
                    allowFullScreen={true}
                ></iframe>
            </div>
        </div>
    );
}

export default GamePlayer;