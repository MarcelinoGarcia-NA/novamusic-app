import '../../materialize/css/materialize.css';
import React, { useState, useEffect, Component } from 'react';
import '../Cadastro/style.css';
import Logo from '../../images/logo-login.png';
import api from '../../services/api';
import { login } from '../../services/auth';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function Cadastro({ history }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name_artistic, setNome_artistic] = useState("");
    const telephone="Nova Andradina";
    const [style_music, setStyle_music] = useState("");
    const [link_youtube, setYoutube] = useState("");
    const [link_whats, setWhats] = useState("(67)");
    const [price_cache, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [img,setImg] = useState("");
    const views = "0";
    
    const [listUsers, setListUsers] = useState([]);
    useEffect(() => {
        async function loadList() {
            const response = await api.get("/users");
            setListUsers(response.data);
        }
        loadList();
    }, [listUsers]);

    async function cadastrar(event) {
        event.preventDefault();
       
        if((password.length<8)||(/^[a-zA-Z0-9]+$/.test(password))){
            return(
                confirmAlert({
                    title: 'Atenção!',
                    message: 'A senha deverá ser superior a 8 digítos contendo um caractere especial!',
                    buttons: [
                      {
                        label: 'ok'
                       
                      }
                    ]
                  })
            );
        }if(listUsers !==null){
            listUsers.map(z=>{
                 if(z.email===email){
                    return(confirmAlert({
                        title: 'Atenção!',
                        message: 'O e-mail já se encontra na base de dados!',
                        buttons: [
                          {
                            label: 'ok'
                           
                          }
                        ]
                      }));
                }else  if(z.name_artistic===name_artistic){
                return(  confirmAlert({
                    title: 'Atenção!',
                    message: 'O nome artistico já se encontra na base de dados!',
                    buttons: [
                      {
                        label: 'ok'
                       
                      }
                    ]
                  }));
            }else if(z.link_youtube===link_youtube){
                return(  confirmAlert({
                    title: 'Atenção!',
                    message: 'O link video YouTube já se encontra na base de dados!',
                    buttons: [
                      {
                        label: 'ok'
                       
                      }
                    ]
                  }));
            }
        });
        }if ((email!=="") && (password !=="") && (name_artistic !== "") && (style_music !=="") && (link_youtube.substring(0,32)=="https://www.youtube.com/watch?v=") && (link_whats !=="")) {   
        try {  
                const user = {
                    email,
                    password,
                    name_artistic,
                    telephone,
                    category,
                    style_music,
                    link_youtube,
                    link_whats,
                    price_cache,
                    views
                };
                    const response = await api.post("/users", user);
                    const { token, user: userData } = response.data;
                    login(token, userData);
                    history.push("/");
                
                
            } catch (erro) {
                confirmAlert({
                    title: 'Atenção!',
                    message: 'E-mail já está presente na base de dados!',
                    buttons: [
                      {
                        label: 'ok'
                       
                      }
                    ]
                  })
            }
        } else confirmAlert({
            title: 'Atenção!',
            message: 'Existem campos vazios!',
            buttons: [
              {
                label: 'ok'
               
              }
            ]
          })
    }
   
    const [list, setList] = useState([]);
    useEffect(() => {
        async function loadList() {
            const response = await api.get("/category");
            setList(response.data);
        }
        loadList();
    }, [list]);
    


    return (
        <div class="container-perfil">
            <form class="form-cadastro-perfil" onSubmit={cadastrar}>
                <img id="logo-login" src={Logo}></img>
                <div class="container-form">
                    <label for="email_inline" >Email</label>
                    <input id="email_inline" type="email" class="validate" onChange={event => setEmail(event.target.value)}></input>

                    <label for="password_inline">Password</label>
                    <input id="password_inline" type="password" class="validate" onChange={event => setPassword(event.target.value)}></input>

                    <label for="nome_artistic_inline">Nome Artisitco</label>
                    <input id="nome_artistic_inline" type="text" class="validate" onChange={event => setNome_artistic(event.target.value)}></input>

                    <label for="youtube_inline">Link video YouTube</label>
                    <input id="youtube_inline" type="text" class="validate" onChange={event => setYoutube(event.target.value)}></input>

                    <label for="Whatsapp_inline">Telefone Whatsapp:</label>
                    <input id="Whatsapp_inline" type="tel" class="validate" value={link_whats} onChange={event => setWhats(event.target.value)}></input>

                    <label for="price_cache_inline">Preço do cache por hora</label>
                    <input id="price_cache_inline" type="number" class="validate" placeholder="R$" onChange={event => setPrice("R$"+event.target.value)}></input>
                    <label htmlFor="cat">Categoria</label>

                    <select id="categoria" name="cat" onChange={event => setCategory(event.target.value)} className="browser-default">
                        <option value="" disabled selected>Escolha uma Categoria</option>
                        {list && list.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.name_category}
                            </option>
                        ))}

                    </select>
                    
                    <label htmlFor="cat">Estilo musical</label>
                    <select id="categoria" name="cat" onChange={event => setStyle_music(event.target.value)} className="browser-default">
                        <option value="" disabled selected>Escolha um estilo musical</option>
                            <option value={"ROCK"}>ROCK</option>
                            <option value={"SERTANEJO"}>SERTANEJO</option>
                            <option value={"GOSPEL"}>GOSPEL</option>
                            <option value={"FUNK"}>FUNK</option>
                            <option value={"POP"}>POP</option>
                            <option value={"POPROCK"}>POP ROCK</option>
                            <option value={"POPULAR_BRASILEIRA"}>POPULAR</option>
                            <option value={"AXÉ"}>AXE</option>
                            <option value={"FORRÓ"}>FORRÓ</option>
                            <option value={"BOSSANOVA"}>BOSSA NOVA</option>
                            <option value={"RAP"}>RAP</option>
                            <option value={"HIPHOP"}>HIPHOP</option>
                            <option value={"REAGGE"}>REAGGE</option>
                            <option value={"ELETRÔNICA"}>ELETRÔNICA</option>
                            <option value={"OUTROS"}>OUTROS</option>
                    </select>
                    <div class="cadastro-container-buttons">
                        <button id="btn-cadastrar" class="btn waves-effect waves-light" type="submit" name="action">Cadastrar
                        </button>
                        <Link to="/">
                            <button id="btn-cancelar" class="btn waves-effect waves-light" type="cancel" name="action">Cancelar
                            </button>
                        </Link>
                     </div>   
                   

                </div>
            </form>
        </div>
    );
}

