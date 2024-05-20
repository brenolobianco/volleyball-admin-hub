<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
       
    

        $userData = [       
            'nome' => 'admin',
            'login' => 'admin',
            'password' => Hash::make('adminvolley123'),
            'tipo' => 'administrador',
        ];

        User::create($userData);
    }
}
