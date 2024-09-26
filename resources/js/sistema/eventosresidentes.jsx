// Se realiza la importación de las dependencias para REACT
import React, { useState, useEffect } from 'react';
import {createRoot} from 'react-dom/client';


/**
 * Funcionalidad para renderizar el componenete usado para la creación de eventos por parte del residente
 */
export default function RenderEventosResidentes(){
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /** Realiza el consumo de los eventos creado por parte del residente **/
    useEffect(() => {
        fetch(`/api/info_eventos/${sessionStorage.getItem("usua_id")}`, {
            method: 'get',
            headers: { Authorization: `Bearer ${Cookies.get('cookie_token')}` }
        })
            .then(response => response.json())
            .then(data => {
                if (data.estado === "OK") {
                    setEventos(data.data);
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
    /*******************************************************************/

    /** Apartado para mostrar un texto de cargue o error mientras se inicializa el componente **/
    if (loading) {
        return <p>Cargando usuarios...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }
    /*******************************************************************/

    /** Renderizado del HTML que se visualizara **/
    return (
        <>
            <div className='flex min-h-screen items-center justify-center bg-gray-100'>
                <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                    <div className='grid grid-cols-12'>
                        <div className="col-end-12 col-span-4 md:col-end-13 md:col-span-2 mb-2">
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
                                    <th scope="col" className="py-3 px-6 text-center">Celular</th>
                                    <th scope="col" className="py-3 px-6 text-center">Información visita</th>
                                    <th scope="col" className="py-3 px-6 text-center">Descripción</th>
                                    <th scope="col" className="py-3 px-6 text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {eventos.map((evento) => (
                                    <tr key={evento.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td className="py-4 px-6 text-center">{evento.id}</td>
                                        <td className="py-4 px-6 text-center">{evento.nombre}</td>
                                        <td className="py-4 px-6 text-center">{evento.celular}</td>
                                        <td className="py-4 px-6 text-center">{evento.info_visita}</td>
                                        <td className="py-4 px-6 text-center">{evento.descripcion}</td>
                                        <td className="py-4 px-6 text-center">
                                            <button title="Borrar" onClick={borrarEvento} data-id={evento.id} className="m-1 rounded-md bg-red-500 p-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow-lg focus:bg-red-700 focus:shadow-none active:bg-red-700 hover:bg-red-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
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
                    <div className="overflow-x-auto relative shadow-md sm:rounded-lg hidden" id="contFormEventos">
                        <div className="p-8 w-full">
                            <h1 className="text-2xl font-semibold mb-4">Registrar eventos</h1>
                            <form method="post" onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-600">Nombre del evento</label>
                                    <input type="text" id="nombre" name="nombre" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"/>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-600">Celular de contacto</label>
                                    <input type="number" id="celular" name="celular" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"/>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-600">Información de la visita</label>
                                    <input type="text" id="informacion" name="informacion" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"/>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-600">Descripción</label>
                                    <textarea type="text" id="descripcion" name="descripcion" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"></textarea>
                                </div>
                                <div className="mb-4">
                                    <button type="submit" id="btnRegiEvent" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Registrar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
    /*******************************************************************/
}

// Funcionalidad sencilla para mostrar el formulario y esconder la tabla de eventos
const showFormEventos = () => {
    $("#name").val("");
    $("#email").val("");
    $("#rol").val("");

    $("#btnCreaEvent").addClass('hidden');
    $("#btnVolverEvent").removeClass('hidden');

    $("#contTableEvent").addClass('hidden');
    $("#contFormEventos").removeClass('hidden');
}

// Funcionalidad sencilla para mostrar la tabla de eventos y esconder el formulario
const showTableEventos = () => {
    $("#btnVolverEvent").addClass('hidden');
    $("#btnCreaEvent").removeClass('hidden');

    $("#contFormEventos").addClass('hidden');
    $("#contTableEvent").removeClass('hidden');
}

/**
* Funcionalidad para borrar el evento seleccionado en la tabla
*/
const borrarEvento = (event) => {
    let evenID = event.currentTarget.dataset.id;

    fetch(`/api/borrar_evento/${evenID}`, {
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
 * Funcionalidad para realizar el envio de datos para la creación del evento
 *
 * @param {event} e Recibe por parametro el evento del login
 */
function handleSubmit(e) {
    e.preventDefault();

    // Declaración del formulario usado en los eventos, dando como formato FormData
    const form = e.target;
    const formData = new FormData(form);

    formData.append('usua_id', sessionStorage.getItem("usua_id"));

    // Da formato JSON al formulario del evento
    const formJson = Object.fromEntries(formData.entries());

    // Realiza la petición para la creación del evento
    fetch('/api/crear_eventos', {
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
                        $("#btnVolverEvent").addClass('hidden');
                        $("#btnCreaEvent").removeClass('hidden');

                        $("#contFormEventos").addClass('hidden');
                        $("#contTableEvent").removeClass('hidden');
                    }
                });
            }
        })
        .catch((error) => console.log(error));

}

// Validata la existencia del contenido usado para el los eventos del residente
if(document.getElementById('contentEventosResidentes')){
    createRoot(document.getElementById('contentEventosResidentes')).render(<RenderEventosResidentes/>)
}
