'use strict'
import { DatosDeUsuario } from './datosUsuario.js';

export function Registro() {
    let datos = new DatosDeUsuario();
    // Variables globales registro
    const btnRegistro = document.getElementById("btnRegistro");
    const nombreRegistro = document.getElementById("exampleInputNombre1");
    const documentoRegistro = document.getElementById("exampleInputDocumento1");
    const contraseñaRegistro = document.getElementById("exampleInputPassword1");
    const rolRegistro = document.getElementById("select-registro");
    const materiaRegistro = document.getElementById("exampleInputMateria1");

    // Funciones 
    let guardarRegistroUsuario = function () {
        let datosNuevoUsuario = {
            "nombre": nombreRegistro.value,
            "usuario": documentoRegistro.value,
            "contraseña": contraseñaRegistro.value,
            "rol": rolRegistro.value,
            "materia": materiaRegistro.value
        }
        nombreRegistro.value = "";
        documentoRegistro.value = "";
        contraseñaRegistro.value = "";
        rolRegistro.value = "";
        materiaRegistro.value = "";
        datos.guardarNuevoUsuario(datosNuevoUsuario);
    }

    // Eventos
    btnRegistro.addEventListener('click', guardarRegistroUsuario);
}
