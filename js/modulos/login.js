'use strict'
import { DatosDeUsuario } from "./datosUsuario.js";
import { Dashboard } from "./dashboard.js";
export function Login(){
    // Variables globales login
    const btnLogin = document.getElementById("btnLogin");
    const msgErrorLogin = document.getElementById("errorCamposVacios");
    const documentoLogin = document.getElementById("documentoLogueo");
    const contrasenaLogin = document.getElementById("contrasenaLogueo");
    const containerPage = document.getElementById("main-container");
    let respuestaLogin = {};
    let cuenta = 0;
    let datosDocument = new DatosDeUsuario();

    // Funciones
    // Login
    let traerInformacionInicioSesion = function () {
        console.log(documentoLogin.value, ' - ', contrasenaLogin.value)
        if (documentoLogin.value !== "" || contrasenaLogin.value !== "") {
            datosDocument.traerUsuarioRegistrado(documentoLogin.value);
            setTimeout(() => {
                redireccionarAlDashboard(contrasenaLogin.value);
            }, 300)
        } else {
            console.log("Vacio")
            msgErrorLogin.classList.add('errorActive');
        }
    }

    // Funcion Inicial del login

    async function redireccionarAlDashboard(contrasena) {
        respuestaLogin = datosDocument.contrasena;
        cuenta = new DatosDeUsuario(datosDocument.usuario, datosDocument.nombre, datosDocument.contrasena, datosDocument.rol, datosDocument.materia, true);
        console.log(cuenta);
        let redireccion = new Promise((resolve, reject) => {
            if (respuestaLogin === contrasena) {
                let tag = "dashboard";
                resolve(tag);
            } else {
                let mensajeError = "La contraseña está errada."
                reject(mensajeError);
            }
        })
        redireccion.then((tag) => {
            datosDocument.activo = true;
            cambioAlDashboard(tag);
        })
        redireccion.catch((mensajeError) => {
            msgErrorLogin.classList.add("errorActive");
            console.log(mensajeError);
        })

    }

    let cambioAlDashboard = function(tag){
        let xhr = new XMLHttpRequest();
        xhr.onload = function(){
            cargarPagina(this, tag)
        }
        xhr.open('GET', '../../pages/dashboard.html', true);
        xhr.send();
    }

    let cargarPagina = function(data, tag) {
        containerPage.innerHTML = data.responseText;
        if(tag === "dashboard"){
            Dashboard(cuenta);
        }
    }

    let cargaInicial = function () {
        console.log('Controlador del login')
    }
    document.addEventListener('DOMContentLoaded', cargaInicial)
    btnLogin.addEventListener('click', traerInformacionInicioSesion);
}
