import '../../materialize/css/materialize.css'
import '../Perfil/style.css';
import perfil from '../../images/perfil.jpg';
import api from '../../services/api';
import React, { useState,useEffect} from 'react';
import { TOKEN_KEY } from '../../services/auth';
import { Link } from 'react-router-dom';
import icon_alert from '../../images/alert.png';
import { confirmAlert } from 'react-confirm-alert';
import icon_Admin from '../../images/admin.png';
import icon_delete from '../../images/deletar.png';
import { logout } from '../../services/auth';

export default function Perfil() {
    const USER = "@NOVAMUSIC:user";
    const [userLocal,setUserLocal]=useState([]);
    let x="";
  useEffect(()=>{
    async function loadList() {
        let recebeUser=JSON.parse(localStorage.getItem(USER));
        setUserLocal(recebeUser);
    }
    loadList();
},[]);
async function deletar(user_id) {
   
    try {
       await confirmAlert({
        title: <img class="alert-icon" src={icon_alert}></img>,
        message: 'Você realmente deseja deletar o perfil do artista?',
        buttons: [
          {
            label: 'Sim',
            onClick: () => api.delete("/users/"+user_id)+logout()+document.location.reload(true)
          },
          {
            label: 'Não'
          }
        ]
      })
     
    } catch (erro) {
      confirmAlert({
        title: 'Atenção!',
        message: 'Erro ao deletar!',
        buttons: [
          {
            label: 'ok'
           
          }
        ]
      })
    }
  }
    if( JSON.parse(localStorage.getItem(USER)==null)){
        return(<></>);
    }else if(JSON.parse(localStorage.getItem(TOKEN_KEY)!=null)){
        if(userLocal.link_youtube!=null){
             x=userLocal.link_youtube.substring(32);
        }
    if(userLocal.isAdmin===false){
        return (
        
        <div> 
            <div class="Perfil-container-perfil-user">
                <ul class="Perfil-dados">
                <img src={"https://img.youtube.com/vi/"+x+"/hqdefault.jpg"} alt="" class="circle"></img>
                    <li><a class="Perfil-dados-user">{userLocal.name_artistic}</a></li>
                    <li><a class="Perfil-dados-user">{userLocal.style_music}</a></li>
                        <li>
                        <Link to={"/alterarperfil/"+userLocal._id}>
                            <a id="alterarperfil" class="Perfil-dados-user">ALTERAR</a>
                        </Link>    
                        </li>
                        <li>
                        <Link to={"/recuperarAcesso/"}>
                            <a id="alterarperfil" class="Perfil-dados-user">MODIFICAR SENHA</a>
                        </Link>    
                        </li>
                        <li>
                            <a id="alterarperfil" class="Perfil-dados-user" onClick={event=>deletar(userLocal._id)}>EXCLUIR CONTA</a>
                        </li>         
                </ul>
            </div>
        </div>
    );
        }else {
            return(
                <div class="Perfil-container-perfil-user">
                <ul class="Perfil-dados">
                <img src={icon_Admin} alt="" class="circle"></img>
                    <li><a class="Perfil-dados-user">ADMIN</a></li>
      
                </ul>
            </div>
            );
        }
    }
}

