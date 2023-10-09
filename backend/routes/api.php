<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/students', [\App\Http\Controllers\API\StudentControllers::class, 'index']);
Route::post('/student', [\App\Http\Controllers\API\StudentControllers::class, 'store']);
Route::get('/student/{id}', [\App\Http\Controllers\API\StudentControllers::class, 'show']);
Route::get('/student/{id}/edit', [\App\Http\Controllers\API\StudentControllers::class, 'edit']);
Route::put('/student/{id}/update', [\App\Http\Controllers\API\StudentControllers::class, 'update']);
Route::delete('/student/delete/{id}', [\App\Http\Controllers\API\StudentControllers::class, 'destroy']);
