import React from 'react';
import './Credits.css';

// Lista de pessoas a serem creditadas.
// Para adicionar mais gente, basta adicionar um novo objeto aqui!
const creditsData = [
    { id: 1, name: 'João Victor', role: 'Criador de Jogos' },
    { id: 2, name: 'Rafael Brasil', role: 'Criador de Jogos' },
    { id: 3, name: 'Clara Alves', role: 'Designer e Artista 2D' },
    { id: 4, name: 'Isabelle Martines', role: 'Designer' },
    { id: 5, name: 'Gabriel Grabalos', role: 'Mentor do Grupo / Maior inspiração para a criação do projeto' },
];

function Credits() {
    return (
        <div className="page-container">
            <h2>Créditos</h2>
            <div className="credits-list">
                <p className="credits-intro">
                    Este projeto é fruto do trabalho e da paixão de muitas pessoas.
                    Agradecemos a cada um que contribuiu para dar vida ao Cajuice!
                </p>
                {creditsData.map(person => (
                    <div key={person.id} className="credit-item">
                        <h3 className="credit-name">{person.name}</h3>
                        <p className="credit-role">{person.role}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Credits;