<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Aluno extends Model
{
    protected $table = 'alunos';

    protected $fillable = [
        'nome',
      
        'id_turma',

    ];


    public function turma()
    {
        return $this->belongsTo('App\Models\Turma', 'id_turma', 'id');
    }
}
