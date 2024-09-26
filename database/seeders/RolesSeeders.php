<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\RolesModel;

class RolesSeeders extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        RolesModel::insert([
            [
                'nombre' => 'Administrador',
            ],
            [
                'nombre' => 'Empleado',
            ],
            [
                'nombre' => 'Residente',
            ],
        ]);
    }
}
