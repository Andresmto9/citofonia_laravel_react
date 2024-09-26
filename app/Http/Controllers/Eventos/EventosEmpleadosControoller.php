<?php

namespace App\Http\Controllers\Eventos;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\EventosModel;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class EventosEmpleadosControoller extends Controller
{
    public function index(){
        return view('eventos_empleados');
    }

    /**
     * Funcionalidad para la consulta de todos los eventos creados por los residentes
     */
    public function eventos_empleados(){
        /** Generación del query para consultar todos los eventos creados por parte de los residentes **/
        $eventos = $eventos = EventosModel::leftJoin('users', 'eventos.usua_id', 'users.id')
            ->select(DB::raw("eventos.*, users.id as usua_id, users.name,
                CASE
                    WHEN eventos.estado = 1 then 'Creado'
                    WHEN eventos.estado = 2 then 'Aprobado'
                    WHEN eventos.estado = 3 then 'Rechazado'
                    ELSE 'Borrado'
                END as estado_nombre,
                CASE
                    WHEN eventos.estado = 1 then 'text-blue-600 bg-blue-200'
                    WHEN eventos.estado = 2 then 'text-green-600 bg-green-200'
                    WHEN eventos.estado = 3 then 'text-red-600 bg-red-200'
                    ELSE ''
                END as estado_clase
            "))
            ->where('eventos.estado', '<>', '0')
            ->get();
        /***********************************************************/

        /** Validación sobre el proceso realizado y retorno de espuesta mediante JSON **/
        if($eventos){
            return response()->json(['estado' => 'OK', 'data' => $eventos]);
        }else{
            return response()->json(['estado' => 'FAIL', 'data' => $eventos]);
        }
        /***********************************************************/
    }

    /**
     * Funcionalidad para actualizar el estado del evento seleccionado por parte del empleado
     */
    public function actualizar_evento(Request $request){
        /** Validación de los parametro enviados para la actualización de los eventos **/
        $rules = [
            'evento' => 'required|int',
            'estado' => 'required|int'
        ];

        $validador = Validator::make($request->input(),$rules);
        if($validador->fails()){
            return response()->json([
                'estado' => false,
                'errors' => $validador->errors()->all()
            ], 400);
        }
        /*********************************************************/

        /** Actualización del estado sobre el evento seleccionado **/
        $evento = EventosModel::where('id', $request->evento)
            ->update(['estado' => $request->estado]);
        /*********************************************************/

        /** Validación sobre el proceso realizado y retorno de espuesta mediante JSON **/
        if($evento){
            return response()->json(["estado" => "OK", "mensaje" => "Estado del evento actualizado."]);
        }else{
            return response()->json(["estado" => "FAIL", "mensaje" => "Ocurrió un problema al actualizar el estado del evento."]);
        }
        /*********************************************************/
    }
}
