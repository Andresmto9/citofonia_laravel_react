<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\UsuaRoleModel;
use GuzzleHttp\Psr7\Response;

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

        if(!Auth::attempt($request->only('email','password'))){
            return response()->json([
                'estado' => false,
                'errors' => ['No autorizado']
            ],401);
        }
        $user = User::where('email', $request->email)->first();
        if($user != null){
            if (!Hash::check($request->password, $user->password)) {
                return response()->json([
                    'estado' => false,
                    'errors' => ['Verifique las credenciales ingresadas.']
                ],401);
            }

            $credetials = [
                'email' => $request->email,
                'password' => $request->password,
            ];

            if (Auth::attempt($credetials)) {
                $user = Auth::user();
                $token = $user->createToken('token')->plainTextToken;
                $cookie = cookie('cookie_token', $token, 60 * 40);

                $role = UsuaRoleModel::where('usua_id', $user->id)->first();

                switch ($role->rol_id) {
                    case 1:
                        $url = url('/usuarios');
                        break;

                    case 2:
                        $url = url('/empleados');
                        break;

                    case 3:
                        $url = url('/residentes');
                        break;
                    
                    default:
                        # code...
                        break;
                }

                return response()->json([
                    'estado' => true,
                    'token' => $token,
                    'redirect_url' => $url,
                ]);
            }else{
                return response()->json([
                    'estado' => false,
                    'errors' => ['No autorizado']
                ],401);
            }
        }else{
            return response()->json([
                'estado' => false,
                'errors' => ['Verifique las credenciales ingresadas.']
            ],401);
        }
    }
}
