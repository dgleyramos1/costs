import React from 'react';
import { NavLink } from 'react-router-dom';
import Container from './Container';
import styles from './Navbar.module.css';
import logo from '../../img/costs_logo.png';

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <Container>
                <NavLink to="/" >
                    <img src={logo} alt="Costs" />
                </NavLink>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li className={styles.item}>
                        <NavLink to="/projects">Projects</NavLink>
                    </li>
                    <li  className={styles.item}>
                        <NavLink to="/contact">Contato</NavLink>
                    </li>
                    <li  className={styles.item}>
                        <NavLink to="/company">Company</NavLink>
                    </li>
                </ul>
                
            </Container>
        </nav>
    );
}

export default Navbar;