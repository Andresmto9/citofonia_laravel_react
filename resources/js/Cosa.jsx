import React from 'react';
import {createRoot} from 'react-dom/client';

export default function Prueba(){
    return (
        <>
            <p>Hola mundo :D</p>
        </>
    )
}

if(document.getElementById('PruebaReact')){
    createRoot(document.getElementById('PruebaReact')).render(<Prueba/>)
}
