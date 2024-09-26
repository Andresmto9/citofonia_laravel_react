// Se realiza la importación de las dependencias para REACT
import React, { useState, useEffect } from 'react';
import {createRoot} from 'react-dom/client';


/**
 * Funcionalidad para renderizar el componenete para visualizar los eventos de aprobación para empleados
 */
export default function RenderEventosEmpleados(){
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /** Realiza el consumo de los eventos creado por parte del empleado **/
    useEffect(() => {
        fetch(`/api/eventos_empleados`, {
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
                <div className='grid grid-cols-12 h-full bg-gray-100'>
                    {eventos.map((evento) => (
                        <div className="col-span-12 md:col-span-4 border-2 border-solid rounded border-black p-5 ml-2 mr-2">
                            <div className="max-w-[720px] min-w-[520px] mx-auto">
                                <div className="block mb-4 mx-auto border-b border-slate-300 pb-2 max-w-[360px]">
                                    <p className="block w-full px-4 py-2 text-center text-slate-700 transition-all">
                                       {evento.nombre}.
                                    </p>
                                </div>
                                <div className="relative flex w-full max-w-[26rem] flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-none">
                                    <div className="relative flex items-center gap-4 pt-0 pb-8 mx-0 mt-4 overflow-hidden text-gray-700 bg-transparent shadow-none rounded-xl bg-clip-border">
                                        <div className="flex w-full flex-col gap-0.5">
                                            <div className="flex items-center justify-between">
                                                <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                                    {evento.name}
                                                </h5>
                                                <div className="flex items-center gap-0.5">
                                                    <EstadoEvento estadoNombre={evento.estado_nombre} estadoClase={evento.estado_clase} />
                                                </div>
                                            </div>
                                            <p className="block font-sans text-base antialiased font-light leading-relaxed text-blue-gray-900">
                                                {evento.celular}
                                            </p>
                                            <p className="block font-sans text-base antialiased font-light leading-relaxed text-blue-gray-900">
                                                {evento.info_visita}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="p-0 mb-6">
                                        <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                                            {evento.descripcion}
                                        </p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-12'>
                                    <div className="col-span-12 md:col-span-6 mb-2 grid place-items-center">
                                        <button data-estado="2" data-id={evento.id} className="flex px-3 py-2 bg-green-400 mr-1 text-white font-semibold rounded" onClick={actualizarEvento}>
                                            <span className="ml-1">Aprobar</span>
                                        </button>
                                    </div>
                                    <div className="col-span-12 md:col-span-6 mb-2 grid place-items-center">
                                        <button data-estado="3" data-id={evento.id} className="flex px-3 py-2 bg-red-400 mr-1 text-white font-semibold rounded" onClick={actualizarEvento}>
                                            <span className="ml-1">Rechazar</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
    /*******************************************************************/
}

/**
 * Funcionalidad para visualizar de manera dinamica el label del estado asociado al evento
 * 
 * @param {strin} estadoNombre Recibe por parametro el nombre del estado que se le asignara al label
 * @param {strin} estadoClase Recibe por paremtro la clase que se usara en el label
 * @returns 
 */
const EstadoEvento = ({ estadoNombre, estadoClase }) => {
    return (
      <span className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded ${estadoClase} uppercase last:mr-0 mr-1`}>
        {estadoNombre}
      </span>
    );
};

/**
 * Funcionalidad para actualizar el estado del evento seleccionado
 */
const actualizarEvento = (event) => {
    /** Apartado para obtener el ID del evento y el estado que se actualizara **/
    let evenID = event.currentTarget.dataset.id;
    let estaID = event.currentTarget.dataset.estado;
    /*******************************************************************/

    /** Crea el FormData para enviar por parametro al consumo de actualización**/
    const formData = new FormData();

    formData.append('evento', evenID);
    formData.append('estado', estaID);
    /*******************************************************************/

    // Realiza la petición para actualizar el evento seleccionado
    fetch('/api/actualizar_evento', {
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
            })
        }
    })
    .catch((error) => console.log(error));

}

// Validata la existencia del contenido usado para los eventos que visualiza los empleados
if(document.getElementById('contentEventosEmpleados')){
    createRoot(document.getElementById('contentEventosEmpleados')).render(<RenderEventosEmpleados/>)
}
