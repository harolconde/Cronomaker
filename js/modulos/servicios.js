'use strict'
export class Datos{
    constructor(teachers, courses, horarios = [], teacher, horario, registrados = [], modificado, horarioPorDias = []){
        this.teachers = teachers;
        this.teacher = teacher;
        this.courses = courses;
        this.horarios = horarios;
        this.horario = horario;
        this.registrados = registrados;
        this.modificado = modificado;
        this.horarioPorDias = horarioPorDias;
    }

    // Traer lista de todos los usuarios
    getDataTeachers(){
        return this.teachers = JSON.parse(localStorage.getItem('usuarios'));
    }

    // Mostrar informacion 
    getTeacher(data){
        console.log(data);
        let teachers = JSON.parse(localStorage.getItem('usuarios'));
        return teachers.filter(x => {
            if(x.nombre === data){
                this.teacher = x
            }
        })
    }

    // Traer Lista de Cursos
    getDataCourses(){
        return this.courses = [
            {"id": 1, "curso": 1, "nombre": "Primero"},
            {"id": 2, "curso": 2, "nombre": "Segundo"},
            {"id": 3, "curso": 3, "nombre": "Tercero"},
            {"id": 4, "curso": 4, "nombre": "Cuarto"},
            {"id": 5, "curso": 5, "nombre": "Quinto"},
            {"id": 6, "curso": 6, "nombre": "Sexto"},
            {"id": 7, "curso": 7, "nombre": "Septimo"},
            {"id": 8, "curso": 8, "nombre": "Octavo"},
            {"id": 9, "curso": 9, "nombre": "Noveno"},
            {"id": 10, "curso": 10, "nombre": "Décimo"},
            {"id": 11, "curso": 11, "nombre": "Once"},
            {"id": 0, "curso": 0, "nombre": "Hora libre"},
        ];
    }

    // Traer registros de usuario
    getHourTeacher(teacher, tag, dia){
        this.registrados = [];
        let horario = JSON.parse(localStorage.getItem('horarios'));
        return horario.filter(x => {
            if(tag === "coordinador"){
                if(x.dia === dia) {
                    this.registrados.push(x); 
                }
            } else {
                if (x.nombreProfesor === teacher) {
                    if(x.dia === dia) {
                        this.registrados.push(x);
                    }
                }
            }
        });
    }

    // Traer todos los horarios
    getHourTeacherForDay(teacher, day){
        this.horarioPorDias = [];
        let horario = JSON.parse(localStorage.getItem('horarios'));
        return horario.filter(x => {
            if(x.nombreProfesor === teacher){
                if(x.dia === day){
                    this.horarioPorDias.push(x);
                }
            }
        })
    }

    // Registrar ausencia
    getModifyHourTeacher(horario){
        this.modificado = [];
        let localStorageKeyName = "horarios"
        let dataInLocalStorage = localStorage.getItem(localStorageKeyName);
        if(dataInLocalStorage !== null){
            this.modificado = JSON.parse(dataInLocalStorage);
        }
        const horaModificado = this.modificado.find(hora => hora.hora === horario.hora);
        horaModificado.ausencia = horario.ausencia;
        horaModificado.justificacion = horario.justificacion;
        this.modificado.push(horaModificado);
        console.log(this.modificado);
        localStorage.setItem(localStorageKeyName, JSON.stringify(this.modificado));
    }

    // Registrar un nuevo Horario
    setDataHoursTeacher(horario){
        this.horarios = [];
        let localStorageKeyName = "horarios";
        let dataInLocalStorage = localStorage.getItem(localStorageKeyName);
        if(dataInLocalStorage !== null){
            this.horarios = JSON.parse(dataInLocalStorage);
        }
        this.horarios.push(horario);
        localStorage.setItem(localStorageKeyName, JSON.stringify(this.horarios));
        console.log(this.horarios);
    }
}