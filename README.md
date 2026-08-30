# Cajuice

Cajuice is a web platform created to host and showcase original browser-based games.

The website itself was built with React, while each game is hosted separately and loaded into the platform through an `iframe`. This keeps the games independent from the main website and allows each one to be developed and deployed as its own project.

## How It Works

Each game is created as an independent web application and then embedded inside Cajuice.

Instead of relying on a ready-made game engine, the games are built mainly with JavaScript and the HTML5 Canvas API, using custom logic for systems such as:

- Movement
- Collision detection
- Game loops
- Physics
- Animations
- Controls
- State management

The goal of the project is to explore game development fundamentals by implementing these systems directly in code.

## Architecture

Cajuice works as a central hub for the games.

- **React** is used to build the platform interface.
- Individual games are hosted separately.
- Games are displayed inside the platform using `iframe`.
- Each game can be maintained independently from the main website.

## Technologies

- React
- JavaScript
- HTML5
- CSS3
- HTML5 Canvas
- iframe integration

## Games

The platform includes different original browser games developed as separate projects.

Most of them were created without a traditional game engine, focusing instead on manually implemented gameplay logic, physics, collision systems, and rendering.

## Purpose

Cajuice was created both as a game platform and as a way to experiment with browser-based game development, especially the fundamentals normally handled automatically by game engines.
