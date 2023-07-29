<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    

    public function transfert(Request $request)
    {
        $montant = $request->input('montant');
        $id_emetteur = $request->input('id_emetteur');
        $id_beneficiaire = $request->input('id_beneficiaire');

        if ($id_beneficiaire === null) {
            $codeTransaction = '';
            for ($i = 0; $i < 25; $i++) {
                $codeTransaction .= random_int(0, 9);
            }
        } else {
            $codeTransaction = null;
        }

        DB::table('transactions')->insert([
            'montant' => $montant,
            'codeTransaction' => $codeTransaction,
            'typeOperation' => 'Tranfert',
            'id_emetteur' => $id_emetteur,
            'id_beneficiaire' => $id_beneficiaire,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $message = $codeTransaction ? 'Transfert effectué avec succès. Code de retrait généré.' : 'Transfert effectué avec succès.';
        return response()->json(['message' => $message, 'codeRetrait' => $codeTransaction], 200);
    }


   

}