<?php

namespace App\Http\Controllers;

use App\Models\Compte;
use App\Models\Transaction;

class CompteController extends Controller
{
    function listeTransferts($compte_emetteur_id) {

      $emetteur=Compte::where('client_id',$compte_emetteur_id)->get()->pluck('client_id');
      return Transaction::where('id_emetteur',$emetteur)->get();
    }

    function transfertRecus($compte_destinataire_id) {

        $beneficiaire=Compte::where('client_id',$compte_destinataire_id)->get()->pluck('client_id');
        return Transaction::where('id_beneficiaire',$beneficiaire)->get();
      }
}
