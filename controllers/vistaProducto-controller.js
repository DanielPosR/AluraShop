import { productosServicios } from "../services/productos-servicios.js";


const contenedorProducto = document.querySelector('.vista-producto');

const url = new URL(window.location);
const idURL = Number(url.searchParams.get("id"));


function obtenerInfoProducto(nombre, imagen) {

    if (idURL === null) {
        window.location.href = "./index.html";
    }

    const div = document.createElement('div');
    div.classList.add('vista_producto');

    const contenido = `
            <img src="${imagen}" alt="imagen producto" class="vista_producto-img">

            <div class="vista_producto-texto">
                <h2 class="productos_listado-titulo">${nombre}</h2>

                <p class="vista_producto-parrafo">Fusce eget cursus felis. Proin quis urna nunc. Quisque ac sollicitudin sapien. Curabitur dictum quis neque a semper. Nunc sit amet venenatis metus. Suspendisse nibh turpis, venenatis vitae est et, vulputate interdum ipsum. Morbi interdum elit non enim pretium imperdiet. Nunc iaculis porta risus ullamcorper aliquam. Nullam aliquet purus ac ullamcorper cursus. Nullam in eros euismod, semper magna ac, tincidunt nulla. Phasellus eu lectus viverra, rhoncus risus a, iaculis turpis. Integer tortor quam, faucibus a malesuada eget, tempor ac metus.
                </p>
            </div>
        `;


    div.innerHTML = contenido;

    return div;
}



productosServicios.listaProductos()
    .then(async respuesta => {

        for (let i = 0; i < respuesta.length; i++) {

            const id = await respuesta[i].id;
            const imagen = await respuesta[i].imagen;
            const nombre = await respuesta[i].nombre;

            if (Number(id) === idURL) {
                
                const mostrarProducto = obtenerInfoProducto(nombre, imagen);
                contenedorProducto.appendChild(mostrarProducto);

                return;
            }
        }
    })



function similares(id, nombre, imagen, precio, link) {

    const div = document.createElement('div');
    div.classList.add('producto');
    const contenido = `

        <img src="${imagen}" alt="imagen producto" class="producto_img">
        <p class="producto_nombre">${nombre}</p>
        <p class="producto_precio">$${precio}</p>
        <a href="${link}?id=${id}" type="button" class="producto_enlace" data-verproducto>Ver producto</a>

    `;

    div.innerHTML = contenido;

    return div;
}

const contenedorProductos = document.querySelector('.productos');

productosServicios.listaProductos()
    .then(async respuesta => {

        let contador = 0;
        let nuevoArray = [];
        do {
            const max = respuesta.length;
            const aleatorio = Math.floor(Math.random() * max);
            nuevoArray.push(respuesta[aleatorio]);

            contador++;

        } while (contador < 6);

        nuevoArray.forEach(({ id, nombre, imagen, precio, link }) => {

            const productoAleatorio = similares(id, nombre, imagen, precio, link);
            contenedorProductos.appendChild(productoAleatorio);

        })

    })
    .catch(error => console.log(error));

