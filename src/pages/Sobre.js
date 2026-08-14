import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

import joaoImg from '../assets/joao.png';
import rafaImg from '../assets/rafa.png';
import claraImg from '../assets/clara.png';
import isabelleImg from '../assets/isabelle.png';
import grabalosImg from '../assets/grabalos.png';

export default function Sobre() {
  const fundadores = [
    {
      nome: 'João',
      imagem: joaoImg,
      descricao:
        'Desenvolvedor e um dos fundadores do Cajuice, responsável pela criação do Capybara Evolution, Fruits vs Ants e Boss Slayer.',
    },
    {
      nome: 'Rafa',
      imagem: rafaImg,
      descricao:
        'Desenvolvedor e um dos fundadores do Cajuice, responsável pelos jogos: Flappy Piece, Fruit Dash, Catsteroids, Codebot, Pachislot Machine Simulator e League Royal.',
    },
    {
      nome: 'Clara',
      imagem: claraImg,
      descricao:
        'Principal designer inicial do projeto, responsável pela criação da identidade visual "beta" e responsável pelas principais artes 2D de Fruits vs Ants.',
    },
  ];

  const creditos = [
    {
      nome: 'Fábio (@takeshixd_)',
      texto: 'Design das capivaras de Capybara Evolution.',
      link: 'https://www.instagram.com/takeshixd_/',
    },
    {
      nome: 'Juan (@reisxdd)',
      texto: 'Design das capivaras de Capybara Evolution.',
      link: 'https://www.instagram.com/reisxdd/',
    },
    {
      nome: 'Rafael (@rafonfis)',
      texto: 'Design das capivaras de Capybara Evolution.',
      link: 'https://www.instagram.com/rafonfis/',
    },
    {
      nome: 'Murilo (@assisxdd)',
      texto: 'Design das capivaras de Capybara Evolution.',
      link: 'https://www.instagram.com/assisxdd/',
    },
    {
      nome: 'Chierit',
      texto: 'Principais artes do Boss Slayer.',
      link: 'https://chierit.itch.io/',
    },
    {
      nome: 'Riot',
      texto: 'Possui todos os direitos do League of Legends (Utilizado como inspiração para League Royal).',
      link: 'https://www.riotgames.com/pt-br',
    },
    {
      nome: 'Supercell',
      texto: 'Possui todos os direitos do Clash Royale (Utilizado como inspiração para League Royal).',
      link: 'https://supercell.com',
    },
  ];

  return (
    <>
      <Header />

      <main className="container">
        {/* Introdução */}
        <section className="intro">
          <h2>Sobre o Cajuice</h2>

          <p>
            O Cajuice nasceu com a proposta de reunir jogos simples e rápidos em um único lugar. O objetivo nunca foi alcançar algo grande,
            só jogos divertidos criados entre amigos que possam ser vistos por outras pessoas.
          </p>
        </section>

        {/* Origem do projeto */}
        <section className="project-origin">
          <div className="origin-content">
            <span className="section-label">NOSSA HISTÓRIA</span>

            <h2>Onde tudo começou</h2>

            <p>
              O projeto começou em 2024 a partir da ideia de criar um espaço
              dedicado a pequenos jogos e experiências interativas.
            </p>

            <p>
              O que inicialmente era apenas uma ideia entre seus criadores
              começou a ganhar identidade própria, reunindo programação,
              design, criatividade e, é claro, muitos cajus.
            </p>

            <p>
              Desde então, o Cajuice eventualmente recebe atualizações,
              com novos jogos e pequenos ajustes. O objetivo não é alcançar
              uma grande audiência, mas sim criar um espaço memorável do que
              construimos enquanto estudávamos juntos.
            </p>
          </div>
        </section>

        {/* Fundadores */}
        <section className="about-section founders-section">
          <div className="section-header">
            <span className="section-label">EQUIPE</span>
            <h2>Fundadores</h2>
          </div>

          <div className="members-grid founders-grid">
            {fundadores.map((fundador) => (
              <article className="member" key={fundador.nome}>
                <div className="member-image">
                  <img
                    src={fundador.imagem}
                    alt={`${fundador.nome}, fundador do Cajuice`}
                  />
                </div>

                <div className="member-content">
                  <h3>{fundador.nome}</h3>
                  <p>{fundador.descricao}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Inspiração + Designer */}
        <div className="secondary-sections">
          {/* Inspiração */}
          <section className="about-section inspiration-section">
            <div className="section-header">
              <span className="section-label">INSPIRAÇÃO</span>
              <h2>Inspiração</h2>
            </div>

            <article className="member featured-member">
              <div className="member-image">
                <img
                  src={grabalosImg}
                  alt="Grabalos, inspiração do projeto Cajuice"
                />
              </div>

              <div className="member-content">
                <h3>Grabalos</h3>

                <p>
                  Uma das principais inspirações para o projeto. Foi um grande líder e professor
                  para todos nós, nos ensinando o essencial para poder começar a criar nossos próprios jogos.
                  Toda base do projeto foi feita em homenagem a ele, pois ele adora cajus.
                </p>
              </div>
            </article>
          </section>

          {/* Designer */}
          <section className="about-section designer-section">
            <div className="section-header">
              <span className="section-label">DESIGN</span>
              <h2>Designer</h2>
            </div>

            <article className="member featured-member">
              <div className="member-image">
                <img
                  src={isabelleImg}
                  alt="Isabelle, designer do Cajuice"
                />
              </div>

              <div className="member-content">
                <h3>Isabelle</h3>

                <p>
                  Responsável pela parte criativa e visual de novos projetos,
                  contribuindo principalmente para a identidade do design atual, ajudando a moldar
                  a experiência visual do Cajuice.
                </p>
              </div>
            </article>
          </section>
        </div>

        {/* Créditos */}
        <section className="credits-section">
          <div className="section-header">
            <span className="section-label">AGRADECIMENTOS</span>
            <h2>Créditos</h2>

            <p>
              Pessoas, projetos e recursos que contribuíram para a criação do
              Cajuice.
            </p>
          </div>

          <div className="credits-list">
            {creditos.length > 0 ? (
              creditos.map((credito, index) => (
                <p className="credit-item" key={`${credito.nome}-${index}`}>
                  {credito.texto}{' '}
                  <a
                    href={credito.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {credito.nome}
                  </a>
                </p>
              ))
            ) : (
              <p className="credits-placeholder">
                Os créditos e colaboradores do projeto serão adicionados aqui.
              </p>
            )}
          </div>
        </section>

        {/* Botão */}
        <div className="about-action">
          <Link to="/" className="button">
            Jogue Agora!
          </Link>
        </div>
      </main>

      <footer>
        <p>&copy; 2024 Cajuice. Todos os direitos reservados.</p>
      </footer>
    </>
  );
}