export class DatosDeUsuario {
    constructor(usuario, nombre, contrasena, rol, materia, activo, listarProfesores = []) {
        this.usuario = usuario;
        this.nombre = nombre;
        this.contrasena = contrasena;
        this.rol = rol;
        this.materia = materia;
        this.activo = activo;
        this.listarProfesores = listarProfesores;
    }

    guardarNuevoUsuario(nuevoUsuario) {
        let localStorageKeyName = "usuarios";
        let usuarios = [];
        let dataInLocalStorage = localStorage.getItem(localStorageKeyName);
        if (dataInLocalStorage !== null) {
            usuarios = JSON.parse(dataInLocalStorage);
        }
        usuarios.push(nuevoUsuario)
        localStorage.setItem(localStorageKeyName, JSON.stringify(usuarios));
    }

    traerUsuarioRegistrado(usuario) {
        let usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios"));
        console.log(usuariosRegistrados);

        usuariosRegistrados.filter((x) => {
            console.log(x.nombre);
            this.listarProfesores.push(x);
            console.log(this.listarProfesores);
            if (x.usuario === usuario) {
                console.log('usuario: ', x);
                this.usuario = x.usuario;
                this.materia = x.materia;
                this.nombre = x.nombre;
                this.rol = x.rol;
                this.contrasena = x.contraseña;
            } else {
                console.log('No existe el usuario');
            }
        });
    }

}