import { productosServicios } from "../services/productos-servicios.js";

const contenedorProductos = document.querySelector('.productos');
const sesionIniciada = localStorage.getItem('autenticado');


function mostrarTodo(id, nombre, precio, imagen, categoria, link) {

    const div = document.createElement('div');
    div.classList.add('producto');

    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'Eliminar';

    if (sesionIniciada) {
        btnEliminar.classList.add('eliminar');
    } else {
        btnEliminar.classList.add('esconder');
    }

    btnEliminar.onclick = () => {
        productosServicios.eliminarProducto(id);
    }

    div.innerHTML = `
        <img src="${imagen}" alt="producto star wars" class="producto_img">
        
        
        <p class="producto_nombre">${nombre}</p>
        <p class="producto_precio">$${precio}</p>
        <a href="${link}?id=${id}" class="producto_enlace" data-verproducto>Ver producto</a>
    `;

    div.appendChild(btnEliminar);

    return div;
}


productosServicios.listaProductos()
    .then(resultado => {
        resultado.forEach(({ id, nombre, precio, imagen, categoria, link }) => {
            const verTodo = mostrarTodo(id, nombre, precio, imagen, categoria, link);
            contenedorProductos.appendChild(verTodo);
        });
    })
    .catch(error => console.log(error));


/****BUSCADOR */


const campoBuscador = document.querySelector('#buscador');
const btnBuscar = document.querySelector('#buscar');
const mostrarResultado = document.querySelector('#resultado-busqueda');

const btnLogin = document.querySelector('#btn-login');

document.addEventListener('DOMContentLoaded', () => {

    const anchoDePantalla = window.innerWidth;

    if (anchoDePantalla < 768) {
        campoBuscador.classList.add('no-visible');
    }

    btnBuscar.addEventListener('click', () => {

        console.log(anchoDePantalla);

        if (anchoDePantalla < 768) {

            mostrarCampo();
        }
        buscarProducto();
    });
})



async function buscarProducto() {

    limpiarHTML();

    let productos = [];
    const texto = campoBuscador.value.toLowerCase();

    if (texto != '') {

        try {
            await productosServicios.listaProductos()
                .then(respuesta => {
                    respuesta.forEach(producto => {
                        productos.push(producto);
                    });
                })

            for (let producto of productos) {
                let nombre = producto.nombre.toLowerCase();

                if (nombre.indexOf(texto) !== -1) {
                    const { id, nombre, precio, imagen, link } = producto;

                    const resultado = mostrarResultadoBusqueda(id, nombre, precio, imagen, link);

                    mostrarResultado.appendChild(resultado);
                }

            }
        } catch (error) {
            console.log(error)
        }

    }


}




function mostrarResultadoBusqueda(id, nombre, precio, imagen, link) {

    const div = document.createElement('div');
    div.classList.add('producto');

    const contenido = `
    <div>

        <img src="${imagen}">
        <p class="producto_nombre">${nombre}</p>
        <p class="producto_precio">$${precio}</p>

        <a href="${link}?id=${id}" type="button" class="producto_enlace" data-verproducto>Ver producto</a>
  
    </div>
    `;

    div.innerHTML = contenido;

    return div;
}


function limpiarHTML() {

    if (mostrarResultado.firstChild) {
        mostrarResultado.removeChild(mostrarResultado.firstChild);
    }
}


function mostrarCampo() {
    const campoNoVisible = document.querySelector('.no-visible');

    campoBuscador.classList.toggle('no-visible');
    btnLogin.classList.toggle('no-visible');

}


