<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClassController;

use App\Http\Controllers\StudentsController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login',  [AuthController::class, 'login']);
Route::post ('/cadastrar',[AuthController::class,'cadastrar']);



// Rotas protegidas

Route::group(['middleware' => ['auth:sanctum']], function() {
    Route::get('/turmas', [ClassController::class, 'listarTurmas']);
    Route::post('/turmas', [ClassController::class, 'cadastrarTurma']);
    Route::put('/turmas/{id}', [ClassController::class, 'editarTurma']);
    Route::delete('/turmas/{id}', [ClassController::class, 'deletarTurma']);
    
    Route::get ('/alunos',[StudentsController::class,'listarAlunos']);

    Route::post ('/alunos',[StudentsController::class,'cadastrarAluno']);
    Route::put ('/alunos/{id}',[StudentsController::class,'editarAluno']);
    Route::delete ('/alunos/{id}',[StudentsController::class,'deletarAluno']);
  
});