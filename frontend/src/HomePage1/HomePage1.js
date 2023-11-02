import React from 'react'
import styles from './HomePage1.css';
import img1 from '../image/6207670.jpg';
import { Link } from 'react-router-dom';
const HomePage1 = () => {
  return (
    <div>
    <section class="centent-body">

        <div class="slider">
            <div class="item">
                <img src={img1} alt=""/>
                <div class="slogan1">GREEN SUMMER</div>
                <div class="slogan2">
                    JOIN AND HAVE FUN
                </div>
            </div>
        </div>


        <script src="app.js"></script>
    </section>

    <footer class="footer">
        <div class="footer-content-1">
            <div class="footer-content-11">
                <div class="useful-link">
                    <span>
                        Useful Links
                    </span>
                    <ul class="useful-link-list">
                        <li>
                            Home
                        </li>
                        <li>
                            About us
                        </li>
                        <li>
                            Product
                        </li>
                        <li>
                            Services
                        </li>
                        <li>
                            Contact us
                        </li>

                    </ul>
                </div>
                <div class="about-us">
                    <span>
                        About us
                    </span>
                    <p>
                        Green Summer
                    </p>

                </div>
                <div class="Connect-with-us">
                    <span>

                        Connect with us
                    </span>
                    <ul>
                        <li>
                            <i class="fa-regular fa-comments"></i>
                            Contact us
                        </li>
                        <li>
                            minhquyen123@grad.uit.edu.vn
                        </li>
                        <li>
                            0123456789
                        </li>

                    </ul>
                </div>
            </div>

        </div>
        <div class="footer-content-2">
            <span>
                Copyright © Company name
            </span>
        </div>
    </footer>
</div>
  )
}

export default HomePage1
