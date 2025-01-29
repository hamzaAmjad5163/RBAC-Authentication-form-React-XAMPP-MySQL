import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../assets/images/logo.png';
import '../App.css';
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/"> <img className='logo' src={Logo} alt='Logo' /> </NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
          <li className="nav-item">
              <NavLink className="nav-link" to="/user">Dashboard</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
