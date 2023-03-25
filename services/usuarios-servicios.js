const url = "https://danielposr.github.io/Alura-Geek/data/db.json";


async function listaUsuarios() {

    return await fetch(url[1])
        .then(respuesta => respuesta.json());
}

async function crearCliente(correo, password) {

    return await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            correo,
            password
        })
    })
}


export const usuariosServices = {
    listaUsuarios,
    crearCliente
}