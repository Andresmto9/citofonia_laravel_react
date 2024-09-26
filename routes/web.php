<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\usuarios\UsuariosController;
use App\Http\Controllers\Eventos\EventosResidentesController;
use App\Http\Controllers\Eventos\EventosEmpleadosControoller;
use App\Http\Controllers\LoginController;
use Illuminate\Support\Facades\Auth;

// Route::middleware('auth')->group(function() {
//     Route::controller(UsuariosController::class)->group(function() {
//         Route::get('usuarios', 'index')->name('usuarios');
//     });
// });

Route::controller(UsuariosController::class)->group(function() {
    Route::get('usuarios', 'index')->name('usuarios');
    Route::get('info_usuarios', 'info_usuarios');
});

Route::controller(EventosResidentesController::class)->group(function() {
    Route::get('residentes', 'index')->name('residentes');
});

Route::controller(EventosEmpleadosControoller::class)->group(function() {
    Route::get('empleados', 'index')->name('empleados');
});

Route::controller(LoginController::class)->group(function() {
    Route::get('/', 'index')->name('login');
    Route::get('login', 'index')->name('login');
});
