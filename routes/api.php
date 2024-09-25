<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthenticationController;

Route::post('token', [AuthenticationController::class, 'token']);

Route::middleware('auth:sanctum')->group(function () {
    Route::fallback(function(){
        return response()->json([
            'message' => 'La ruta solicitada no fue encontrada. Por favor, verifica la URL.'
        ], 404);
    });
    // Route::get('/information_service/{id}', [InformationServiceController::class, 'information_service']);
});


