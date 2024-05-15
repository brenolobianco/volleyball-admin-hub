<?php

namespace App\Http\Controllers;

use App\Models\Aluno;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class StudentsController extends Controller
{

    public function cadastrarAluno(Request $request)
    {
        $validatedData = $request->validate([
            'nome' => 'required|string|min:5',
            'id_turma' => 'required|integer',
            'data_nascimento' => 'nullable|date',
            'endereco' => 'nullable|string',
            'hospital_preferido' => 'nullable|string',
            'imagem_perfil' => 'nullable|file', 
            'nome_escola' => 'nullable|string',
            'nome_responsavel' => 'nullable|string',
            'plano_saude' => 'nullable|string',
            'atestado_medico' => 'nullable|file', 
            'direitos_imagem' => 'nullable|file',
            'termo_conduta' => 'nullable|file', 
            'telefone_responsavel' => 'nullable|string',
           
        ]);


        $paths = [];
        foreach ($validatedData as $key => $value) {
            if ($request->hasFile($key)) {
                $paths[$key] = $request->file($key)->store('uploads');
            }
        }

       
        $aluno = Aluno::create($paths + $request->except(array_keys($paths)));

        return response()->json($aluno, 201);
    }

   


     
    public function downloadFile($id, $filename)
    {
        $aluno = Aluno::findOrFail($id);
    
        // Verificar se o aluno possui o arquivo com o nome fornecido
        if ($aluno->{$filename}) {
         
            $filePath = storage_path('app/' . $aluno->{$filename});
        
       
                return response()->download($filePath);
            
        }
    
        return response()->json(['error' => 'Arquivo não encontrado'], 404);
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
        // Carrega os alunos com os dados da turma relacionada
        $alunos = Aluno::with('turma')->get()->toArray();
    
        return response()->json($alunos);
    }
    

  
}
