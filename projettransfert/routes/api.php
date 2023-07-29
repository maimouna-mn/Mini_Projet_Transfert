<?php

use App\Http\Controllers\ClientController;
use App\Http\Controllers\CompteController;
use App\Http\Controllers\TransactionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('/depots',[TransactionController::class,'depot']);
Route::post('/transferts',[TransactionController::class,'transfert']);
Route::get("/clients", [ClientController::class, 'index']);
Route::get("clients/{id}",[ClientController::class, 'show']);
Route::get("comptes/{compte_emetteur_id}/listetransferts",[CompteController::class,'listeTransferts']);
Route::get('/comptes/{compte_destinataire_id}/transfertsrecus',[CompteController::class,'transfertRecus']);
// routes/web.php or routes/api.php

Route::get('/getclient/{phone}', [TransactionController::class,'ClientByPhone']);

// Route::get('/transferts/{transfert_id}',::class)->only(['index']);

//Comptes
// Route::get('comptes/{id}',::class)->only(['index']);
// Route::get('/clients/{client_id}/comptes',::class)->only(['index']);
//Transferts
// Route::get('/comptes/{compte_emetteur_id}/transferts',::class)->only(['index']);
// Route::get('/comptes/{compte_destinataire_id}/transferts',::class)->only(['index']);
// Route::get('/transferts/{transfert_id}',::class)->only(['index']);
//depots

// Route::get('/comptes/{compte_id}/depots',::class)->only(['index']);
// Route::get('/depots/{depot_id}',::class)->only(['index']);

//Clients
// Route::apiResource('evaluation',EvalutionController::class)->only(['store','index']);

