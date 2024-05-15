<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Turma extends Model
{
    protected $table = 'turmas';

    protected $fillable = [
        'titulo', 
        'horario' , 
        'professor',
    
     
    ];


 

    
}