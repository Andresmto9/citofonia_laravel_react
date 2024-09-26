// Se realiza la importación de las dependencias para REACT
import React from 'react';
import {createRoot} from 'react-dom/client';


/**
 * Funcionalidad para renderizar el componenete usado en el login
 */
export default function RenderEventosResidentes(){
    return (
        <>
            <div className='flex min-h-screen items-center justify-center bg-gray-100'>
                <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                    <div className='grid grid-cols-12'>
                        <div className="col-end-13 col-span-2 mb-2">
                            <button className="flex px-3 py-2 bg-blue-400 mr-1 text-white font-semibold rounded" id="btnCreaEvent" onClick={showFormEventos}>
                                <span className="ml-1">Crear evento</span>
                            </button>
                            <button className="flex px-3 py-2 bg-red-400 mr-1 text-white font-semibold rounded hidden" id="btnVolverEvent" onClick={showTableEventos}>
                                <span className="ml-1">Volver</span>
                            </button>
                        </div>
                    </div>
                    <div className="overflow-x-auto relative shadow-md sm:rounded-lg" id="contTableEvent">
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
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

// Funcionalidad sencilla para mostrar el formulario y esconder la tabla de usuario
const showFormEventos = () => {
    $("#name").val("");
    $("#email").val("");
    $("#rol").val("");

    $("#btnActuUsua").addClass('hidden');
    $("#btnRegiUsua").removeClass('hidden');

    $("#btnCreaUsua").addClass('hidden');
    $("#btnVolverUsua").removeClass('hidden');

    $("#contTableUsua").addClass('hidden');
    $("#contFormUsua").removeClass('hidden');
}

// Funcionalidad sencilla para mostrar la tabla de usuario y esconder el formulario
const showTableEventos = () => {
    $("#btnVolverUsua").addClass('hidden');
    $("#btnCreaUsua").removeClass('hidden');

    $("#contFormUsua").addClass('hidden');
    $("#contTableUsua").removeClass('hidden');
}

/**
 * Funcionalidad para realizar el envio de datos para el login y genereción del token usado en el sistema
 *
 * @param {event} e Recibe por parametro el evento del login
 */
function handleSubmit(e) {
    e.preventDefault();

    // Declaración del formulario usado en el login, dando como formato FormData
    const form = e.target;
    const formData = new FormData(form);

    // Da formato JSON al formulario del login
    const formJson = Object.fromEntries(formData.entries());

    // Realiza la petición para ingresar y generar el token
    fetch('/api/token', { method: form.method, body: formData })
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
                Cookies.set('cookie_token', data.token, { expires: 60 });
                window.location.href = `${data.redirect_url}`;
            }
        })
        .catch((error) => console.log(error));

}

// Validata la existencia del contenido usado para el login
if(document.getElementById('contentEventosResidentes')){
    createRoot(document.getElementById('contentEventosResidentes')).render(<RenderEventosResidentes/>)
}
