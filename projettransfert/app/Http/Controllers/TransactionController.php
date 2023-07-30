<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{

    public function transfert(Request $request)
    {
        $request->validate([
            'montant' => 'required|numeric|min:500',
            'numero_emetteur' => 'nullable|string',
            'numero_beneficiaire' => 'nullable|string',
        ]);

        $montant = $request->input('montant');
        $numero_emetteur = $request->input('numero_emetteur');
        $numero_beneficiaire = $request->input('numero_beneficiaire');

        $emetteur = null;
        $beneficiaire = null;

        if ($numero_emetteur !== null) {
            $emetteur = DB::table('clients')
                ->select('id', 'nom', 'numeroTelepone')
                ->where('numeroTelepone', $numero_emetteur)
                ->first();
        }

        if ($numero_beneficiaire !== null) {
            $beneficiaire = DB::table('clients')
                ->select('id', 'nom', 'numeroTelepone')
                ->where('numeroTelepone', $numero_beneficiaire)
                ->first();
        }

        if ($numero_beneficiaire === null) {
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
            'id_emetteur' => $emetteur ? $emetteur->id : null,
            'id_beneficiaire' => $beneficiaire ? $beneficiaire->id : null,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $message = $codeTransaction ? 'Transfert effectué avec succès. Code de retrait généré.' : 'Transfert1 effectué avec succès.';

        $response = [
            'message' => $message,
            'codeRetrait' => $codeTransaction,
        ];

        if ($emetteur) {
            $response['emetteur'] = [
                'id' => $emetteur->id,
                'nom' => $emetteur->nom,
                'numeroTelepone' => $emetteur->numeroTelepone,
            ];
        }

        if ($beneficiaire) {
            $response['beneficiaire'] = [
                'id' => $beneficiaire->id,
                'nom' => $beneficiaire->nom,
                'numeroTelepone' => $beneficiaire->numeroTelepone,
            ];
        }

        return response()->json($response, 200);
    }

    public function ClientByPhone($phone)
    {
        $client = DB::table('clients')
            ->select('nom')
            ->where('numeroTelepone', $phone)
            ->first();

            if ($client) {
                return response()->json($client, 200);
            } else {
                return response()->json(['error' => 'Client not found'], 404);
            }
    }
    public function depot(Request $request)
    {
        $request->validate([
            'montant' => 'required|numeric|min:500',
            'id_envoyeur' => 'required|integer', 
        ]);
    
        $montant = $request->input('montant');
        $id_envoyeur = $request->input('id_envoyeur');
    
        $emetteur = DB::table('clients')
            ->select('id', 'nom', 'numeroTelepone')
            ->where('id', $id_envoyeur)
            ->first();
    
        if (!$emetteur) {
            return response()->json(['message' => 'L\'émetteur n\'existe pas.'], 404);
        }
    
        DB::table('clients')
            ->where('id', $id_envoyeur)
            ->increment('solde', $montant);
    
        DB::table('transactions')->insert([
            'montant' => $montant,
            'typeOperation' => 'Depot',
            'id_emetteur' => $id_envoyeur,
            'id_beneficiaire' => $id_envoyeur, 
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    
        $response = [
            'message' => 'Dépôt effectué avec succès.',
            'emetteur' => [
                'id' => $emetteur->id,
                'nom' => $emetteur->nom,
                'numeroTelepone' => $emetteur->numeroTelepone,
            ],
        ];
    
        return response()->json($response, 200);
    }
    
    
}