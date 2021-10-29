
import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css';

function Navigation() {
  return (
    <nav>
      <NavLink to="/" exact className={s.link} activeClassName={s.activeLink}>
        Main
      </NavLink>
      <NavLink to="/people" exact className={s.link} activeClassName={s.activeLink}>
        People
      </NavLink>
      <NavLink to="/planets" className={s.link} activeClassName={s.activeLink}>
        Planets
      </NavLink>
      <hr />
    </nav>
  );
}

export default Navigation;