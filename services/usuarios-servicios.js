// const url = "https://apimocha.com/api-alurageek/usuarios";


async function listaUsuarios() {

    return await fetch("https://apimocha.com/api-alurageek/usuarios")
        .then(respuesta => respuesta.json());
}

async function crearCliente(correo, password) {

    return await fetch("https://apimocha.com/api-alurageek/usuarios", {
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