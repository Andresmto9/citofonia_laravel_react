import React, { useState, useEffect } from 'react';
import {createRoot} from 'react-dom/client';

const UsuarioTable = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/api/info_usuarios/all', {
            method: 'get',
            headers: { Authorization: `Bearer ${Cookies.get('cookie_token')}` }
        })
            .then(response => response.json())
            .then(data => {
                if (data.estado === "OK") {
                    setUsuarios(data.data);
                } else {
                    setError("Error al cargar los datos.");
                }
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setError("Hubo un error en la petición.");
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Cargando usuarios...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className='flex min-h-screen items-center justify-center bg-gray-100'>
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                <div className='grid grid-cols-12'>
                    <div className="col-end-12 col-span-4 md:col-end-13 md:col-span-2 mb-2">
                        <button className="flex px-3 py-2 bg-blue-400 mr-1 text-white font-semibold rounded" id="btnCreaUsua" onClick={showFormUsuario}>
                            <span className="ml-1">Crear usuario</span>
                        </button>
                        <button className="flex px-3 py-2 bg-red-400 mr-1 text-white font-semibold rounded hidden" id="btnVolverUsua" onClick={showTableUsuario}>
                            <span className="ml-1">Volver</span>
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto relative shadow-md sm:rounded-lg" id="contTableUsua">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="py-3 px-6 text-center">ID</th>
                                <th scope="col" className="py-3 px-6 text-center">Nombre</th>
                                <th scope="col" className="py-3 px-6 text-center">Correo</th>
                                <th scope="col" className="py-3 px-6 text-center">Estado</th>
                                <th scope="col" className="py-3 px-6 text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map((usuario) => (
                                <tr key={usuario.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <td className="py-4 px-6 text-center">{usuario.id}</td>
                                    <td className="py-4 px-6 text-center">{usuario.name}</td>
                                    <td className="py-4 px-6 text-center">{usuario.email}</td>
                                    <td className="py-4 px-6 text-center">{usuario.estado}</td>
                                    <td className="py-4 px-6 text-center">
                                        <button title="Editar" onClick={getInfoUsuarios} data-id={usuario.id} className="m-1 rounded-md bg-blue-500 p-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 w-4 h-4">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                            </svg>
                                        </button>
                                        <button title="Borrar" onClick={borrarUsuarios} data-id={usuario.id} className="m-1 rounded-md bg-red-500 p-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow-lg focus:bg-red-700 focus:shadow-none active:bg-red-700 hover:bg-red-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 w-4 h-4">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="overflow-x-auto relative shadow-md sm:rounded-lg hidden" id="contFormUsua">
                    <div className="p-8 w-full">
                        <h1 className="text-2xl font-semibold mb-4">Registrar usuario</h1>
                        <form method="post" onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-600">Nombre del usuario</label>
                                <input type="text" id="name" name="name" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"/>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-600">Correo del usuario</label>
                                <input type="text" id="email" name="email" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"/>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-600">Rol del usuario</label>
                                <select name="rol" id="rol" className="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
                                    <option value="" selected>Seleccione un rol</option>
                                    <option value="2">Empleado</option>
                                    <option value="3">Residente</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-600">Constraseña</label>
                                <input type="password" id="password" name="password" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"/>
                            </div>
                            <div className="mb-4">
                                <button type="submit" id="btnRegiUsua" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Registrar</button>
                                <button type="button" id="btnActuUsua" onClick={actualizarUsuarios} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full hidden">Actualizar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Funcionalidad sencilla para mostrar el formulario y esconder la tabla de usuario
const showFormUsuario = () => {
    $("#name").val("");
    $("#email").val("");
    $("#rol").val("");
    $("#password").val("");

    $("#btnActuUsua").addClass('hidden');
    $("#btnRegiUsua").removeClass('hidden');

    $("#btnCreaUsua").addClass('hidden');
    $("#btnVolverUsua").removeClass('hidden');

    $("#contTableUsua").addClass('hidden');
    $("#contFormUsua").removeClass('hidden');
}

// Funcionalidad sencilla para mostrar la tabla de usuario y esconder el formulario
const showTableUsuario = () => {
    $("#btnVolverUsua").addClass('hidden');
    $("#btnCreaUsua").removeClass('hidden');

    $("#contFormUsua").addClass('hidden');
    $("#contTableUsua").removeClass('hidden');
}

/**
* Funcionalidad para borrar el usuario seleccionado en la tabla
*/
const borrarUsuarios = (event) => {
    let usuaID = event.currentTarget.dataset.id;

    fetch(`/api/borrar_usuarios/${usuaID}`, {
        method: 'get',
        headers: { Authorization: `Bearer ${Cookies.get('cookie_token')}` }
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.estado == false){
            Swal.fire({
                title: "¡UN MOMENTO!",
                text: data.errors[0],
                icon: "error",
                confirmButtonText: `
                    OK
                `,
            });
        }else{
            Swal.fire({
                title: "¡PERFECTO!",
                text: data.mensaje,
                icon: "success",
                confirmButtonText: `
                    OK
                `,
            }).then((result) => {
                if (result.isConfirmed) {
                    $("#btnVolverUsua").addClass('hidden');
                    $("#btnCreaUsua").removeClass('hidden');

                    $("#contFormUsua").addClass('hidden');
                    $("#contTableUsua").removeClass('hidden');
                }
            });
        }
    })
    .catch((error) => console.log(error));
}

/**
* Funcionalidad para borrar el usuario seleccionado en la tabla
*/
const getInfoUsuarios = (event) => {
    let usuaID = event.currentTarget.dataset.id;

    fetch(`/api/info_usuarios/${usuaID}`, {
        method: 'get',
        headers: { Authorization: `Bearer ${Cookies.get('cookie_token')}` }
    })
    .then((response) => response.json())
    .then((data) => {
        $("#name").val(data.data[0].name);
        $("#email").val(data.data[0].email);
        $("#rol").val(data.data[0].rol_id);
        $("#password").val("");

        $("#btnActuUsua").attr("data-id", data.data[0].id)

        $("#btnRegiUsua").addClass('hidden');
        $("#btnActuUsua").removeClass('hidden');

        $("#btnCreaUsua").addClass('hidden');
        $("#btnVolverUsua").removeClass('hidden');

        $("#contTableUsua").addClass('hidden');
        $("#contFormUsua").removeClass('hidden');
    })
    .catch((error) => console.log(error));
}

/**
 * Funcionalidad para enviar la soliciutd que actualiza la información del usuario
 */
const actualizarUsuarios = (event) => {
    let usuaID = event.currentTarget.dataset.id;

    const form = {
        'id' : usuaID,
        'name' : $("#name").val(),
        'email' : $("#email").val(),
        'rol' : $("#rol").val(),
        'password' : $("#password").val(),
    };

    const formData = new FormData();

    for ( var key in form ) {
        formData.append(key, form[key]);
    }

    // const formData = new FormData(form);

    // Realiza la petición para la creación de usuarios
    fetch('/api/actualizar_usuarios', {
            method: 'post',
            body: formData,
            headers: { Authorization: `Bearer ${Cookies.get('cookie_token')}` }
        })
        .then((response) => response.json())
        .then((data) => {
            if(data.estado == false){
                Swal.fire({
                    title: "¡UN MOMENTO!",
                    text: data.errors[0],
                    icon: "error",
                    confirmButtonText: `
                        OK
                    `,
                });
            }else{
                Swal.fire({
                    title: "¡PERFECTO!",
                    text: data.mensaje,
                    icon: "success",
                    confirmButtonText: `
                        OK
                    `,
                }).then((result) => {
                    if (result.isConfirmed) {
                        $("#btnVolverUsua").addClass('hidden');
                        $("#btnCreaUsua").removeClass('hidden');

                        $("#contFormUsua").addClass('hidden');
                        $("#contTableUsua").removeClass('hidden');
                    }
                });
            }
        })
        .catch((error) => console.log(error));
}

/**
 * Funcionalidad para realizar el envio de datos para el login y genereción del token usado en el sistema
 *
 * @param {event} e Recibe por parametro el evento del login
 */
function handleSubmit(e) {
    e.preventDefault();

    // Declaración del formulario usado en el registro de usuario, dando como formato FormData
    const form = e.target;
    const formData = new FormData(form);

    // Da formato JSON al formulario del login
    const formJson = Object.fromEntries(formData.entries());

    // Realiza la petición para la creación de usuarios
    fetch('/api/crear_usuarios', {
            method: form.method,
            body: formData,
            headers: { Authorization: `Bearer ${Cookies.get('cookie_token')}` }
        })
        .then((response) => response.json())
        .then((data) => {
            if(data.estado == false){
                Swal.fire({
                    title: "¡UN MOMENTO!",
                    text: data.errors[0],
                    icon: "error",
                    confirmButtonText: `
                        OK
                    `,
                });
            }else{
                Swal.fire({
                    title: "¡PERFECTO!",
                    text: data.mensaje,
                    icon: "success",
                    confirmButtonText: `
                        OK
                    `,
                }).then((result) => {
                    if (result.isConfirmed) {
                        $("#btnVolverUsua").addClass('hidden');
                        $("#btnCreaUsua").removeClass('hidden');

                        $("#contFormUsua").addClass('hidden');
                        $("#contTableUsua").removeClass('hidden');
                    }
                });
            }
        })
        .catch((error) => console.log(error));

}

// Validata la existencia del contenido usado para la administración de usuarios
if(document.getElementById('contentTablaUsuarios')){
    createRoot(document.getElementById('contentTablaUsuarios')).render(<UsuarioTable/>)
}
