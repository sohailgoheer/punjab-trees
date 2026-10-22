<?php

/**
 * Execute before Composer/Artisan/CLI tasks:
 *   php scripts/check-php-runtime.php
 *
 * Does not inspect the real cPanel web SAPI. That is a separate deployment gate.
 */
require_once dirname(__DIR__).'/app/Support/PhpRuntimePolicy.php';

use App\Support\PhpRuntimePolicy;

if (!PhpRuntimePolicy::isApprovedVersion(PHP_VERSION)) {
    fwrite(STDERR, "PHP runtime security gate FAILED: current CLI PHP ".PHP_VERSION." (".PHP_SAPI.")\n");
    fwrite(STDERR, "Required: officially patched PHP 8.4.27 or newer stable 8.4.x. No deployment.\n");
    exit(1);
}

fwrite(STDOUT, "PHP CLI runtime gate PASS: ".PHP_VERSION." (".PHP_SAPI.")\n");
