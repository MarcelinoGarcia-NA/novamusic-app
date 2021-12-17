import '../../materialize/css/materialize.css'
import '../Login/style.css';
import Logo from '../../images/logo-login.png';
import bannerleft from '../../images/banner.jpg';
import bannerright from '../../images/banner2.jpeg';
import api from '../../services/api';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { login, logout } from "../../services/auth.js";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function Login({ history }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    async function Logar(event) {
        event.preventDefault();

        try {
            const user = {
                email,
                password
            };

            const response = await api.post("/authenticate", user);
            const { token, user: userData } = response.data;
            login(token, userData);
            history.push("/");
        } catch (erro) {
            confirmAlert({
                title: 'Atenção!',
                message: 'E-mail ou senha inválido!',
                buttons : [
                  {
                    label:"ok"
                   
                  }
                ]
              })
        }
    }

    return (
        <div>
            
            <div class="Login-container-image-left">
                <img id="imageLogin" src={bannerleft}></img>
            </div>
            <div class="Login-container-user">
                   
                <div class="row">
                   <Link to="/">
                        <img id="Login-logo" src={Logo}></img>
                    </Link>
                    <form id="form-login" class="col s12" onSubmit={Logar}>
                        <div id="inputEmail" class="row">
                            <label for="email_inline" >Email</label>
                            <input id="email_inline" type="email" class="validate" onChange={event => setEmail(event.target.value)}></input>
                        </div>
                        <div id="inputPassword" class="row">
                            <label for="password_inline">Password</label>
                            <input id="password_inline" type="password" class="validate" onChange={event => setPassword(event.target.value)}></input>
                        </div>
                         <Link to="/cadastro">
                            <a class="link-cadastro">Novo por aqui?</a>
                         </Link>
                         <Link to={"/recuperarAcesso"}>
                            <a class="link-cadastro">Esqueceu a senha?</a>
                         </Link>
                        <button id="btn-login" class="btn waves-effect waves-light" type="submit" name="action">Acessar
                        </button>
                    </form>
                </div>
            </div>
            <div class="Login-container-image-right">
                <img id="imageLogin" src={bannerright}></img>
            </div>
        </div>
    );
}

