// Se realiza la importación de las dependencias para REACT
import React from 'react';
import {createRoot} from 'react-dom/client';

/**
 * Funcionalidad para renderizar el componenete usado en el login
 */
export default function RenderLogin(){
    return (
        <>
            <div className="bg-gray-100 flex justify-center items-center h-screen">
                <div className="w-1/2 h-screen hidden lg:block">
                    <img src="https://1.citoplus.com/wp-content/uploads/2019/09/LOGO-FINAL-CITOP_Mesa-de-trabajo-1.png" alt="Placeholder Image" className="object-contain w-full h-full"/>
                </div>
                <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
                    <h1 className="text-2xl font-semibold mb-4">Ingreso</h1>
                    <form method="post" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-600">Correo</label>
                            <input type="text" name="email" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-600">Constraseña</label>
                            <input type="password" name="password" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"/>
                        </div>
                        <div className="mb-4">
                            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Ingresar</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
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
if(document.getElementById('contentLogin')){
    createRoot(document.getElementById('contentLogin')).render(<RenderLogin/>)
}
