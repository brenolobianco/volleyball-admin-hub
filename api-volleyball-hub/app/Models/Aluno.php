<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Aluno extends Model
{
    protected $table = 'alunos';

    protected $fillable = [
        'nome' ,
        'id_turma',
        'atestado_medico',
      
        'data_nascimento' ,
        'detalhes_plano_saude' ,
        'direitos_imagem' ,
        'endereco' ,
        'hospital_preferido' ,
        'imagem_perfil',
        'nome_escola' ,
        'nome_responsavel' ,
        'plano_saude',
        'telefone_responsavel',
        'termo_conduta' ,

    ];


    public function turma()
    {
        return $this->belongsTo('App\Models\Turma', 'id_turma', 'id');
    }
}
