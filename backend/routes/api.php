<?php

use Illuminate\Support\Facades\Route;

Route::get('/v1/health', static function () {
    return response()->json([
        'data' => [
            'status' => 'ok',
            'service' => 'treestory-api',
        ],
    ]);
});
