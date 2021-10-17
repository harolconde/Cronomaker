export function StartPage(){
    const btnMoreInfo = document.getElementById("btn-more-info");
    const containerPage = document.getElementById("main-container");

    let cambioPaginaAprendeUsarme = function () {
        console.log("Cambio a aprende a usarme");
        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
            cargarPagina(this, "aprendeusarme")
        }
        xhr.open('GET', "../../pages/aprendeAusarme.html", true);
        xhr.send();
    }

    let cargarPagina = function (data, tag) {
        containerPage.innerHTML = data.responseText;
        // switch (tag) {
        //     case "aprendeusarme":
        //         StartPage();
        //         break;
        //     default:
        //         return;
        // }
    }

    btnMoreInfo.addEventListener("click", cambioPaginaAprendeUsarme);
}