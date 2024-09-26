<?php

namespace App\Http\Controllers\Eventos;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\EventosModel;
use Illuminate\Support\Facades\Validator;

class EventosResidentesController extends Controller
{
    public function index(){
        return view('eventos_residentes');
    }

    /**
     * Funcionalidad para consultar los eventos creados por el usuario
     */
    public function info_eventos($id){
        /** Creación del query para la consulta de los eventos creados por usuario que consulta **/
        $eventos = EventosModel::where('usua_id', $id)
            ->leftJoin('users', 'eventos.usua_id', 'users.id')
            ->select('eventos.*', 'users.id as usua_id')
            ->where('eventos.estado', '<>', '0')
            ->get();
        /*************************************************************/

        /** Validación sobre el proceso realizado y retorno de espuesta mediante JSON **/
        if($eventos){
            return response()->json(['estado' => 'OK', 'data' => $eventos]);
        }else{
            return response()->json(['estado' => 'FAIL', 'data' => $eventos]);
        }
        /*************************************************************/
    }

    /**
     * Funcionalidad para crear los eventos de los residentes
     */
    public function crear_eventos(Request $request){
        /** Validación de los parametro enviados para la actualización de los eventos **/
        $rules = [
            'nombre' => 'required|string',
            'celular' => 'required|int',
            'informacion' => 'required|string',
            'descripcion' => 'required|string',
        ];

        $validador = Validator::make($request->input(),$rules);
        if($validador->fails()){
            return response()->json([
                'estado' => false,
                'errors' => $validador->errors()->all()
            ], 400);
        }
        /*************************************************************/

        /** Se crea el objeto para registrar el evento **/
        $evento = new EventosModel();

        $evento->usua_id = $request->usua_id;
        $evento->nombre = $request->nombre;
        $evento->celular = $request->celular;
        $evento->info_visita = $request->informacion;
        $evento->descripcion = $request->descripcion;
        $evento->estado = 1;

        $evento->save();
        /*************************************************************/

        /** Validación sobre el proceso realizado y retorno de espuesta mediante JSON **/
        if($evento){
            return response()->json(["estado" => "OK", "mensaje" => "Evento creado con éxito."]);
        }else{
            return response()->json(["estado" => "FAIL", "mensaje" => "Ocurrió un problema al crear el evento."]);
        }
        /*********************************************************/
    }

    /**
     * Funcionalidad para borrar el evento seleccionado desde la tabla
     */
    public function borrar_evento($id){
        /** Realiza la actualización del estado sobre el evento seleccionado **/
        $evento = EventosModel::where('id', $id)
            ->update(['estado' => 0]);
        /*********************************************************/

        /** Validación sobre el proceso realizado y retorno de espuesta mediante JSON **/
        if($evento){
            return response()->json(["estado" => "OK", "mensaje" => "Evento borrado con éxito."]);
        }else{
            return response()->json(["estado" => "FAIL", "mensaje" => "Ocurrió un problema al borrar el evento."]);
        }
        /*********************************************************/
    }
}
