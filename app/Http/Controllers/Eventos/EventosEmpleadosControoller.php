<?php

namespace App\Http\Controllers\Eventos;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class EventosEmpleadosControoller extends Controller
{
    public function index(){
        return view('eventos_empleados');
    }
}
