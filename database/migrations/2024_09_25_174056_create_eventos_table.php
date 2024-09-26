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
        Schema::create('eventos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('usua_id');
            $table->string('nombre', length: 100);
            $table->bigInteger('celular');
            $table->string('info_visita', length: 300);
            $table->string('descripcion', length: 500);
            $table->smallInteger('estado');
            $table->timestamps();
        });

        Schema::table('eventos', function (Blueprint $table) {
            $table->foreign('usua_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
