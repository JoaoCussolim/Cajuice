import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

import joaoImg from '../assets/joao.png';
import rafaImg from '../assets/rafa.png';
import claraImg from '../assets/clara.png';
import isabelleImg from '../assets/isabelle.png';
import grabalosImg from '../assets/grabalos.png';

export default function Sobre() {
  const colaboradores = [
    {
      nome: 'João',
      imagem: joaoImg,
      descricao:
        'Desenvolvedor e um dos fundadores do Cajuice, responsável pela criação do Capybara Evolution, Fruits vs Ants, Boss Slayer e Slime Jumper.',
    },
    {
      nome: 'Rafa',
      imagem: rafaImg,
      descricao:
        'Desenvolvedor e um dos fundadores do Cajuice, responsável pelos jogos: Flappy Piece, Fruit Dash, Catsteroids, Codebot, Pachislot Machine Simulator e League Royal.',
    },
    {
      nome: 'Isabelle',
      imagem: isabelleImg,
      descricao:
        'Responsável pela parte criativa e visual de novos projetos, contribuindo principalmente para a identidade do design atual, ajudando a moldar a experiência visual do Cajuice.',
    },
    {
      nome: 'Clara',
      imagem: claraImg,
      descricao:
        'Principal designer inicial do projeto, responsável pela criação da identidade visual "beta" e responsável pelas principais artes 2D de Fruits vs Ants.',
    },
    {
      nome: 'Grabalos',
      imagem: grabalosImg,
      descricao:
        'Uma das principais inspirações para o projeto. Foi um grande líder e professor para todos nós, nos ensinando o essencial para poder começar a criar nossos próprios jogos. Toda base do projeto foi feita em homenagem a ele, pois ele adora cajus.',
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
    {
      nome: 'Pixelsnorf',
      texto: 'Modelos de slime do Slime Jumper.',
      link: 'https://pixelsnorf.itch.io/platformer-slimes',
    },
    {
      nome: 'Ma9ici4n',
      texto: 'Modelos de tiles de grama do Slime Jumper.',
      link: 'https://ma9ici4n.itch.io/grass-tileset-pixel-art',
    },
    {
      nome: 'Jennpixel',
      texto: 'Modelo das flores utilizadas em Slime Jumper.',
      link: 'https://jennpixel.itch.io/free-flower-pack-12-icons',
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
            O Cajuice nasceu com a proposta de reunir jogos simples e rápidos em
            um único lugar. O objetivo nunca foi alcançar algo grande, só jogos
            divertidos criados entre amigos que possam ser vistos por outras
            pessoas.
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
              Desde então, o Cajuice eventualmente recebe atualizações, com
              novos jogos e pequenos ajustes. O objetivo não é alcançar uma
              grande audiência, mas sim criar um espaço memorável do que
              construimos enquanto estudávamos juntos.
            </p>
          </div>
        </section>

        {/* Colaboradores */}
        <section className="about-section collaborators-section">
          <div className="section-header">
            <span className="section-label">EQUIPE</span>
            <h2>Colaboradores</h2>
          </div>

          <div className="members-grid collaborators-grid">
            {colaboradores.map((colaborador) => (
              <article className="member" key={colaborador.nome}>
                <div className="member-image">
                  <img
                    src={colaborador.imagem}
                    alt={`${colaborador.nome}, colaborador do Cajuice`}
                  />
                </div>

                <div className="member-content">
                  <h3>{colaborador.nome}</h3>
                  <p>{colaborador.descricao}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

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