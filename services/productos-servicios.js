
const url = 'https://apimocha.com/api-alurageek/productos';
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