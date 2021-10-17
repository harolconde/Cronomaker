'use strict'

import { Datos } from "./servicios.js";

export function Dashboard(usuario) {
    const containerPage = document.getElementById('main-container');
    const containerDashboard = document.getElementById('container-dashboard');
    const btnInfoSesion = document.getElementById('btnInfoSesion');
    const nombre = document.getElementById('nombre');
    const rol = document.getElementById('rol');
    const materia = document.getElementById('materia');
    const mainDashboard = document.getElementById('main-dashboard');
    const header = document.getElementById('header');
    const footer = document.getElementById('footer');
    let d = new Datos();
    let sesion = usuario.activo;
    let usuarioSesion = usuario;
    let usuarioConsulta = "";
    async function datosDeSesion() {
        let validarSesion = new Promise((resolve, reject) => {
            if (sesion == true) {
                resolve(usuario);
            } else {
                reject();
            }
        })
        validarSesion.then((usuario) => {
            mainDashboard.classList.add('sesion-activa');
            header.classList.add('header-sesion-activa');
            footer.classList.add('footer-sesion-activa');
            nombre.innerText = usuario.nombre;
            materia.innerText = usuario.materia;
            switch (usuario.rol) {
                case "1":
                    rol.innerText = "Administrador";
                    cargarPerfilAdministrador(usuario);
                    break;
                case "2":
                    rol.innerText = "Coordinador";
                    cargarPerfilCoordinador(usuario);
                    break;
                case "3":
                    rol.innerText = "Profesor";
                    cargarPerfilProfesor(usuario);
                    break;
                default:
                    toStartPage();
                    return;
            }
        });
        validarSesion.catch(() => {
            toStartPage();
        });
    }
    datosDeSesion().then(data => {
    }).catch(() => {
        toStartPage();
    });

    // Funcion que carga el perfil del Administrador
    let cargarPerfilAdministrador = function (data) {
        console.log("Aministrador: ", data.rol);
        containerDashboard.innerHTML = /* html */ `
            <div class="container-add-hours">
                <div class="row">
                    <div class="col-xs-12 col-md-12 col-lg-9 col-hous">
                        <div class="mb-3">
                            <label for="exampleSelectTeacher" class="form-label">Selecciona un profesor</label>
                            <select class="form-select" id="c-select-teacher" aria-label="exampleSelectTeacher" required>
                                <option selected>Selecciona</option>
                            </select>
                        </div>
                        <div class="row">
                            <div class="col-4">
                                <div class="mb-3">
                                    <label for="exampleMateria" class="form-label">Materia</label>
                                    <input type="text" class="form-control" id="exampleMateria" aria-describedby="emailHelp" placeholder="Ingresa Materia" disabled required>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="mb-3">
                                    <label for="exampleSelectDia" class="form-label">Seleccionar día</label>
                                    <select class="form-select" id="c-select-dia" aria-label="exampleSelectDia" required>
                                        <option selected>Selecciona</option>
                                        <option value="Lunes">Lunes</option>
                                        <option value="Martes">Martes</option>
                                        <option value="Miercoles">Miercoles</option>
                                        <option value="Jueves">Jueves</option>
                                        <option value="Viernes">Viernes</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="mb-3">
                                    <label for="exampleFecha" class="form-label">Fecha</label>
                                    <input type="date" class="form-control" id="exampleFecha" aria-describedby="emailHelp" placeholder="Ingresa la fecha" required>
                                </div>
                            </div>
                        </div>
                        <div class="container-form row pe-3 ps-3">
                            <div class="col-xs-12 col-sm-12 col-md-12" id="container-form-hours">
                                
                            <div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xs-12 col-md-12 col-lg-3 col-carga">
                <div class="horario">
                    <h1 class="text-end mt-3 color-title-dashboard">Carga el horario para cada profesor</h1>
                    <ul class="list-group list-group-carga" id="list-group-carga">
                        <li class="list-group-item" id="">Registra el horario de los profesores, ya sea un día o la semana completa</li>
                    </ul>
                </div>
            </div>
        </div>
        `;
        let selectTeacher = document.getElementById('c-select-teacher');
        let addHourToDay = document.getElementById('container-form-hours');
        let addMateria = document.getElementById('exampleMateria');
        let addHourCharged = document.getElementById('list-group-carga');
        let teachers = d.getDataTeachers();

        selectTeacher.addEventListener('change', () => {
            d.getTeacher(selectTeacher.value);
            let selected = d.teacher;
            addMateria.value = selected.materia;
            d.getHourTeacher(selectTeacher.value);
            let horario = d.registrados;
            addHourToCharge(horario, addHourCharged);
        })
        addMenuSelector(selectTeacher, 'profesor', teachers);
        addCourseSelector(addHourToDay);
    }

    // Funcion que muestra horarios registrados para el administrador
    let addHourToCharge = function (horario, horarioAcargar) {
        let day = document.getElementById('c-select-dia');
        console.log(horario);
        horario.filter(x => {
            switch (x.dia) {
                case 'Lunes':
                    let lunes = /* html */ `
                            <div class="card">Lunes</div>
                        `;
                    console.log(lunes);
                    horarioAcargar.innerHTML += lunes;
                    break;
                case 'Martes':
                    let martes = /* html */ `
                            <div class="card">Martes</div>
                        `;
                    let dMartes = [];
                    dMartes.push({ "indice": martes });
                    dMartes.slice(2, dMartes.length);
                    console.log(dMartes);
                    if (dMartes.length > 1) {

                        horarioAcargar.innerHTML += dMartes[0].indice;
                    }
                    //console.log(martes[0]);

                    break;
                case 'Miercoles':
                    let miercoles = /* html */ `
                        <div class="card">Miercoles</div>
                    `;
                    let dMiercoles = [];
                    dMiercoles.push({"indice": miercoles});
                    dMiercoles.slice(3, dMiercoles.length);
                    console.log(dMiercoles);
                    if(dMiercoles.length > 1){
                        horarioAcargar.innerHTML += dMiercoles[0].indice;
                    }
                    break;
                case 'Jueves':
                    break;
                case 'Viernes':
                    break;
                default:
                    break;
            }
            if (x.dia === day.value) {
                console.log(x);
            }
        });
    }


    // Funcion que carga el perfil del coordinador 
    let cargarPerfilCoordinador = function (data) {
        console.log("Coordinador: ", data.rol);
        containerDashboard.innerHTML = /* html */ ` 
            <div class="container-week">
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-select-profesor-admon">
                        <div class="mb-3">
                            <select class="form-select" aria-label="Default select example" id="select-teacher-admon">
                                <option selected>Seleccione profesor a revisar horario</option>
                            </select>
                        </div>
                    </div>
                    <div class="col day-week">
                        <ul class="list-group">
                            <li class="list-group-item" id="Lunes"><p class="day fs-5">Lunes</p></li>
                            <li class="list-group-item" id="Martes"><p class="day fs-5">Martes</p></li>
                            <li class="list-group-item" id="Miercoles"><p class="day fs-5">Miercoles</p></li>
                            <li class="list-group-item" id="Jueves"><p class="day fs-5">Jueves</p></li>
                            <li class="list-group-item" id="Viernes"><p class="day fs-5">Viernes</p></li>
                        </ul>
                    </div>
                </div>
                <div class="row">
                    <div class="col col-panel" id="col-panel">
                        <div class="card">
                            <small class="mb-5 mt-5 fs-1 text-center">Selecciona un dia para ver el horario del profesor seleccionado</small>
                        </div>
                    </div>
                </div>
            </div>
        `
        let dias = document.getElementsByClassName('list-group-item');
        let panel = document.getElementById('col-panel');
        let teacherSel = document.getElementById('select-teacher-admon');
        d.getDataTeachers();
        let teachers = d.teachers;
        teachers.filter(x => {
            if (x.rol === '3') {
                let prof = [];
                prof.push(x);
                addMenuSelector(teacherSel, 'coordinador', prof);
            }
        });
        teacherSel.addEventListener('change', () => {
            for (let d of dias) {
                d.classList.remove('menu-active')
            }
            reemplazarContenedorHorario(panel);
        });
        for (let dia of dias) {
            dia.addEventListener('click', () => {
                addContainerDay(dia.id, dias, panel, 'coordinador');
            });
        }
    }

    // Funcion que carga el perfil del profesor
    let cargarPerfilProfesor = function (data) {
        console.log("Profesor: ", data.rol);
        containerDashboard.innerHTML = /* html */ `
            <div class="container-week">
                <div class="row">
                    <div class="col day-week">
                        <ul class="list-group">
                            <li class="list-group-item" id="Lunes"><p class="day fs-5">Lunes</p></li>
                            <li class="list-group-item" id="Martes"><p class="day fs-5">Martes</p></li>
                            <li class="list-group-item" id="Miercoles"><p class="day fs-5">Miercoles</p></li>
                            <li class="list-group-item" id="Jueves"><p class="day fs-5">Jueves</p></li>
                            <li class="list-group-item" id="Viernes"><p class="day fs-5">Viernes</p></li>
                        </ul>
                    </div>
                </div>
                <div class="row">
                    <div class="col col-panel" id="col-panel">
                        <div class="card">
                            <small class="mb-5 mt-5 fs-1 text-center">Selecciona un dia para ver el horario asignado</small>
                        </div>
                    </div>
                </div>
            </div>
        `;
        let dias = document.getElementsByClassName('list-group-item');
        let panel = document.getElementById('col-panel');
        for (let dia of dias) {
            dia.addEventListener('click', () => {
                addContainerDay(dia.id, dias, panel, 'profesor');
            })
        }
    }

    // Funcion que reemplaza el contenido de los horarios
    let reemplazarContenedorHorario = function(container){
        container.innerHTML = /* html */ ` 
            <div class="card">
                <small class="mb-5 mt-5 fs-1 text-center">Selecciona un dia para ver el horario del profesor seleccionado</small>
            </div>
        `
    }

    // Bind informacion
    let addContainerDay = function (dia, dias, panel, tag) {
        let diaSeleccionado = document.getElementById(dia);
        let diasHoras = [];
        for (let d of dias) {
            d.classList.remove('menu-active')
        }
        diaSeleccionado.classList.add('menu-active');
        console.log(usuario.nombre);
        let horario = [];
        d.getHourTeacher(usuario.nombre, tag, dia);
        horario = d.registrados;
        console.log(horario);
        if (horario.length > 0) {
            horario.filter(x => {
                console.log(x.dia);
                if (x.dia === dia) {
                    diasHoras.push(x);
                    panel.innerHTML = /* html */ `
                    <div class="card">
                        <ul class="list-group" id="charge-hours-teachers">
                            
                        </ul>
                    </div>
                `;
                    addHoursToPanelTeacher(diasHoras);
                } else {
                    panel.innerHTML = /* html */ `
                    <div class="card">
                        <ul class="list-group" id="charge-hours-teachers">
                            
                        </ul>
                    </div>
                `;
                    addHoursToPanelTeacher(null);
                }
            });
        } else {
            panel.innerHTML = /* html */ `
                    <div class="card">
                        <ul class="list-group" id="charge-hours-teachers">
                            
                        </ul>
                    </div>
                `;
            addHoursToPanelTeacher(null);
        }
    }

    let addHoursToPanelTeacher = function (horario) {
        let container = document.getElementById('charge-hours-teachers');
        let seleccionado = document.getElementById('select-teacher-admon');
        console.log(horario);
        if (horario !== null) {
            let teachers = d.teachers;
            container.innerHTML = '';
            horario.forEach((x, i) => {
                if (usuario.rol === '2') {
                    if (x.nombreProfesor === seleccionado.value) {
                        return bindHoursTeacher(container, x, i, teachers);
                    } 
                    // else {
                    //     console.log(1)
                    //     console.log('No hay profesores');
                    //     container.innerHTML = /* html */ `
                    //         <div class="card">
                    //             <div class="card-body">
                    //                 <h1 class="card-title">
                    //                     No hay horarios cargados
                    //                 </h1>
                    //             </div>
                    //         </div>
                    //     `;
                    // }
                } else {
                    if (x.nombreProfesor === usuario.nombre) {
                        return bindHoursTeacher(container, x, i, teachers);
                    }
                }
            });
        } else {
            console.log(3)
            container.innerHTML = /* html */ `
                <div class="card">
                    <div class="card-body">
                        <h1 class="card-title">
                            No hay horarios cargados
                        </h1>
                    </div>
                </div>
            `;
        }
    }

    let bindHoursTeacher = function (element, x, i, teachers) {
        element.innerHTML += /* html */ `
                        <li class="list-group-item">
                            <div class="container-hour-teacher d-flex">
                                <div class="container-title-hour ps-3 pe-3 col">
                                    <label for="horaSeleccionada${i}" class="form-label"><strong>HORA:</strong></label>
                                    <br>
                                    <br>
                                    <input type="text" class="form-control horaSeleccionada" id="horaSeleccionada${i}" placeholder="" value="${x.hora}" disabled>
                                </div>
                                <div class="container-title-hour ps-3 pe-3 col">
                                    <label for="cursoSeleccionada${i}" class="form-label"><strong>CURSO:</strong></label>
                                    <br>
                                    <br>
                                    <input type="text" class="form-control cursoSeleccionado" id="cursoSeleccionado${i}" placeholder="" value="${x.curso}" disabled>
                                </div>
                                <div class="container-title-hour ps-3 pe-3 col">
                                    <label for="actividadSeleccionada${i}" class="form-label"><strong>ACTIVIDAD:</strong></label>
                                    <br>
                                    <br>
                                    <textarea type="text" class="form-control actividadSeleccionada" id="actividadSeleccionada${i}" rows="1" disabled>
                                        ${x.actividad}
                                    </textarea>
                                </div>
                                <div class="container-title-hour ps-3 pe-3 col">
                                    <div class="mb-3">
                                        <label for="exampleSelectAusencia" class="form-label"><strong>REPORTAR AUSENCIA</strong></label>
                                        <br>
                                        <br>
                                        <select class="form-select form-ausencia" id="c-select-ausencia${i}" aria-label="exampleSelectAusencia" required>
                                            <option value="${x.ausencia}" selected>${x.ausencia}</option>
                                            <option value="Si">Si</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="container-title-hour ps-3 pe-3 col ${usuarioSesion.rol === "2" ? 'visible-admon' : 'hidden-admon'}">
                                    <div class="mb-3">
                                        <label for="exampleSelectReemplazo" class="form-label"><strong>ASIGNAR DOCENTE</strong></label>
                                        <br>
                                        <br>
                                        <select class="form-select form-reemplazo" id="c-select-Reemplazo${i}" aria-label="exampleSelectReemplazo" required>
                                            <option selected>Seleccione</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="container-title-hour ps-3 pe-3 col">
                                    <div class="mb-3">
                                        <label for="exampleFormControlJustify" class="form-label"><strong>MOTIVO AUSENCIA</strong></label>
                                        <br>
                                        <br>
                                        <textarea class="form-control text-ausencia" id="exampleFormControlJustify${i}" value="${x.ausencia === 'Si' ? x.justificacion : ''}" rows="1" disabled>
                                            ${x.ausencia === 'Si' ? x.justificacion : ''}
                                        </textarea>
                                    </div>
                                </div>
                                <div class="container-title-hour ps-3 pe-3 col">
                                    <br>
                                    <br>
                                    <button class="btn btn-cronomaker rounded-pill btnAusencia mt-2 btn-large" style="width:100%;" id="btn-ausencia${i}" disabled>
                                        ${usuarioSesion.rol === '3' ? 'Asignar ausencia' : 'Reemplazar'}
                                    </button>
                                </div>
                            </div>
                        </li>
                    `;

        let selectAusencia = document.getElementsByClassName('form-ausencia');
        let textAusencia = document.getElementsByClassName('text-ausencia');
        let btnAusencia = document.getElementsByClassName('btnAusencia');
        let horaSeleccionada = document.getElementsByClassName('horaSeleccionada');
        let cursoSeleccionado = document.getElementsByClassName('cursoSeleccionado');
        let actividadSeleccionada = document.getElementsByClassName('actividadSeleccionada');
        let selectReemplazo = document.getElementsByClassName('form-reemplazo');
        let selectAusenciaOption = document.getElementsByClassName('c-select-ausencia' + i);
        let reemplazoProfesor = document.getElementById('c-select-Reemplazo' + i);
        if (usuario.rol === "2") {
            teachers.filter(x => {
                if (x.rol === '3') {
                    let prof = [];
                    prof.push(x);
                    addMenuSelector(reemplazoProfesor, 'coordinador', prof);
                }
            })
        }
        for (let sel = 0; sel < selectAusencia.length; sel++) {
            selectAusencia[sel].addEventListener('change', () => {
                textAusencia[sel].disabled = false;
                btnAusencia[sel].disabled = false;
            })
        }
        for (let rem = 0; rem < selectReemplazo.length; rem++) {
            selectReemplazo[rem].addEventListener('change', () => {
                btnAusencia[rem].disabled = false;
                selectAusenciaOption[rem].disabled = false;
            })
        }
        for(let prem = 0; prem < reemplazoProfesor.length; prem++) {
            reemplazoProfesor[prem].addEventListener('change', () => {
                selectAusenciaOption[prem].disabled = false;
            });
        }
        for (let btn = 0; btn < btnAusencia.length; btn++) {
            btnAusencia[btn].addEventListener('click', () => {
                if (selectAusencia[btn].value !== 'Si') {
                    let profesorReemplazado = {
                        "nombreProfesor": selectReemplazo[btn].value,
                        "materia": x.materia,
                        "dia": x.dia,
                        "hora": horaSeleccionada[btn].value,
                        "curso": cursoSeleccionado[btn].value,
                        "actividad": actividadSeleccionada[btn].value,
                        "ausencia": "No",
                        "justificacion": ""
                    }
                    d.setDataHoursTeacher(profesorReemplazado);
                } else {
                    
                    let horarioModificado = {
                        "nombreProfesor": x.nombreProfesor,
                        "materia": x.materia,
                        "dia": x.dia,
                        "hora": horaSeleccionada[btn].value,
                        "curso": cursoSeleccionado[btn].value,
                        "actividad": actividadSeleccionada[btn].value,
                        "ausencia": selectAusencia[btn].value,
                        "justificacion": textAusencia[btn].value
                    }
                    d.getModifyHourTeacher(horarioModificado);
                }

            })
        }
    }

    // Bind informacion perfil administrador

    let addMenuSelector = function (idTag, tag, elements) {
        for (let item of elements) {
            idTag.innerHTML +=  /* html */ `
                <option value="${item.nombre}">${item.nombre}</option>
            `;
        }
    }

    //Bind hours and
    let addCourseSelector = function (elements) {
        let horas = [
            {id: 1, hora: "06:45 am a 07:00 am"},
            {id: 2, hora: "07:00 am a 07:45 am"},
            {id: 3, hora: "07:50 am a 08:35 am"},
            {id: 4, hora: "08:40 am a 09:25 am"},
            {id: 5, hora: "09:30 am a 10:10 am"},
            {id: 6, hora: "10:55 am a 11:40 am"},
            {id: 7, hora: "11:45 am a 12:40 pm"},
            {id: 8, hora: "12:45 pm a 01:30 pm"}
        ];
        for (let i = 1; i <= horas.length; i++) {
            elements.innerHTML += /* html */
                `
                <form class="form-add-hour" id="horas-registradas-${i}">
                    <div class="row">
                        <div class="col-2 ps-0 pe-0">
                            <div class="mb-3" id="c-select-our">
                                <label class="form-label">Hora</label>
                                <input class="form-control text-center form-input-hour item-form-addHour" type="text" placeholder="Disabled input" value="${horas[i].hora}" aria-label="Disabled input example" id="item-hour-${i}" disabled>
                            </div>
                        </div>
                        <div class="col-3">
                            <div class="mb-3" id="c-select-course">
                                <label for="exampleSelectCourse" class="form-label">Curso</label>
                                <select class="form-select form-select-hour form-select-course item-form-addHour" aria-label="exampleSelectCourse" id="select-course-${i}" required>
                                    <option selected>Selecciona</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-5 ps-0 pe-0">
                            <div class="mb-3">
                                <label for="exampleActividad" class="form-label">Actividad</label>
                                <textarea class="form-control form-text-hour item-form-addHour" id="exampleActividad${i}" rows="3"></textarea>
                            </div>
                        </div>
                        <div class="col-2 pe-0 col-button-registerHour">
                            <div class="mb-3 d-block gap-2">
                                <button type="button" id="btnRegistro${i}" class="btn btn-cronomaker btn-register-hour item-form-addHour rounded-pill ps-4 pe-4">Registrar</button>
                            </div>
                        </div>
                    </div>                        
                </form>
            `;
            let courses = document.getElementById('select-course-' + i);
            let course = document.getElementsByClassName('form-select-course');
            let hour = document.getElementsByClassName('form-input-hour');
            let activity = document.getElementsByClassName('form-text-hour');
            let btnAddHour = document.getElementsByClassName('btn-register-hour');
            addCoursesToHour(courses);
            registerHourToTeacher(hour, course, activity, btnAddHour);

        }
    }

    // Seleccionar horario

    let addCoursesToHour = function (courses) {
        let listCourses = d.getDataCourses();
        for (let course of listCourses) {
            courses.innerHTML += /* html */ `
                <option value="${course.id}">${course.curso} - ${course.nombre}</option>
            `;
        }

    }

    // Registrar horario
    let registerHourToTeacher = function (hours, courses, activities, btns) {
        let teacher = document.getElementById('c-select-teacher');
        let day = document.getElementById('c-select-dia');
        let addMateria = document.getElementById('exampleMateria');
        let horasRegistrar = document.getElementsByClassName('form-add-hour');
        let horario = [];
        let botones = [];
        for (let h = 0; h < hours.length; h++) {
            horario.push({ 'id': h, 'hora': hours[h].value });
        }
        for (let b = 0; b < btns.length; b++) {
            botones.push({ "idBtns": b });
            let registro = { };
            btns[b].addEventListener('click', () => {
                horasRegistrar[b].style.backgroundColor = "#ddd";
                horario.filter(x => {
                    if (x.id == b) {
                        registro = {
                            "nombreProfesor": teacher.value,
                            "materia": addMateria.value,
                            "dia": day.value,
                            "hora": x.hora,
                            "curso": courses[b].value,
                            "actividad": activities[b].value,
                            "ausencia": "No"
                        }
                        d.setDataHoursTeacher(registro);
                    }
                })
            });
        }
    }

    let addHourRegister = function (item) {
        const container = documentGetById('list-group-carga');
        console.log(container);
    }

    // Funcion routing a startpage
    function toStartPage() {
        let url = '../../pages/startpage.html'
        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
            redirectStartPage(this);
        }
        xhr.open('GET', url, true);
        xhr.send();
    }

    // Cargar Start Page
    let redirectStartPage = function (data) {
        containerPage.innerHTML = data.responseText;
    }


    // Cerrar sesion
    let logoutSesion = function () {
        mainDashboard.classList.remove('sesion-activa');
        header.classList.remove('header-sesion-activa');
        footer.classList.remove('footer-sesion-activa');
        sesion = false;
        datosDeSesion();
    }

    btnInfoSesion.addEventListener('click', logoutSesion);
}