const url = "https://6420737f25cb65721049b71a.mockapi.io/api/alura-geek/usuarios";


async function listaUsuarios() {

    return await fetch(url)
        .then(respuesta => respuesta.json());
}

async function crearCliente(correo, password) {

    return await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            correo: correo,
            password: password
        })
    })
}


export const usuariosServices = {
    listaUsuarios,
    crearCliente
}