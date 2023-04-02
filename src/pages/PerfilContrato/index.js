import '../../materialize/css/materialize.css';
import React, { useState, useEffect, Component } from 'react';
import '../PerfilContrato/style.css';
import api from '../../services/api';
import whats_icon from '../../images/whatsapp.png';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import icon_alert from '../../images/alert.png';
import { useParams } from 'react-router-dom';

export default function PerfilContrato({ history }) {
  const [list, setList] = useState([]);
  const url_atual = window.location.href;
  //const id = url_atual.substring(50);
  const {id}=useParams();
  const [telephone, setCelular] = useState("");
  const [data_show, setData_show] = useState("");
  const [horario_show, setHorario_show] = useState("");
  const [sobre_me, setSobre_me] = useState("");
  const [userLocalAltLocation, setUserLocalAltLocation] = useState("");
  const USER = "@NOVAMUSIC:user";
  const [userLocal, setUserLocal] = useState([]);

  useEffect(() => {
    async function loadList() {
      const response = await api.get("/users/" + id);
      setList(response.data);
    }
    loadList();
  });
  async function updateLocation(event) {
    event.preventDefault();
    try {
      const recebeUser = JSON.parse(localStorage.getItem(USER));
      const user = {
        telephone,
        data_show,
        horario_show
      };
      confirmAlert({
        title: <img class="alert-icon" src={icon_alert}></img>,
        message: 'Você realmente deseja alterar o local?',
        buttons: [
          {
            label: 'Sim',
            onClick: () => api.put("/users/" + recebeUser._id, user),
          },
          {
            label: 'Não'
          }
        ]
      })
    } catch (erro) {

      confirmAlert({
        title: 'Atenção!',
        message: 'Erro ao Cadastrar!',
        buttons: [
          {
            label: 'ok'

          }
        ]
      })
    }
  }
  async function updateSobre(event) {
    event.preventDefault();
    try {
      const recebeUser = JSON.parse(localStorage.getItem(USER));
      const user = {
        sobre_me
      };
      confirmAlert({
        title: <img class="alert-icon" src={icon_alert}></img>,
        message: 'Você realmente deseja salvar?',
        buttons: [
          {
            label: 'Sim',
            onClick: () => api.put("/users/" + recebeUser._id, user),
          },
          {
            label: 'Não'
          }
        ]
      })
      setSobre_me("");
    } catch (erro) {

      confirmAlert({
        title: 'Atenção!',
        message: 'Erro ao Salvar!',
        buttons: [
          {
            label: 'ok'

          }
        ]
      })
    }
  }
  const recebeUser = JSON.parse(localStorage.getItem(USER));
  if ((recebeUser === null) || (recebeUser._id !== id)) {
    return (

      <div class="PerfilContrato_container-perfil">
        {list && list.map(users => (
          <div class="PerfilContrato_data_users">
            <div class="container-video">
              <iframe class="PerfilContrato_data_users_video" src={"https://www.youtube.com/embed/" + users.link_youtube.substring(32) + "?autoplay=1"} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <div class="container-info">
              <label class="PerfilContrato_data_users-stylemusic">{users.style_music}</label>
              <label class="PerfilContrato_data_users-views">views: {users.views}</label>
              <label class="PerfilContrato_data_users-name">{users.name_artistic}</label>
              <label class="PerfilContrato_data_users-price">Cachê:  {users.price_cache}/hora</label>
              <a href={"http://api.whatsapp.com/send?1=pt_BR&phone=55" + users.link_whats + "&text=Ol%C3%A1%20gostaria%20de%20contratar%20o%20seu%20show!%20Vi%20seu%20perfil%20no%20Nova%20Music%20!"}>
                <label class="PerfilContrato_data_users-whats-not-login">
                  <img id="icon-whats" src={whats_icon}></img>
                  Iniciar conversa </label></a>
            </div>
            <div class="PerfilContrato_data_sobre-artista"> 
              <label class="PerfilContrato_data_sobre-artista-label">SOBRE O ARTISTA</label>
              <p class="PerfilContrato_data_sobre-artista-p">{users.sobre_me}</p>
            </div>
            <div>
              <label class="PerfilContrato_label_next_show">Próximo Show do Artista: {users.horario_show} {users.data_show}</label>
              <iframe class="PerfilContrato_data_users_map" id="gmap_canvas" src={"https://maps.google.com/maps?q=Nova%20Andradina%20" + users.telephone + "&t=&z=13&ie=UTF8&iwloc=&output=embed"} frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
            </div>
          </div>
        ))}
      </div>
    );

  } else
    if (recebeUser._id === id) {
      return (

        <div class="PerfilContrato_container-perfil">
          {list && list.map(users => (
            <div class="PerfilContrato_data_users">
              <div class="container-video">
                <iframe class="PerfilContrato_data_users_video" src={"https://www.youtube.com/embed/" + users.link_youtube.substring(32) + "?autoplay=1"} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              </div>
              <div class="container-info">
                <label class="PerfilContrato_data_users-stylemusic">{users.style_music}</label>
                <label class="PerfilContrato_data_users-views">views: {users.views}</label>
                <label class="PerfilContrato_data_users-name">{users.name_artistic}</label>
                <label class="PerfilContrato_data_users-price">Cachê:  {users.price_cache}</label>
                <form class="PerfilContrato_data_users-sobre" onSubmit={updateSobre}>
                 <label id="PerfilContrato_data_sobre-save">Fale um pouco sobre a sua história</label>
                     <textarea id="PerfilContrato_data_sobre-save" value={sobre_me} class="materialize-textarea" data-length="120" onChange={event => setSobre_me(event.target.value)}></textarea>
                 <button id="btn-salvar-sobre" class="btn waves-effect waves-light" type="submit" name="action">Salvar
                 </button>
               </form >
                <a href={"http://api.whatsapp.com/send?1=pt_BR&phone=55" + users.link_whats + "&text=Ol%C3%A1%20gostaria%20de%20contratar%20o%20seu%20show!%20Vi%20seu%20perfil%20no%20Nova%20Music%20!"}>
                  <label class="PerfilContrato_data_users-whats">
                    <img id="icon-whats" src={whats_icon}></img>
                    Iniciar conversa </label>
                </a>
               <form class="PerfilContrato_data_users-contact" onSubmit={updateLocation}>
                  <input id="PerfilContrato_data_users-local" placeholder="Informe local do próximo evento!" onChange={event => setCelular(event.target.value)}></input>
                  <input id="PerfilContrato_data_users-local" placeholder="Informe a data próximo evento!" type="date" onChange={event => setData_show(event.target.value)}></input>
                  <input id="PerfilContrato_data_users-local" placeholder="Informe o Horário do próximo evento!" type="time" onChange={event => setHorario_show(event.target.value)}></input>
                  <button id="btn-salvar-local" class="btn waves-effect waves-light" type="submit" name="action">Salvar
                  </button>
                </form >
                
              </div>
              <div>

                <label class="PerfilContrato_label_next_show">Próximo Show do Artista: {users.horario_show} {users.data_show}</label>
                <iframe class="PerfilContrato_data_users_map" id="gmap_canvas" src={"https://maps.google.com/maps?q=Nova%20Andradina%20" + users.telephone + "&t=&z=13&ie=UTF8&iwloc=&output=embed"} frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
              </div>
            </div>

          ))}
        </div>
      );
    }
}

