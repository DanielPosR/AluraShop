const url = "https://6420737f25cb65721049b71a.mockapi.io/api/alura-geek/productos";
//GET
async function listaProductos() {

    return await fetch(url)
        .then(respuesta => respuesta.json());
        
}

async function crearProducto(nombre, precio, imagen, categoria, descripcion, link) {


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
            descripcion,
            link
        })
    })
}

async function eliminarProducto(id) {
    const urlEliminar = `${url}/${id}`;

    const confirmar = confirm('¿Deseas eliminar este producto?');

    if (confirmar) {
        await fetch(urlEliminar, {
            method: "DELETE",
        })
    }

    window.location.reload()
}


export const productosServicios = {
    listaProductos,
    crearProducto,
    eliminarProducto
}