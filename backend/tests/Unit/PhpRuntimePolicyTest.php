<?php

namespace Tests\Unit;

use App\Support\PhpRuntimePolicy;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\TestCase;

final class PhpRuntimePolicyTest extends TestCase
{
    public static function phpVersions(): array
    {
        return [
            'vulnerable PHP 8.4.24' => ['8.4.24', false],
            'vulnerable PHP 8.4.26' => ['8.4.26', false],
            'first patched PHP 8.4.27' => ['8.4.27', true],
            'newer patched PHP 8.4.28' => ['8.4.28', true],
            'patched but disallowed PHP 8.3.36' => ['8.3.36', false],
            'patched but disallowed PHP 8.5.12' => ['8.5.12', false],
            'disallow PHP release candidates' => ['8.4.27RC1', false],
        ];
    }

    #[DataProvider('phpVersions')]
    public function test_owner_approved_runtime_policy(string $version, bool $expected): void
    {
        self::assertSame($expected, PhpRuntimePolicy::isApprovedVersion($version));
    }

    public function test_ci_uses_a_patched_php_runtime(): void
    {
        self::assertTrue(PhpRuntimePolicy::isApprovedVersion(PHP_VERSION));
    }
}
