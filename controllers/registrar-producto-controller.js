import { productosServicios } from "../services/productos-servicios.js";

/**VALIDACION DE FORMULARIO */

const formulario = document.querySelector("#formulario");
const inputNombre = document.querySelector('#nombre');
const inputPrecio = document.querySelector('#precio');
const inputURLImagen = document.querySelector('#imagen');
const inputCategoria = document.querySelector('#categoria');

const btnRegistarProducto = document.querySelector('#registrar-producto-btn');


iniciarApp();
function iniciarApp() {

    btnRegistarProducto.classList.add('btn-desactivado');
    btnRegistarProducto.disabled = true;

    inputNombre.addEventListener('blur', validarForm);
    inputPrecio.addEventListener('blur', validarForm);
    inputURLImagen.addEventListener('blur', validarForm);
    inputCategoria.addEventListener('blur', validarForm);

    formulario.addEventListener('submit', registrarProducto);

}


function validarForm(e) {
    e.preventDefault();

    if (e.target.value === '') {

        mostrarMensaje(`El campo ${e.target.id} no puede estar vacío`, 'error');
        e.target.classList.add('campo-error');

    } else {
        e.target.classList.remove('campo-error');
    }

    if (inputNombre.value != '' && inputPrecio.value != '' && inputURLImagen.value != '' && inputCategoria.value != '') {
        btnRegistarProducto.classList.remove('btn-desactivado');
        btnRegistarProducto.disabled = false;
    }

}

function registrarProducto(e) {
    e.preventDefault();

    //Añade el link por default a los nuevos productos
    const link = "./vista-producto.html";
    const numeroAleatorio = Math.floor(Math.random() * 18)
    inputURLImagen.value = `./img/productos/producto-${numeroAleatorio}.png`;
    mostrarMensaje("Producto registrado correctamente. Redireccionando..", 'succes');

    setTimeout(() => {
        productosServicios.crearProducto(inputNombre.value, inputPrecio.value, inputURLImagen.value, inputCategoria.value, link)
            .then(respuesta => {

                formulario.reset();
                window.location.href = "/AluraShop/productos.html";

            })
            .catch(error => console.log(error))
    }, 3000);

}


const file = document.querySelector('#subir-img');
file.addEventListener('change', mostrar);
let archivo;

function mostrar() {

    const tamañoMaximo = 100000;

    if (this.files.length <= 0) return;

    archivo = this.files[0];

    if (archivo.size < tamañoMaximo) {

        var archivoImg = document.getElementById("subir-img").files[0];
        var reader = new FileReader();
        if (file) {
            reader.readAsDataURL(archivoImg);
            reader.onloadend = function () {
                document.getElementById("img").src = reader.result;
            }
        }
        inputURLImagen.value = `./img/productos/${archivo.name}`;

        return;
    }
    else {
        const maximoMB = tamañoMaximo / 1000;
        alert(`La imagen excede el tamaño permitido que es de ${maximoMB}Kbytes`);
    }
    return archivo;
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