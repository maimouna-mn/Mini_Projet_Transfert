<?php

namespace Database\Seeders;

use DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CompteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        DB::table('comptes')->insert([[
            'numeroCompte' => '123',
            'solde' => 5000,
            'fournisseur' => 'Orange Money',
            'code' => 'OM',
            'client_id' => 1, 
            'created_at' => now(),
            'updated_at' => now(),
        ],
        [
            'numeroCompte' => '345',
            'solde' => 10000,
            'fournisseur' => 'Orange Money',
            'code' => 'OM',
            'client_id' => 2, 
            'created_at' => now(),
            'updated_at' => now(),
        ],
    ]);

        // Insérer d'autres données si nécessaire...
    }
}
