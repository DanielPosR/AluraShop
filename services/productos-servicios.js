
const url = /*'http://localhost:3000/productos'*/ "https://danielposr.github.io/Alura-Geek/db.json";
//GET

async function listaProductos() {

    return await fetch(url)
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