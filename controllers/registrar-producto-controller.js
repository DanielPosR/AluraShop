import { productosServicios } from "../services/productos-servicios.js";

/**VALIDACION DE FORMULARIO */

const formulario = document.querySelector("#formulario");
const inputNombre = document.querySelector('#nombre');
const inputPrecio = document.querySelector('#precio');
const inputURLImagen = document.querySelector('#imagen');
const inputCategoria = document.querySelector('#categoria');
const descripcion = document.querySelector('#descripcion');

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

    if (!localStorage.getItem('autenticado')) {
        window.location.href = '/AluraShop/index.html';
    }

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
    const parrafo = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget nibh vitae mi pellentesque viverra. Sed posuere orci ut pretium molestie. Integer lacinia enim vitae eros posuere ultricies. Pellentesque in risus accumsan neque ullamcorper tempus non pulvinar augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec auctor ligula vitae nisl laoreet cursus. Aliquam erat volutpat. Ut vestibulum mauris ullamcorper augue sodales, ut tempus neque placerat. Donec nec egestas justo, quis semper diam. Sed efficitur aliquam leo, sagittis gravida nisl tincidunt ut. Phasellus justo justo, feugiat a fringilla id, sollicitudin a arcu. In hac habitasse platea dictumst.'
    if (descripcion.value === '') {
        descripcion.value = parrafo;
    }

    //Añade el link por default a los nuevos productos
    const link = "./vista-producto.html";

    mostrarMensaje("Producto registrado correctamente. Redireccionando..", 'succes');

    setTimeout(() => {
        productosServicios.crearProducto(inputNombre.value, inputPrecio.value, inputURLImagen.value, inputCategoria.value, descripcion.value, link)
            .then(respuesta => {

                formulario.reset();
                window.location.href = "/AluraShop/productos.html";

            })
            .catch(error => console.log(error))
    }, 3000);

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