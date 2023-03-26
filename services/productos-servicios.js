const url = "https://6420737f25cb65721049b71a.mockapi.io/api/alura-geek/productos";
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