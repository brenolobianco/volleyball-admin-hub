<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
       
        User::truncate();

        $userData = [       
            'nome' => 'admin',
            'login' => 'admin',
            'password' => 'adminvolley123',
            'tipo' => 'administrador',
        ];

        User::create($userData);
    }
}
