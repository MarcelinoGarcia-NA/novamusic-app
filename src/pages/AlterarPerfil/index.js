import '../../materialize/css/materialize.css';
import React, { useState, useEffect, Component } from 'react';
import '../Cadastro/style.css';
import Logo from '../../images/logo.png';
import api from '../../services/api';
import { login } from '../../services/auth';
import { Link } from 'react-router-dom';
import { logout } from '../../services/auth';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function AlterarPerfil({ history }) {
    const USER = "@NOVAMUSIC:user";
    const [userLocal,setUserLocal]=useState([]);
    const recebeUser = JSON.parse(localStorage.getItem(USER));

    const email = recebeUser.email;
    const password= recebeUser.password;
    const [name_artistic, setNome_artistic] = useState(recebeUser.name_artistic);
    const [style_music, setStyle_music] = useState(recebeUser.style_music);
    const [link_youtube, setYoutube] = useState(recebeUser.link_youtube);
    const [link_whats, setWhats] = useState(recebeUser.link_whats);
    const [price_cache, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [img,setImg] = useState("");
    const views = recebeUser.views;

    const [listUsers, setListUsers] = useState([]);
    useEffect(() => {
        async function loadList() {
            const response = await api.get("/users");
            setListUsers(response.data);
        }
        loadList();
    }, [listUsers]);

    
    async function alterar(event) {
        event.preventDefault();
        await listUsers.map(z=>{if(z._id===recebeUser._id){
            z.name_artistic=null;
            z.link_youtube=null}});
         if(listUsers !==null){
            listUsers.map(z=>{
               if(z.name_artistic===name_artistic){
                return(confirmAlert({
                    title: 'Atenção!',
                    message: 'O nome artistico já se encontra na base de dados!',
                    buttons: [
                      {
                        label: 'ok'
                       
                      }
                    ]
                  }));
            }if(z.link_youtube===link_youtube){
                return(confirmAlert({
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
        }
            try {
                const user = {
                    email,
                    password,
                    name_artistic,
                    category,
                    style_music,
                    link_youtube,
                    link_whats,
                    price_cache,
                    views
                };
                    await api.put("/users/"+recebeUser._id,user);
                    logout();
                    history.push("/");
                
                
            } catch (erro) {
                console.log("Erro ao Cadastrar!");
            }
        }
   
    const [list, setList] = useState([]);
    useEffect(() => {
        async function loadList() {
            const response = await api.get("/category");
            setList(response.data);
        }
        loadList();
    },list);
    


    return (
        <div class="AlterarPerfil-container">
            <form class="form-profile" onSubmit={alterar}>
                <img id="logo-login" src={Logo}></img>
                <div class="container-form">
                    <label for="email_inline" >Email</label>
                    <input id="email_inline" type="email" class="validate" value={recebeUser.email} ></input>
                    <label for="nome_artistic_inline">Nome Artisitco</label>
                    <input id="nome_artistic_inline" type="text" placeholder={recebeUser.name_artistic} value={name_artistic}  class="validate"  onChange={event => setNome_artistic(event.target.value)}></input>

                    <label for="youtube_inline">Link video YouTube</label>
                    <input id="youtube_inline" type="text" class="validate"  placeholder={recebeUser.link_youtube} value={link_youtube}  onChange={event => setYoutube(event.target.value)}></input>

                    <label for="Whatsapp_inline">Link Whatsapp</label>
                    <input id="Whatsapp_inline" type="text" class="validate"  placeholder={recebeUser.link_whats} value={link_whats} onChange={event => setWhats(event.target.value)}></input>

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
                            <option value={"POP/ROCK"}>POP/ROCK</option>
                            <option value={"POPULAR BRASILEIRA"}>POPULAR/BRASILEIRA</option>
                            <option value={"AXÉ"}>AXE</option>
                            <option value={"FORRO"}>FORRO</option>
                            <option value={"BOSSA NOVA"}>BOSSA NOVA</option>
                            <option value={"RAP"}>RAP</option>
                            <option value={"HIPHOP"}>HIPHOP</option>
                            <option value={"REAGGE"}>REAGGE</option>
                            <option value={"ELETRONICA"}>ELETRÔNICA</option>
                            <option value={"OUTROS"}>OUTROS</option>
                    </select>
                    <div class="cadastro-container-buttons">
                        <button id="btn-cadastrar" class="btn waves-effect waves-light" type="submit" name="action">Alterar
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