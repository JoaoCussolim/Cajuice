import React from 'react';
import { Link } from 'react-router-dom';

export default function Sobre() {
  return (
    <>
      <header>
        <section className="hero">
          <h2>Bem-vindo ao Cajuice!</h2>
          <p>Jogue minigames divertidos e desafie seus amigos em uma experiência única!</p>
        </section>
      </header>

      <div className="container">
        <section className="intro">
          <h2>Bem-vindo ao Mundo dos Jogos!</h2>
          <p>
            No Minigames, nossa missão é oferecer diversão instantânea com jogos simples, rápidos e cheios de desafios! 
            Criamos este espaço para que qualquer pessoa, de qualquer idade, possa se divertir a qualquer hora. 
            Seja você um fã de jogos casuais ou um viciado em desafios, temos algo especial para você!
          </p>
        </section>

        <section className="timeline">
          <div>
            <h3>2024 - O Início</h3>
            <p>O projeto começou com a ideia de criar um site para jogos rápidos e viciantes.</p>
          </div>
          <div>
            <h3>2024 - Primeiros Jogos</h3>
            <p>O primeiro jogo foi lançado! Agora, a diversão é garantida para todos!</p>
          </div>
          <div>
            <h3>2025 - O Futuro</h3>
            <p>Estamos sempre criando novos desafios para você! O que vem por aí? Fique ligado!</p>
          </div>
        </section>

        <section className="team">
          <div className="member">
            <img src="https://via.placeholder.com/150" alt="João e Rafa, criador de jogos" />
            <h3>João e Rafa</h3>
            <p>O criador dos jogos. Sempre com novas ideias para desafios incríveis!</p>
          </div>
          <div className="member">
            <img src="https://via.placeholder.com/150" alt="Isabelle, designer criativa" />
            <h3>Isabelle</h3>
            <p>Designer criativa. Garante que cada jogo seja visualmente espetacular!</p>
          </div>
          <div className="member">
            <img src="https://via.placeholder.com/150" alt="Grabalos, principal inspiração" />
            <h3>Grabalos</h3>
            <p>Foi a principal inspiração para o projeto. Sua visão criativa e paixão por cajus foi fundamental para dar início a tudo!</p>
          </div>
          <div className="member">
            <img src="https://via.placeholder.com/150" alt="Clara, gerente de projetos" />
            <h3>Clara</h3>
            <p>Gerente de projetos. Organiza os prazos e coordenadas das novas atualizações!</p>
          </div>
        </section>

        <Link to="/" className="button">Jogue Agora!</Link>
      </div>

      <footer>
        <p>&copy; 2024 Cajuice. Todos os direitos reservados.</p>
      </footer>
    </>
  );
}