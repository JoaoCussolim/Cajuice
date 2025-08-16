import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

function Header() {
    return (
        <header className="site-header">
            <div className="header-content">
                <h1 className="site-title">Cajuice</h1>
                <nav>
                    <ul>
                        <li>
                            <NavLink to="/" className={({ isActive }) => isActive ? 'active-link' : ''}>
                                Jogos
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/creditos" className={({ isActive }) => isActive ? 'active-link' : ''}>
                                Créditos
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;