<?php

namespace App\Http\Controllers;


use App\Models\Turma;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ClassController extends Controller
{

    public function listarTurmas()
    {

        $turmas = Turma::all()->toArray();

        return response()->json($turmas);
    }


    public function cadastrarTurma(Request $request)
    {
     
        $validator = Validator::make($request->all(), [
            'titulo' => 'required|unique:turmas',
            'horario' => 'required',
            'professor' => 'required',

        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'Dados inválidos'], 400);
        }

        $turma = Turma::create($request->all());
        return response()->json($turma, 201);
    }
    public function editarTurma(Request $request, $id)
    {
      
        $validator = Validator::make($request->all(), [
            'nome' => 'required',
            'horario' => 'required',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['error' => 'Dados inválidos'], 400);
        }
    
        $turma = Turma::find($id);
        if (!$turma) {
            return response()->json(['error' => 'Turma não encontrada'], 404);
        }
    
        $turma->update($request->all());
        return response()->json($turma, 200);
    }
    public function deletarTurma($id)
    {
        $turma = Turma::find($id);
        if (!$turma) {
            return response()->json(['error' => 'Turma não encontrada'], 404);
        }
        $turma->delete();
        return response()->json($turma, 204);
    }
}
