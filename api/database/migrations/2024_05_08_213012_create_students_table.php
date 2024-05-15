<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('alunos', function (Blueprint $table) {
            $table->id();
            $table->string('nome');
         
            $table->string('imagem_perfil')->nullable();
            $table->date('data_nascimento')->nullable();;
            $table->string('endereco')->nullable();;
            $table->string('nome_escola')->nullable();
         
            $table->string('plano_saude')->nullable();
            $table->string('hospital_preferido')->nullable();
            $table->string('nome_responsavel')->nullable();
            $table->string('telefone_responsavel')->nullable();
            $table->string('atestado_medico')->nullable();
            $table->string('termo_conduta')->nullable();
            $table->string('direitos_imagem')->nullable();
          
            $table->foreignId('id_turma')->constrained('turmas');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('students');
    }
}
