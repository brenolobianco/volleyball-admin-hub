<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('login', 'password');
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('primeirotoken')->plainTextToken;

            $response = [
                'usuario' => $user,
                'token' => $token
            ];

            return response()->json($response, 200); // Alterando o status code para 200
        } else {
            return response()->json(['message' => 'Credenciais inválidas'], 401);
        }
    }

    public function cadastrar(Request $request)
    {
        $validatedData = $request->validate([
            'nome' => 'required|string|min:6',
            'login' => 'required|string|unique:users',
            'password' => 'required|string|min:8',
            'email' => 'required|string|email|unique:users',
            'tipo' => 'required|string',

        ]);



        $user = User::create([
            'nome' => $validatedData['nome'],
            'login' => $validatedData['email'],
            'password' => bcrypt($validatedData['password']), // Criptografando a senha
            'tipo' => $validatedData['tipo'],
            'email' => $validatedData['email'],
          

        ]);

        return response()->json([
            'message' => 'Usuário registrado com sucesso',
            'user' => $user
        ], 201);
    }


}
