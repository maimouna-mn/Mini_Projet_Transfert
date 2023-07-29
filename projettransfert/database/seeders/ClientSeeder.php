<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
 
        public function run()
        {
            $clients = [
                [
                    'prenom' => 'Mya',
                    'nom' => 'Ndiaye',
                    'numeroTelepone' => '773015054',
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'prenom' => 'Mhd',
                    'nom' => 'Sy',
                    'numeroTelepone' => '776541321',
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
            ];
    
            DB::table('clients')->insert($clients);
        }
}
