<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Professor extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome',
        'id_turma',
        'id_user',
    ];

    public function turma()
    {
        return $this->belongsTo(Turma::class, 'id_turma');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }
}
