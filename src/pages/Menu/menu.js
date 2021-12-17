
import '../../materialize/css/materialize.css'
import '../Menu/style.css';
import Logo from '../../images/logo.png';
import api from '../../services/api';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../services/auth';

export default function Menu() {
    const [list, setList] = useState([]);
    const [alterarBtn, setalterarBtn] = useState("");
    const TOKEN_KEY = "@NOVAMUSIC/token";

    useEffect(() => {
        async function loadList() {
            const response = await api.get("/category");
            setList(response.data);
        }
        loadList();
    }, [list]);



    useEffect(() => {
        if (JSON.parse(localStorage.getItem(TOKEN_KEY) != null)) {
            setalterarBtn("exit_to_app");
        }
        if (JSON.parse(localStorage.getItem(TOKEN_KEY) == null)) {
            setalterarBtn("account_circle");
        }
    });


    function logoutMenu() {
        if (JSON.parse(localStorage.getItem(TOKEN_KEY) != null)) {
            logout();
        }
    }
    return (
        <div >
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
            <nav>

                <div class="nav-wrapper">

                    <a href="#" class="brand-logo">

                        <Link to="/">
                            <img class="logo" src={Logo} alt="" />
                        </Link>
                    </a>
                    <ul class="button-login">
                    <li>
                         <Link to="/login">
                                <a id="btn-login-menu" class="waves-effect waves-light btn-small" onClick={logoutMenu}>
                                    <i id="btn-login-menu" class="large material-icons">{alterarBtn}</i>
                                </a>
                            </Link>
                    </li>
                    </ul>
                    <ul id="nav-mobile" class="right hide-on-med-and-down">
                        {list && list.map(category =>
                            <li>
                                <Link to={"/categoria/" + category._id}>
                                    <a class="name-category">{category.name_category}</a>
                                </Link>
                            </li>

                        )}
                        
                    </ul>
                   
                </div>
            </nav>
            <div class="styleMusic-container">
                <nav class="styleMusic-nav">
                    <div id="styleMusic-list" class="nav-wrapper">
                        <ul id="nav-mobile" class="left hide-on-med-and-down">
                            <li><Link to="/ROCK"><a>ROCK</a></Link></li>
                            <li><Link to="/SERTANEJO"><a>SERTANEJO</a></Link></li>
                            <li><Link to="/POP"><a>POP</a></Link></li>
                            <li><Link to="/FUNK"><a>FUNK</a></Link></li>
                            <li><Link to="/PAGODE"><a>PAGODE</a></Link></li>
                            <li><Link to="/POPROCK"><a>POP/ROCK</a></Link></li>
                            <li><Link to="/GOSPEL"><a>GOSPEL</a></Link></li>

                            <li class="nav-style-music">MAIS
                                <ul>
                                    <li class="nav-style-music"><Link to="/REAGGE"><a>REAGGE</a></Link></li>
                                    <li class="nav-style-music"><Link to="/AXÊ"><a>AXÊ</a></Link></li>
                                    <li class="nav-style-music"><Link to="/BOSSANOVA"><a>BOSSANOVA</a></Link></li>
                                    <li class="nav-style-music"><Link to="/RAP"><a>RAP</a></Link></li>
                                    <li class="nav-style-music"><Link to="/POPULAR_BRASILEIRA"><a>POPULAR</a></Link></li>
                                    <li class="nav-style-music"><Link to="/HIPHOP"><a>HIP/HOP</a></Link></li>
                                    <li class="nav-style-music"><Link to="/FORRÓ"><a>FORRÓ</a></Link></li>
                                    <li class="nav-style-music"><Link to="/ELETRÔNICA"><a>ELETRÔNICA</a></Link></li>
                                    <li class="nav-style-music"><Link to="/ELETRÔNICA"><a>OUTROS</a></Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    );

}

