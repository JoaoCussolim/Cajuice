import React from 'react';
import GameCard from '../components/GameCard';
import BossSlayerLogo from "../assets/bossSlayerLogo.png"
import CapybaraLogo from "../assets/capybaraLogo.png"
import CatsTeroidsLogo from "../assets/catsTeroidsLogo.png"
import FlappyPieceLogo from "../assets/flappyPieceLogo.png"
import FruitDashLogo from "../assets/fruitDashLogo.png"
import FruitsVsAntsLogo from "../assets/fruitVsAntsLogo.png"
import './Games.css';

export const gamesData = [
    {
        id: 1,
        title: "Capybara Evolution",
        description: "Faça combinações de capivaras e crie mutações cada vez mais interessantes!",
        imageUrl: CapybaraLogo,
        gameUrl: "https://capybaraevolutioncajuice.netlify.app/",
        width: 1280, // Adicionado
        height: 780  // Adicionado
    },
    {
        id: 2,
        title: "Fruits vs Ants",
        description: "Um plants vs zombies.. só que um pouco diferente",
        imageUrl: FruitsVsAntsLogo,
        gameUrl: "https://fruitsvsantscajuice.netlify.app/",
        width: 1280, // Adicionado
        height: 720  // Adicionado
    },
    {
        id: 3,
        title: "Boss Slayer",
        description: "Mais simples do que parece, derrotar alguns chefões e ganhar o jogo",
        imageUrl: BossSlayerLogo,
        gameUrl: "https://bossslayercajuice.netlify.app/",
        width: 1280, // Adicionado
        height: 768  // Adicionado
    },
    {
        id: 4,
        title: "Flappy Piece",
        description: "Já imaginou o que aconteceria caso juntasse Flappy Bird com one piece e bosses?",
        imageUrl: FlappyPieceLogo,
        gameUrl: "https://flappypiececajuice.netlify.app/",
        width: 816,
        height: 820
    },
    {
        id: 5,
        title: "Fruit Dash",
        description: "Andar, comer fruta, ficar rápido",
        imageUrl: FruitDashLogo,
        gameUrl: "https://fruitdashcajuice.netlify.app/",
        width: 1280, // Adicionado
        height: 780  // Adicionado
    },
    {
        id: 6,
        title: "CatsTeroids",
        description: "Gatinho com upgrades e asteroides, fórmula pro sucesso",
        imageUrl: CatsTeroidsLogo,
        gameUrl: "https://catsteroidscajuice.netlify.app/",
        width: 1280, // Adicionado
        height: 760  // Adicionado
    },
];

// O resto do componente Games continua o mesmo
function Games() {
    return (
        <div className="page-container">
            <h2>Nossos Jogos</h2>
            <div className="games-grid">
                {gamesData.map(game => (
                    <GameCard
                        key={game.id}
                        id={game.id}
                        title={game.title}
                        description={game.description}
                        imageUrl={game.imageUrl}
                    />
                ))}
            </div>
        </div>
    );
}

export default Games;