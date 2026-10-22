<?php

use App\Support\PhpRuntimePolicy;
use Illuminate\Support\Facades\Route;

Route::get('/v1/health', static function () {
    // The HTTP check is only an additional guard, not a replacement for
    // verifying and patching PHP-FPM/mod_php/LiteSpeed before deployment.
    if (!PhpRuntimePolicy::isApprovedVersion(PHP_VERSION)) {
        return response()->json([
            'data' => ['status' => 'unavailable'],
        ], 503);
    }

    return response()->json([
        'data' => [
            'status' => 'ok',
            'service' => 'treestory-api',
        ],
    ]);
});
