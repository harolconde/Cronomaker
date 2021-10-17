import { StartPage } from "./startpage.js";
export function TerminosYcondiciones(){
    let myModal = new bootstrap.Modal(document.getElementById('modalTerminosYcondiciones'))
    let closeModal = document.getElementById('btn-close');
    const containerPage = document.getElementById('main-container');
    const btnCloseModal = document.getElementById('btn-cerrar-modal');
    const btnVolverAlHome = document.getElementById('btn-volver-home');

    myModal.show();

    // Funciones
    let cerrarModal = function(){
        console.log("Terminos cerrados");
        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
            cargarPagina(this, "startpage");
        }
        xhr.open('GET', '../pages/startpage.html', true);
        xhr.send();
    }

    let cargarPagina = function (data, tag) {
        containerPage.innerHTML = data.responseText;
        switch (tag) {
            case "startpage":
                StartPage();
                break;
            default:
                return;
        }
    }

    // Eventos
    closeModal.addEventListener('click', cerrarModal);
    btnCloseModal.addEventListener('click', cerrarModal);
    btnVolverAlHome.addEventListener('click', cerrarModal);
    //modal.addEventListener('click', cerrarModal);
}