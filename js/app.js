'use strict'

// Importaciones
import { DatosDeUsuario } from './modulos/datosUsuario.js';
import { Login } from './modulos/login.js';
import { Registro } from './modulos/registro.js';
import { StartPage } from './modulos/startpage.js';
import { TerminosYcondiciones } from './modulos/terminosYcondiciones.js'

// Variables constantes
const btnCambiarRegistro = document.getElementById("btn-register");
const btnCambiarLogin = document.getElementById("btn-login");
const containerPage = document.getElementById("main-container");
const home = document.getElementById("logo-app");
const linkHome = document.getElementById("link-inicio");
const linkAprende = document.getElementById("link-aprende-uso");
const linkAcercade = document.getElementById("link-acerca-de");
const terminosYcondiciones = document.getElementById("terminos-y-condiciones");

// Variables
let sesion = "";
let datosNuevoUsuario = {};
let datos = new DatosDeUsuario();

// Routing (redireccionamiento de paginas de la app)
let startPage = function () {
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        cargarPagina(this, "startpage");
    }
    xhr.open('GET', '../pages/startpage.html', true);
    xhr.send();
}

let cambioPaginaRegistro = function () {
    console.log("Cambio a: registro");
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        cargarPagina(this, "registro");
    }
    xhr.open('GET', "../pages/registro.html", true);
    xhr.send();
}

let cambioPaginaLogin = function () {
    console.log("Cambio a: Login");
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        cargarPagina(this, "login");
    }
    xhr.open('GET', "../pages/login.html", true);
    xhr.send();
}

let cambioPaginaAcercade = function (){
    console.log("Cambio a acerca de");
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        cargarPagina(this, "acercade")
    }
    xhr.open('GET', "../pages/acercade.html", true);
    xhr.send();
}

let cambioPaginaAprendeUsarme = function () {
    console.log("Cambio a aprende a usarme");
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        cargarPagina(this, "aprendeusarme")
    }
    xhr.open('GET', "../pages/aprendeAusarme.html", true);
    xhr.send();
}

let cambioPaginaTerminosYcondiciones = function () {
    console.log("Cambio a Terminos y Condiciones");
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        cargarPagina(this, 'terminosYcondiciones')
    }
    xhr.open('GET', '../pages/terminosYcondiciones.html', true);
    xhr.send();
}

let cargarPagina = function (data, tag) {
    containerPage.innerHTML = data.responseText;
    switch (tag) {
        case "login":
            Login();
            break;
        case "registro":
            Registro();
            break;
        case "acercade":
            break;
        case "aprendeusarme":
            StartPage();
            break;
        case "terminosYcondiciones":
            TerminosYcondiciones();
            break;
        default:
            return;
    }
}

// Eventos
document.addEventListener('DOMContentLoaded', startPage)
home.addEventListener('click', startPage);
linkHome.addEventListener('click', startPage);
linkAcercade.addEventListener('click', cambioPaginaAcercade);
linkAprende.addEventListener('click', cambioPaginaAprendeUsarme);
btnCambiarRegistro.addEventListener("click", cambioPaginaRegistro);
btnCambiarLogin.addEventListener("click", cambioPaginaLogin);
terminosYcondiciones.addEventListener("click", cambioPaginaTerminosYcondiciones);



