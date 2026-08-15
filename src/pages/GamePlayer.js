import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { gamesData } from '../gamesData';

function GamePlayer() {
    const { gameId } = useParams();
    const navigate = useNavigate();

    const gameContainerRef = useRef(null);

    const [isFavorite, setIsFavorite] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const game = gamesData.find(g => g.id === parseInt(gameId));

    useEffect(() => {
        if (game) {
            const favs = JSON.parse(localStorage.getItem('cajuice_favs')) || [];
            setIsFavorite(favs.includes(game.id));
        }
    }, [game]);

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(document.fullscreenElement === gameContainerRef.current);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, []);

    const toggleFavorite = () => {
        if (!game) return;

        let favs = JSON.parse(localStorage.getItem('cajuice_favs')) || [];

        if (isFavorite) {
            favs = favs.filter(id => id !== game.id);
        } else {
            favs.push(game.id);
        }

        localStorage.setItem('cajuice_favs', JSON.stringify(favs));
        setIsFavorite(!isFavorite);
    };

    const toggleFullscreen = async () => {
        try {
            if (!document.fullscreenElement) {
                await gameContainerRef.current?.requestFullscreen();
            } else {
                await document.exitFullscreen();
            }
        } catch (error) {
            console.error('Erro ao alterar o modo tela cheia:', error);
        }
    };

    if (!game) {
        return (
            <div
                className="container"
                style={{
                    textAlign: 'center',
                    marginTop: '100px'
                }}
            >
                <h2 style={{ color: 'var(--laranja-caju)' }}>
                    Jogo não encontrado!
                </h2>

                <button
                    onClick={() => navigate('/')}
                    className="btn"
                    style={{ marginTop: '20px' }}
                >
                    Voltar para a lista de jogos
                </button>
            </div>
        );
    }

    /*
     * MODO NORMAL
     *
     * O iframe mantém a resolução original do jogo, mas é
     * visualmente reduzido com transform: scale().
     */
    const zoom = 0.85;

    const larguraComZoom = game.width * zoom;
    const alturaComZoom = game.height * zoom;

    /*
     * MODO TELA CHEIA
     *
     * O iframe NÃO é redimensionado.
     *
     * Ele continua usando exatamente:
     *
     * game.width x game.height
     *
     * O container ocupa a tela inteira e usa overflow hidden.
     *
     * Caso o jogo seja maior que a tela, as bordas serão
     * cortadas e o centro continuará visível.
     */
    const wrapperStyle = isFullscreen
        ? {
            width: '100vw',
            height: '100vh',

            position: 'relative',

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

            backgroundColor: '#000',
            overflow: 'hidden',

            borderRadius: '0'
        }
        : {
            width: `${larguraComZoom}px`,
            height: `${alturaComZoom}px`,

            maxWidth: '100%',
            margin: '0 auto',

            position: 'relative',

            backgroundColor: '#000',
            overflow: 'hidden',

            borderRadius: '10px'
        };

    const iframeStyle = isFullscreen
        ? {
            width: `${game.width}px`,
            height: `${game.height}px`,

            minWidth: `${game.width}px`,
            minHeight: `${game.height}px`,

            flexShrink: 0,

            border: 'none',
            display: 'block'
        }
        : {
            width: `${game.width}px`,
            height: `${game.height}px`,

            transform: `scale(${zoom})`,
            transformOrigin: 'top left',

            border: 'none',
            display: 'block'
        };

    return (
        <>
            <Header />

            <div
                className="container"
                style={{
                    maxWidth: `${larguraComZoom + 40}px`
                }}
            >
                <div
                    ref={gameContainerRef}
                    className="game-player"
                    style={wrapperStyle}
                >
                    <iframe
                        src={game.gameUrl}
                        title={game.title}
                        style={iframeStyle}
                        scrolling="no"
                        allowFullScreen
                    />

                    {!isFullscreen && (
                        <button
                            className="favorite-btn"
                            onClick={toggleFavorite}
                            style={{
                                color: isFavorite ? 'red' : '#ccc',
                                zIndex: 10
                            }}
                            aria-label={
                                isFavorite
                                    ? 'Remover dos favoritos'
                                    : 'Adicionar aos favoritos'
                            }
                        >
                            ❤
                        </button>
                    )}

                    {isFullscreen && (
                        <button
                            onClick={toggleFullscreen}
                            className="fullscreen-exit-btn"
                            aria-label="Sair da tela cheia"
                            title="Sair da tela cheia"
                        >
                            ✕
                        </button>
                    )}
                </div>

                <div className="game-info">
                    <h2>{game.title}</h2>

                    <p>{game.description}</p>

                    <div className="buttons">
                        <button
                            onClick={() => navigate('/')}
                            className="btn"
                        >
                            &larr; Voltar
                        </button>

                        <button
                            onClick={toggleFullscreen}
                            className="btn"
                        >
                            Jogar em Tela Cheia
                        </button>
                    </div>
                </div>

                <div className="related">
                    <h3>Outros Jogos</h3>

                    <div className="related-games">
                        {[...gamesData]
                            .filter(g => g.id !== game.id)
                            .sort(() => Math.random() - 0.5)
                            .slice(0, 4)
                            .map(relatedGame => (
                                <div
                                    className="related-game"
                                    key={relatedGame.id}
                                    onClick={() =>
                                        navigate(`/game/${relatedGame.id}`)
                                    }
                                >
                                    <img
                                        src={relatedGame.imageUrl}
                                        alt={relatedGame.title}
                                    />

                                    <p>{relatedGame.title}</p>
                                </div>
                            ))}
                    </div>
                </div>
            </div>

            <footer>
                <p>
                    &copy; 2024 Cajuice. Todos os direitos reservados.
                </p>
            </footer>
        </>
    );
}

export default GamePlayer;