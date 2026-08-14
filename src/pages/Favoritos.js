import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gamesData } from '../gamesData';
import Header from '../components/Header';

export default function Favoritos() {
    const [favGames, setFavGames] = useState([]);

    useEffect(() => {
        // Puxa os IDs salvos no navegador (ex: [1, 3, 5])
        const favIds = JSON.parse(localStorage.getItem('cajuice_favs')) || [];

        // Filtra a base de dados para pegar apenas os jogos que estão na lista de IDs
        const filteredGames = gamesData.filter(game => favIds.includes(game.id));
        setFavGames(filteredGames);
    }, []);

    return (
        <>
            <Header />

            {/* minHeight garante que o footer não suba se você tiver poucos favoritos */}
            <div className="container" style={{ minHeight: '60vh' }}>
                <section className="games-header">
                    <h2>Meus Favoritos</h2>
                    <div className="line"></div>
                </section>

                {favGames.length === 0 ? (
                    <p style={{ textAlign: 'center', marginTop: '40px', fontSize: '1.2rem', color: '#ccc' }}>
                        Você ainda não tem nenhum jogo favorito. Vá jogar e clique no coração!
                    </p>
                ) : (
                    <section className="games-gallery">
                        {favGames.map(game => (
                            <div className="game" key={game.id}>
                                <img src={game.imageUrl} alt={game.title} />
                                <Link to={`/game/${game.id}`} className="btn">
                                    Jogar {game.title}
                                </Link>
                            </div>
                        ))}
                    </section>
                )}
            </div>

            <footer>
                <p>&copy; 2024 Cajuice. Todos os direitos reservados.</p>
            </footer>
        </>
    );
}