import React from 'react';
import {createRoot} from 'react-dom/client';

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

function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());
    if(formJson.mailUsua == '' || formJson.passUsua == ''){
        Swal.fire({
            title: "¡UN MOMENTO!",
            text: "Debe ingresar el correo y la contraseña",
            icon: "info",
            showCloseButton: false,
            showCancelButton: false,
            showConfirmButton: true,
            focusConfirm: false,
            confirmButtonText: `
              OK
            `,
        });
    }else{
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
                }
                console.log(data);
            })
            .catch((error) => console.log(error));
    }
}

if(document.getElementById('contentLogin')){
    createRoot(document.getElementById('contentLogin')).render(<RenderLogin/>)
}
