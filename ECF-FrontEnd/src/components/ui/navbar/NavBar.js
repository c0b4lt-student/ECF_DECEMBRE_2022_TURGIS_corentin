import React from 'react';
import {NavLink} from "react-router-dom";

function NavBar(props) {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <NavLink className="navbar-brand" to="/">GoSport</NavLink>
          <button className="navbar-toggler bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01"
                  aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
          </button>

          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <NavLink to="/partners" className="nav-link">Partenaires</NavLink>
              </li>
              <li className="navbar-nav me-auto">
                <NavLink className="nav-link" to="/gyms">Salles</NavLink>
              </li>
              <li>
                <NavLink className="nav-link" to="/perms">Permissions</NavLink>
              </li>
            </ul>
          </div>
      </nav>
    </>
  );
}

export default NavBar;
