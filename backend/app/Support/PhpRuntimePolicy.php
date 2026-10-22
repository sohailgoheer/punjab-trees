<?php

namespace App\Support;

/**
 * TreeStory's stricter, owner-approved PHP2Shell runtime policy.
 *
 * This is NOT an exploit mitigation and cannot protect a vulnerable PHP
 * interpreter before application code begins executing. Hosting must be
 * updated and independently verified before any deployment.
 */
final class PhpRuntimePolicy
{
    public const MINIMUM = '8.4.27';

    public static function isApprovedVersion(string $version): bool
    {
        // Only stable patched PHP 8.4 releases match; do not silently
        // substitute a different branch or prerelease.
        return preg_match('/^8\.4\.\d+$/D', $version) === 1
            && version_compare($version, self::MINIMUM, '>=')
            && version_compare($version, '8.5.0', '<');
    }
}
