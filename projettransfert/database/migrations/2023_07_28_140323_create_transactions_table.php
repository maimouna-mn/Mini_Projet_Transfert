<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id()->unique();
            $table->integer("montant");
            $table->string("codeTransaction")->nullable();
            $table->enum("typeOperation",["Depot","retrait","Tranfert"]);
            
            $table->foreignId("id_emetteur")->constrained("comptes")->cascadeOnDelete();
            $table->foreignId("id_beneficiaire")->constrained("comptes")->cascadeOnDelete()->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
    public function uup(): void
    {
        Schema::table('transactions', function (Blueprint $table) {
         
        });
    }
};
