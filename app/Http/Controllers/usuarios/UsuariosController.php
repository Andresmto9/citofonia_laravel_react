<?php

namespace App\Http\Controllers\usuarios;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\InfoApiController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Models\User;
use App\Models\UsuaRoleModel;
use Carbon\Carbon;

class UsuariosController extends Controller
{
    public function index(){
        return view('tabla_usuarios');
    }

    /**
     * Funcionalidad para consultar la información de los usuarios, ya se de manera especifica o por el ID del usuario
     */
    public function info_usuarios($id){
        $query = User::query();

        $query->select(DB::raw("users.id, users.name, users.email, roles.nombre as rol, roles.id as rol_id,
                CASE
                    WHEN users.estado = 1 then 'Activo'
                    ELSE 'Inactivo'
                END as estado
            "))
            ->leftJoin('usua_role', 'users.id', 'usua_role.usua_id')
            ->leftJoin('roles', 'usua_role.rol_id', 'roles.id')
            ->where('estado', 1);

        if($id == "all"){
            $user = $query->get();
        }else{
            $query->where('users.id', $id);
            $user = $query->get();
        }

        if($user){
            return response()->json(['estado' => 'OK', 'data' => $user]);
        }else{
            return response()->json(['estado' => 'FAIL', 'data' => $user]);
        }
    }

    /**
     * Funcionalidad para la creación del usuario y su rol asignado desde el formulario
     */
    public function crear_usuarios(Request $request){
        try {
            $rules = [
                'name' => 'required|string',
                'email' => 'required|string|email',
                'rol' => 'required|int',
                'password' => 'required|string',
            ];

            $validador = Validator::make($request->input(),$rules);
            if($validador->fails()){
                return response()->json([
                    'estado' => false,
                    'errors' => $validador->errors()->all()
                ], 400);
            }

            $user = new User();

            $user->name = $request->name;
            $user->email = $request->email;
            $user->email_verified_at = Carbon::now();
            $user->password = Hash::make($request->password);
            $user->estado = '1';
            $user->remember_token = Str::random(10);

            $user->save();

            $usuaID = $user->id;

            $rol = new UsuaRoleModel();

            $rol->usua_id = $usuaID;
            $rol->rol_id = $request->rol;

            $rol->save();

            if($rol){
                return response()->json(["estado" => "OK", "mensaje" => "Usuario creado con éxito."]);
            }else{
                return response()->json(["estado" => "FAIL", "mensaje" => "Ocurrió un problema al crear el usuario."]);
            }
        } catch (\Throwable $th) {
            return response()->json($th);
        }
    }

    /**
     * Funcionalidad para actualizar el usuario seleccionado en el data table
     */
    public function actualizar_usuarios(Request $request){
        $rules = [
            'name' => 'required|string',
            'email' => 'required|string|email',
            'rol' => 'required|int',
            'password' => 'required|string',
        ];

        $validador = Validator::make($request->input(),$rules);
        if($validador->fails()){
            return response()->json([
                'estado' => false,
                'errors' => $validador->errors()->all()
            ], 400);
        }

        $usua = User::where('id', $request->id)
            ->update(['name' => $request->name, 'email' => $request->email, 'password' => Hash::make($request->password)]);

        $roleUsua = UsuaRoleModel::where('usua_id', $request->id)
            ->update(['rol_id' => $request->rol]);

        if($roleUsua){
            return response()->json(["estado" => "OK", "mensaje" => "Usuario actualizado con éxito."]);
        }else{
            return response()->json(["estado" => "FAIL", "mensaje" => "Ocurrió un problema al actualizar el usuario."]);
        }
    }

    /**
     * Funcionalidad para borrar el usuario seleccionado
     */
    public function borrar_usuarios($id){
        $usua = User::where('id', $id)
            ->update(['estado' => 0]);

        if($usua){
            return response()->json(["estado" => "OK", "mensaje" => "Usuario borrado con éxito."]);
        }else{
            return response()->json(["estado" => "FAIL", "mensaje" => "Ocurrió un problema al borrar el usuario."]);
        }
    }
}
