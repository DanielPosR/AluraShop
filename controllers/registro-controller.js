import { usuariosServices } from "../services/usuarios-servicios.js";

const formulario = document.querySelector('[data-form]');

const inputEmail = document.querySelector('#email');
const inputPassword = document.querySelector('#password');
const repetirPassword = document.querySelector('#repetir-password');

const btnCrearCuenta = document.querySelector('#crear-cuenta');

document.addEventListener('DOMContentLoaded', () => {

    btnCrearCuenta.classList.add('btn-desactivado');
    btnCrearCuenta.disabled = true;

    inputEmail.addEventListener('blur', validarForm);
    inputPassword.addEventListener('blur', validarForm);
    repetirPassword.addEventListener('blur', validarForm);

    formulario.addEventListener('submit', crearCuenta);
})

async function crearCuenta(e) {
    e.preventDefault();

    let existeCorreo;

    await usuariosServices.listaUsuarios()
        .then(respuesta => {
            respuesta.forEach(({ correo }) => {
                if (correo === inputEmail.value) {
                    return existeCorreo = true;
                }
            });
        })
        .catch(error => console.log(error));

    if (!existeCorreo) {
        if (inputPassword.value === repetirPassword.value) {

            mostrarMensaje('Cuenta creada correctamente. Redireccionando...', 'succes')

            setTimeout(() => {
                usuariosServices.crearCliente(inputEmail.value, inputPassword.value)
                    .then(respuesta => {
                        window.location.href = "/AluraShop/login.html";
                        
                    })

                    .catch(error => console.log(error))
            }, 3000);

        } else {
            mostrarMensaje('Las contraseñas no son iguales', 'error');
        }
    } else {
        mostrarMensaje('Correo ya registrado', 'error');
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

    if (er.test(email.value) && inputPassword.value != '' && repetirPassword.value != '') {
        btnCrearCuenta.classList.remove('btn-desactivado');
        btnCrearCuenta.disabled = false;
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
    }, 3000);
}



