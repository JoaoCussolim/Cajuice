import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import { gamesData } from '../gamesData';

function GamePlayer() {
    const { gameId } = useParams();
    const navigate = useNavigate();
    
    // Novo estado para controlar se o coração está marcado
    const [isFavorite, setIsFavorite] = useState(false);

    const game = gamesData.find(g => g.id === parseInt(gameId));

    // Assim que a tela carregar, verifica se o jogo já está nos favoritos
    useEffect(() => {
        if (game) {
            const favs = JSON.parse(localStorage.getItem('cajuice_favs')) || [];
            setIsFavorite(favs.includes(game.id));
        }
    }, [game]);

    // Função que roda ao clicar no coração
    const toggleFavorite = () => {
        let favs = JSON.parse(localStorage.getItem('cajuice_favs')) || [];
        
        if (isFavorite) {
            // Remove dos favoritos
            favs = favs.filter(id => id !== game.id);
        } else {
            // Adiciona aos favoritos
            favs.push(game.id);
        }
        
        localStorage.setItem('cajuice_favs', JSON.stringify(favs));
        setIsFavorite(!isFavorite); // Inverte a cor do coração
    };

    if (!game) {
        return (
            <div className="container" style={{ textAlign: 'center', marginTop: '100px' }}>
                <h2 style={{ color: 'var(--laranja-caju)' }}>Jogo não encontrado!</h2>
                <button onClick={() => navigate('/')} className="btn" style={{ marginTop: '20px' }}>
                    Voltar para a lista de jogos
                </button>
            </div>
        );
    }

    // 1. Defina o nível de zoom (0.75 = 75% do tamanho original)
    const zoom = 0.85; 

    // 2. Calculamos a caixa menor que vai segurar o iframe
    const larguraComZoom = game.width * zoom;
    const alturaComZoom = game.height * zoom;

    // 3. Estilo da "caixa" (wrapper) que abraça o jogo
    const wrapperStyle = {
        width: `${larguraComZoom}px`,
        height: `${alturaComZoom}px`,
        maxWidth: '100%',
        margin: '0 auto',
        position: 'relative',
        backgroundColor: '#000',
        overflow: 'hidden', // Corta qualquer rebarba
        borderRadius: '10px' // Mantém os cantos arredondados
    };

    // 4. Estilo do iframe (O truque mágico do zoom)
    const iframeStyle = {
        width: `${game.width}px`,
        height: `${game.height}px`,
        transform: `scale(${zoom})`, // Aplica o zoom out
        transformOrigin: 'top left', // Garante que encolha a partir do canto superior esquerdo
        border: 'none',
        display: 'block'
    };

    return (
        <>
            <Header />

            <div className="container" style={{ maxWidth: `${larguraComZoom + 40}px` }}>
                
                {/* A caixa com tamanho reduzido */}
                <div className="game-player" style={wrapperStyle}>
                    <iframe
                        src={game.gameUrl}
                        title={game.title}
                        style={iframeStyle} /* <-- Aplicamos o truque aqui! */
                        scrolling="no"
                        allowFullScreen={true}
                    ></iframe>
                    
                    <button 
                        className="favorite-btn" 
                        onClick={toggleFavorite}
                        style={{ color: isFavorite ? 'red' : '#ccc', zIndex: 10 }}
                    >
                        ❤
                    </button>
                </div>

                <div className="game-info">
                    <h2>{game.title}</h2>
                    <p>{game.description}</p>

                    <div className="buttons">
                        <button onClick={() => navigate('/')} className="btn">
                            &larr; Voltar
                        </button>
                        <a href={game.gameUrl} target="_blank" rel="noreferrer" className="btn">
                            Jogar em Tela Cheia
                        </a>
                    </div>
                </div>

                <div className="related">
                    <h3>Outros Jogos</h3>
                    <div className="related-games">
                        {[...gamesData] // Cria uma cópia da lista original
                            .filter(g => g.id !== game.id) // Remove o jogo atual
                            .sort(() => Math.random() - 0.5) // 🎲 Embaralha a lista aleatoriamente!
                            .slice(0, 4) // Pega os 4 primeiros da lista já embaralhada
                            .map((relatedGame) => (
                                <div 
                                    className="related-game" 
                                    key={relatedGame.id} 
                                    onClick={() => navigate(`/game/${relatedGame.id}`)}
                                >
                                    <img src={relatedGame.imageUrl} alt={relatedGame.title} />
                                    <p>{relatedGame.title}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

            <footer>
                <p>&copy; 2024 Cajuice. Todos os direitos reservados.</p>
            </footer>
        </>
    );
}

export default GamePlayer;