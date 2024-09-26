<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthenticationController;
use App\Http\Controllers\usuarios\UsuariosController;
use App\Http\Controllers\Eventos\EventosResidentesController;
use App\Http\Controllers\Eventos\EventosEmpleadosControoller;

/** Ruta de consumo para la generación del TOKEN **/
Route::post('token', [AuthenticationController::class, 'token']);

/** Validación dee autenticación para el consumo de servicios **/
Route::middleware('auth:sanctum')->group(function () {
    /** Validación de URL valida para el consumo de los servicios **/
    Route::fallback(function(){
        return response()->json([
            'message' => 'La ruta solicitada no fue encontrada. Por favor, verifica la URL.'
        ], 404);
    });
    /*****************************************/

    /** URL's de consumo para el servicio de usuarios **/
    Route::get('/info_usuarios/{id}', [UsuariosController::class, 'info_usuarios']);
    Route::get('/borrar_usuarios/{id}', [UsuariosController::class, 'borrar_usuarios']);
    Route::post('/crear_usuarios', [UsuariosController::class, 'crear_usuarios']);
    Route::post('/actualizar_usuarios', [UsuariosController::class, 'actualizar_usuarios']);
    /*****************************************/

    /** URL's de consumo para el servicio de eventos por parte del residente **/
    Route::get('/info_eventos/{id}', [EventosResidentesController::class, 'info_eventos']);
    Route::get('/borrar_evento/{id}', [EventosResidentesController::class, 'borrar_evento']);
    Route::post('/crear_eventos', [EventosResidentesController::class, 'crear_eventos']);
    /*****************************************/

    /** URL's de consumo para el servicio de eventos por parte del empleado **/
    Route::get('/eventos_empleados', [EventosEmpleadosControoller::class, 'eventos_empleados']);
    Route::post('/actualizar_evento', [EventosEmpleadosControoller::class, 'actualizar_evento']);
    /*****************************************/
});


