
const url = 'https://danielposr.github.io/Alura-Geek/data/db.json';
//GET

async function listaProductos() {

    await fetch(url)
        .then(respuesta => respuesta.json());
}

async function crearProducto(nombre, precio, imagen, categoria, link) {

    await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombre,
            precio,
            imagen,
            categoria,
            link
        })
    })
}

export const productosServicios = {
    listaProductos,
    crearProducto
}