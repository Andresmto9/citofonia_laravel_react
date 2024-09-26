<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthenticationController;
use App\Http\Controllers\usuarios\UsuariosController;

Route::post('token', [AuthenticationController::class, 'token']);

Route::middleware('auth:sanctum')->group(function () {
    Route::fallback(function(){
        return response()->json([
            'message' => 'La ruta solicitada no fue encontrada. Por favor, verifica la URL.'
        ], 404);
    });
    Route::get('/info_usuarios/{id}', [UsuariosController::class, 'info_usuarios']);
    Route::get('/borrar_usuarios/{id}', [UsuariosController::class, 'borrar_usuarios']);
    Route::post('/crear_usuarios', [UsuariosController::class, 'crear_usuarios']);
    Route::post('/actualizar_usuarios', [UsuariosController::class, 'actualizar_usuarios']);
});


