  
import React from 'react';
import { BrowserRouter, Router, Switch} from 'react-router-dom';
import  Menu from '../pages/Menu/menu';
import Login from '../pages/Login/index';
import Route from './Route';
import Cadastro from '../pages/Cadastro/index';
import Perfil from '../pages/Perfil/index';
import Categorias from '../pages/PerfisUsuarios/index';
import AlterarPerfil from '../pages/AlterarPerfil/index';
import PerfilContrato from  '../pages/PerfilContrato/index';
import RecuperarAcesso from '../pages/RecuperarAcesso/index';


export default function Routes() {
   
    return (
        <BrowserRouter>
        <Switch>
           <Route  path="/login" component={Login} />
           <Route path="/cadastro" component={Cadastro}/>
           <Route path="/alterarperfil" component={AlterarPerfil}/>
           <Route path="/perfilContrato" component={PerfilContrato}/>
           <Route path="/recuperarAcesso" component={RecuperarAcesso}/>
           <> 
             <Menu/>
             <Perfil/>
             <Categorias/>
           </>
           <>
            </>
        </Switch>
     </BrowserRouter>

    );
}