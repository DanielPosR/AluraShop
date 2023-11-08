import { usuariosServices } from "../services/usuarios-servicios.js";

const inputEmail = document.querySelector('#email');
const inputPassword = document.querySelector('#password');

const btnLogin = document.querySelector('#iniciar-sesion');

document.addEventListener('DOMContentLoaded', () => {

    btnLogin.classList.add('btn-desactivado');
    btnLogin.disabled = true;

    inputEmail.addEventListener('blur', validarForm);
    inputPassword.addEventListener('blur', validarForm);

    btnLogin.addEventListener('click', usuarioExiste);
})



async function usuarioExiste() {

    let existeUsuario;
    const spinner = document.querySelector('#spinner');

    await usuariosServices.listaUsuarios()
        .then(respuesta => {
            respuesta.forEach(usuario => {

                if (usuario.correo === inputEmail.value && usuario.password === inputPassword.value) {
                    return existeUsuario = true;
                } else {
                    return;
                }
            });
        })
        .catch(error => console.log(error));

    if (!existeUsuario) {
        mostrarMensaje('Email o contraseña incorrecto, intenta nuevamente', 'error');
    } else {

        mostrarMensaje('Iniciando sesión. Redireccionando..', 'succes');
        spinner.classList.add('spinner');
        usuarioAutenticado(true)
        setTimeout(() => {
            spinner.classList.remove('spinner');
            window.location.href = "/AluraShop/productos.html";
        }, 5000);
    }
}


const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function validarForm(e) {

    if (e.target.type === 'email') {

        if (!er.test(e.target.value)) {
            mostrarMensaje('Formato de email no válido', 'error');
        }
    }

    if (e.target.value === '') {

        mostrarMensaje(`El campo ${e.target.id} no puede estar vacío`, 'error');
        e.target.classList.add('campo-error');

    } else {
        e.target.classList.remove('campo-error');
    }

    if (er.test(email.value) && inputPassword.value != '') {
        btnLogin.classList.remove('btn-desactivado');
        btnLogin.disabled = false;
    }
}





function mostrarMensaje(msj, tipo) {

    const error = document.querySelector('.cont-errores');
    const mensaje = document.createElement('p');

    mensaje.classList.add(tipo);
    mensaje.textContent = msj;

    error.appendChild(mensaje);

    setTimeout(() => {
        mensaje.remove();
    }, 5000);
}


function usuarioAutenticado(booleano) {

    if(booleano === true) {

        localStorage.setItem('autenticado', booleano);
    }
}
