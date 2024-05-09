<?php

namespace App\Http\Controllers;

use App\Models\Aluno;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;


class StudentsController extends Controller
{
    public function cadastrarAluno(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nome' => 'required',

            'id_turma' => 'required',


        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $aluno = Aluno::create($request->all());
        return response()->json($aluno, 201);
    }

    public function editarAluno(Request $request, $id)
    {
       

        $aluno = Aluno::find($id);
        if (!$aluno) {
            return response()->json(['error' => 'Aluno não encontrado'], 404);
        }

        $aluno->update($request->all());
        return response()->json($aluno, 200);
    }

    public function deletarAluno($id)
    {
        $aluno = Aluno::find($id);
        if (!$aluno) {
            return response()->json(['error' => 'Aluno não encontrado'], 404);
        }

        $aluno->delete();
        return response()->json($aluno, 204);
    }

    public function listarAlunos()
    {

        $alunos = Aluno::all()->toArray();

        return response()->json($alunos);
    }

  
}
