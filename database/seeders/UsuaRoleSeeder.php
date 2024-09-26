<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\UsuaRoleModel;

class UsuaRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        UsuaRoleModel::insert([
            [
                'usua_id' => 1,
                'rol_id' => 1,
            ],
        ]);
    }
}
