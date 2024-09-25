import React from 'react';
import {createRoot} from 'react-dom/client';

export default function RenderLogin(){
    return (
        <>
            <div class="grid col-span-12">
                <div class="col-span-6">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident perferendis ullam facere eveniet ut illo iusto placeat, sit dolores suscipit. Obcaecati magnam, delectus architecto facilis error fugit modi dolores officiis?
                </div>
                <div class="col-span-6">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni fugit accusantium cumque vel aut maiores quibusdam, molestiae odio veritatis voluptas suscipit temporibus ea. Eum eius exercitationem corporis natus quis ipsum.
                </div>
            </div>
        </>
    )
}

if(document.getElementById('contentLogin')){
    console.log("Hola");
    createRoot(document.getElementById('contentLogin')).render(<RenderLogin/>)
}
