<?php

namespace Database\Seeders;

use DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TransactionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        DB::table('transactions')->insert([
            'montant' => 1000,
            'codeTransaction' => 123456,
            'typeOperation' => 'Depot',
            'id_emetteur' => 1, 
            'id_beneficiaire' => 2,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

    }
}
