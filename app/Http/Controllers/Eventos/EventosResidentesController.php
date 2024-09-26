<?php

namespace App\Http\Controllers\Eventos;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class EventosResidentesController extends Controller
{
    public function index(){
        return view('eventos_residentes');
    }
}
