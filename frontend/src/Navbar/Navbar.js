import React from 'react'
import styles from './style.css';
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <div>
        <header class="header">
        <div class="navbar ">
            <ul class="navbar-list">
                <li class="navbar-item">
                    <a class="white-text">
                        <Link to="/">Home</Link>
                    </a>
                </li>
                <li class="navbar-item">
                    <a  class="white-text">
                    <Link to="/projects">Projects</Link>
                    </a>
                </li>
                <li class="navbar-item">
                    <a  class="white-text">
                    <Link to="/applicatants">Applicatiants</Link>
                    </a>
                </li>

            </ul>

            <div class="user">
                <div class="user-img">
                    <span class="user-H">
                        Q
                    </span>
                </div>
                <div class="user-name">
                    Minh Quyen
                </div>
            </div>
        </div>
    </header>
    </div>
  )
}

export default Navbar
