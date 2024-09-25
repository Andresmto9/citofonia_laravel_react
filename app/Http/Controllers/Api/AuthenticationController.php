<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthenticationController extends Controller
{
    /**
     * Funcionalidad para generar el token de autenticación para el consumo de servicios dentro del aplicativo.
     */
    public function token(Request $request){
        $rules = [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ];

        $validador = Validator::make($request->input(),$rules);
        if($validador->fails()){
            return response()->json([
                'estado' => false,
                'errors' => $validador->errors()->all()
            ], 400);
        }

        $user = User::where('email', $request->email)->first();
        if($user != null){
            if (!Hash::check($request->password, $user->password)) {
                return response()->json([
                    'estado' => false,
                    'errors' => ['Verifique las credenciales ingresadas.']
                ],401);
            }

            return AuthenticationController::setTokenUsua($user->id, $user->createToken('API TOKEN')->plainTextToken);
        }else{
            return response()->json([
                'estado' => false,
                'errors' => ['Verifique las credenciales ingresadas.']
            ],401);
        }
    }

    /**
     * Funcionalidad para actualizar el token generado en la tabla usuarios.
     */
    private function setTokenUsua($id, $token){
        $token = User::where('id', $id)
            ->update(['remember_token' => $token]);

        if($token){
            return response()->json([
                'estado' => true,
            ], 200);
        }else{
            return response()->json([
                'estado' => false,
                'errors' => ['No fue posible actualizar la credencial.']
            ],401);
        }
    }
}
