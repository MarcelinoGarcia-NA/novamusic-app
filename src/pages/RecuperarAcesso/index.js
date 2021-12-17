import '../../materialize/css/materialize.css'
import '../Login/style.css';
import '../RecuperarAcesso/style.css';
import Logo from '../../images/logo-login.png';
import bannerleft from '../../images/banner.jpg';
import bannerright from '../../images/banner2.jpeg';
import api from '../../services/api';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import imageLogin from '../../images/imageLogin.jpg';
import { login, logout } from "../../services/auth.js";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function RecuperarAcesso({history}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [codigo, setCodigo] = useState("");
    const [regainAccess,setRegainAccess]=useState("");
    const [codigoResponse, setCodigoResponse] = useState("");
   async function submitCodEmail(event) {
        event.preventDefault();
        try{
            const emailsubmit = {
                email
            };
            const response= await api.post("/users/submitEmail/", emailsubmit);
            setCodigoResponse((response.data).toString());
           setRegainAccess("email-enviado");
        } catch (erro) {
            confirmAlert({
                title: 'Atenção!',
                message: 'Ocorreu um erro ao logar!',
                buttons: [
                  {
                    label: 'ok'
                   
                  }
                ]
              })
        }
    }
    
    async function saveNewPassword(event) {
        
        event.preventDefault(); 
        if(password!==confirmPassword){
            confirmAlert({
                title: 'Atenção!',
                message: 'Senhas divergentes!',
                buttons: [
                  {
                    label: 'ok'
                   
                  }
                ]
              })
            }
        if(codigo!==codigoResponse){
            confirmAlert({
                title: 'Atenção!',
                message: 'Código não é válido!',
                buttons: [
                  {
                    label: 'ok'
                   
                  }
                ]
              })
        }    
        try{
            if(password===confirmPassword){
                if(codigo===codigoResponse){
                    const emailsubmit = {
                        email, 
                        password
                    };
                    await api.put("/users/regainAccess/"+email,emailsubmit);
                    const response = await api.post("/authenticate", emailsubmit);
                    const { token, user: userData } = response.data;
                    login(token, userData);
                    history.push("/");
                } 
        }   
        } catch (erro) {
            confirmAlert({
                title: 'Atenção!',
                message: 'Ocorreu um erro ao logar!',
                buttons: [
                  {
                    label: 'ok'
                   
                  }
                ]
              })
        }
    }

    if(regainAccess===""){
    return (
        <div>
            <div class="Login-container-image-left">
                <img id="imageLogin" src={bannerleft}></img>
            </div>
            <div class="Login-container-user">
                    <Link to="/">
                        <img  class="Login-logo-recuperar-acesso" src={Logo}></img>
                    </Link>
                <div class="row">
              
                    <form id="form-login" class="col s12" onSubmit={submitCodEmail}>
                        <div id="inputEmail" class="row">
                            <label for="email_inline" >Será enviado um código de verificação em seu email!</label>
                            <input id="email_inline" type="email" placeholder="informe seu email" class="validate" onChange={event => setEmail(event.target.value)}></input>
                        </div>
                        <button id="btn-login" class="btn waves-effect waves-light" type="submit" name="action">Enviar
                        </button>
                    </form>
               
                </div>
            </div>
            <div class="Login-container-image-right">
                <img id="imageLogin" src={bannerright}></img>
            </div>
        </div>
    );
    }else{
        return(
            <div>
               <div class="Login-container-image-right">
                <img id="imageLogin" src={bannerright}></img>
            </div>
            <div class="Login-container-user">
                    <Link to="/">
                        <img class="Login-logo-recuperar-acesso" src={Logo}></img>
                    </Link>
                <div class="row">
              
                    <form  class="col s12" onSubmit={saveNewPassword}>
                       <div id="inputPassword" class="row">
                            <input id="password_inline" type="text" placeholder="código de verificão" class="validate" onChange={event => setCodigo(event.target.value)}></input>
                        </div>
                        <div id="inputPassword" class="row">
                            <label for="password_inline">New Password</label>
                            <input id="password_inline" type="password" class="validate" onChange={event => setPassword(event.target.value)}></input>
                        </div>
                        <div id="inputPassword" class="row">
                            <label for="password_inline">Confirm Password</label>
                            <input id="password_inline" type="password" class="validate" onChange={event => setConfirmPassword(event.target.value)}></input>
                        </div>
                        <button id="btn-login" class="btn waves-effect waves-light" type="submit" name="action">Salvar
                        </button>
                    </form>
               
                </div>
            </div>
            <div class="Login-container-image-left">
                <img id="imageLogin" src={bannerleft}></img>
            </div>
        </div>

        );
    }
}

