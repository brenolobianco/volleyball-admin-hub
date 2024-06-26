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
Route::post('/logout', [AuthController::class, 'logout']);
Route::post ('/cadastrar',[AuthController::class,'cadastrar']);
Route::get('/alunos/{id}/download/{filename}', [StudentsController::class, 'downloadFile']);

// Rotas protegidas

Route::group(['middleware' => ['auth:sanctum']], function() {
    
Route::get('/usuarios', [AuthController::class, 'listarUsuarios']); 
Route::delete('/usuarios/{id}', [AuthController::class, 'deletarUsuario']); 
    Route::get('/turmas', [ClassController::class, 'listarTurmas']);
    Route::post('/turmas', [ClassController::class, 'cadastrarTurma']);
    Route::put('/turmas/{id}', [ClassController::class, 'editarTurma']);
    Route::delete('/turmas/{id}', [ClassController::class, 'deletarTurma']);
    
    Route::get ('/alunos',[StudentsController::class,'listarAlunos']);
  
    Route::post ('/alunos',[StudentsController::class,'cadastrarAluno']);
    Route::put ('/alunos/{id}',[StudentsController::class,'editarAluno']);
    Route::delete ('/alunos/{id}',[StudentsController::class,'deletarAluno']);
    Route::get('/user-type', function () {
        $user = auth()->user();
        if ($user) {
            return response()->json([
                'user_type' => $user->tipo,
                'user_name' => $user->nome,
                'authenticated' => true
            ]);
        } else {
            return response()->json([
                'authenticated' => false
            ]);
        }
    });
    
  
});